import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Tooltip,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  alpha,
} from '@mui/material';
import {
  MoreHoriz,
  Check,
  Close,
  Edit,
  Undo,
  Shield, // For badge type
  Person,
  CalendarToday,
  Schedule,
  GppGood, // For approved badge
  GppBad, // For rejected badge
  HelpOutline, // For clarification
  Phone as PhoneIcon, // For external contact
} from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

interface Commitment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  committedDate?: string;
  type?: string; // e.g., 'nudge', 'Invitation', 'Badge Request'
  nudgesLeft?: number;
  totalNudges?: number;
  isExternal?: boolean;
  questions?: string[];
  explanation?: string;
}

interface CommitmentsTableProps {
  commitments: Commitment[];
  isMyPromisesTab: boolean;
  isRequestsToCommitTab: boolean;
  isAwaitingResponseTab: boolean;
  isBadgeRequestsTab: boolean;
  isOwedToMe: boolean;
  isUnkeptTab: boolean;
  isMyBadgesTab: boolean; // Re-added this prop
  onViewDetails: (commitment: Commitment) => void;
  onRequestBadge: (commitment: Commitment) => void;
  onAccept: (commitment: Commitment) => void;
  onDecline: (commitment: Commitment) => void;
  onRevoke: (commitment: Commitment) => void;
  onClarify: (commitment: Commitment) => void;
  onAnswerNudge: (commitment: Commitment) => void;
  onApproveBadge: (commitment: Commitment) => void;
  onRejectBadge: (commitment: Commitment) => void;
}

const parseCommitmentDate = (dateString: string): Dayjs | null => {
  try {
    if (dateString === 'Today') return dayjs().startOf('day');
    let cleanDateString = dateString;
    if (dateString.startsWith('Completed ')) {
      cleanDateString = dateString.substring('Completed '.length);
    } else if (dateString.startsWith('Requested on ')) {
      cleanDateString = dateString.substring('Requested on '.length);
    } else if (dateString === 'Pending') {
      return null;
    }
    
    const date = dayjs(cleanDateString, ['MMM D, YYYY, hh:mm A', 'MMM D, hh:mm A', 'MMM D, YYYY', 'MMM D'], true);
    return date.isValid() ? date : null;
  } catch (error) {
    return null;
  }
};

const CommitmentsTable: React.FC<CommitmentsTableProps> = ({
  commitments,
  isMyPromisesTab,
  isRequestsToCommitTab,
  isAwaitingResponseTab,
  isBadgeRequestsTab,
  isOwedToMe,
  isUnkeptTab,
  isMyBadgesTab, // Re-added to destructuring
  onViewDetails,
  onRequestBadge,
  onAccept,
  onDecline,
  onRevoke,
  onClarify,
  onAnswerNudge,
  onApproveBadge,
  onRejectBadge,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedCommitment, setSelectedCommitment] = React.useState<Commitment | null>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, commitment: Commitment) => {
    setAnchorEl(event.currentTarget);
    setSelectedCommitment(commitment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCommitment(null);
  };

  if (commitments.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>No data to display in table.</Typography>
        <Typography variant="body1">Adjust your filters or switch to Regular Mode.</Typography>
      </Box>
    );
  }

  const getTypeChip = (type?: string) => {
    if (!type) return null;
    let color = 'default';
    let bgColor = 'grey.100';
    let icon: React.ReactElement | undefined = undefined;

    switch (type) {
      case 'Invitation':
        color = theme.palette.primary.main;
        bgColor = alpha(theme.palette.primary.main, 0.1);
        icon = <Person sx={{ fontSize: 16 }} />;
        break;
      case 'Nudge':
        color = theme.palette.warning.dark;
        bgColor = alpha(theme.palette.warning.main, 0.1);
        icon = <Edit sx={{ fontSize: 16 }} />;
        break;
      case 'Badge Request':
        color = theme.palette.success.main;
        bgColor = alpha(theme.palette.success.main, 0.1);
        icon = <Shield sx={{ fontSize: 16 }} />;
        break;
      default:
        break;
    }

    return (
      <Chip
        label={type}
        size="small"
        icon={icon}
        sx={{
          bgcolor: bgColor,
          color: color,
          fontWeight: 600,
          height: 24,
          fontSize: '0.75rem',
          '& .MuiChip-icon': {
            color: color,
          },
        }}
      />
    );
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e8eaed', borderRadius: 3, overflowX: 'auto' }}>
      <Table sx={{ minWidth: 800 }} aria-label="commitments table">
        <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor: 'grey.50' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', textAlign: 'left' }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', textAlign: 'left' }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', textAlign: 'left' }}>Assignee</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', textAlign: 'right', display: { xs: 'none', sm: 'table-cell' } }}>Due Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', textAlign: 'right', display: { xs: 'none', md: 'table-cell' } }}>Committed</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', textAlign: 'center', display: { xs: 'none', lg: 'table-cell' } }}>Type</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', textAlign: 'center', display: { xs: 'none', lg: 'table-cell' } }}>External</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', textAlign: 'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commitments.map((commitment) => {
            const parsedDueDate = parseCommitmentDate(commitment.dueDate);
            const isOverdue = parsedDueDate ? parsedDueDate.isBefore(dayjs(), 'day') : false;
            const dueDateColor = isOverdue ? theme.palette.error.main : 'text.primary';
            const dueDateWeight = isOverdue ? 600 : 400;

            return (
              <TableRow
                key={commitment.id}
                sx={{ '&:nth-of-type(odd)': { bgcolor: 'white' }, '&:nth-of-type(even)': { bgcolor: 'grey.50' } }}
              >
                <TableCell sx={{ textAlign: 'left' }}>{commitment.title}</TableCell>
                <TableCell sx={{ maxWidth: 250, textAlign: 'left' }}>
                  <Tooltip title={commitment.description} placement="top" arrow>
                    <Typography noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {commitment.description}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ textAlign: 'left' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2">{commitment.assignee}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ textAlign: 'right', display: { xs: 'none', sm: 'table-cell' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                    <CalendarToday sx={{ fontSize: 16, color: dueDateColor }} />
                    <Typography variant="body2" sx={{ color: dueDateColor, fontWeight: dueDateWeight }}>
                      {commitment.dueDate}
                    </Typography>
                    {isOverdue && (
                      <Chip
                        label="Overdue"
                        size="small"
                        sx={{
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                          color: 'error.dark',
                          fontSize: '10px',
                          fontWeight: 700,
                          height: 18,
                        }}
                      />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ textAlign: 'right', display: { xs: 'none', md: 'table-cell' } }}>
                  {commitment.committedDate ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                      <Schedule sx={{ fontSize: 16, color: 'success.main' }} />
                      <Typography variant="body2">{commitment.committedDate}</Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>N/A</Typography>
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center', display: { xs: 'none', lg: 'table-cell' } }}>
                  {getTypeChip(commitment.type)}
                </TableCell>
                <TableCell sx={{ textAlign: 'center', display: { xs: 'none', lg: 'table-cell' } }}>
                  {commitment.isExternal ? (
                    <Chip
                      label="External"
                      size="small"
                      icon={<PhoneIcon sx={{ fontSize: 16 }} />}
                      sx={{
                        bgcolor: alpha(theme.palette.grey[500], 0.1),
                        color: theme.palette.grey[700],
                        fontWeight: 600,
                        height: 24,
                        fontSize: '0.75rem',
                        '& .MuiChip-icon': {
                          color: theme.palette.grey[700],
                        },
                      }}
                    />
                  ) : (
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>No</Typography>
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton
                    aria-label="actions"
                    onClick={(event) => handleMenuClick(event, commitment)}
                    size="small"
                  >
                    <MoreHoriz />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu && selectedCommitment?.id === commitment.id}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                      sx: {
                        minWidth: 180,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem onClick={() => { onViewDetails(commitment); handleMenuClose(); }}>
                      View Details
                    </MenuItem>
                    {isMyPromisesTab && commitment.type !== 'nudge' && !isUnkeptTab && (
                      <MenuItem onClick={() => { onRequestBadge(commitment); handleMenuClose(); }}>
                        Request Badge
                      </MenuItem>
                    )}
                    {isMyPromisesTab && commitment.type === 'nudge' && (
                      <MenuItem onClick={() => { onAnswerNudge(commitment); handleMenuClose(); }}>
                        <Edit sx={{ mr: 1, fontSize: 18 }} /> Answer Nudge
                      </MenuItem>
                    )}
                    {isRequestsToCommitTab && (
                      <>
                        <MenuItem onClick={() => { onAccept(commitment); handleMenuClose(); }}>
                          <Check sx={{ mr: 1, fontSize: 18, color: 'success.main' }} /> Accept
                        </MenuItem>
                        <MenuItem onClick={() => { onDecline(commitment); handleMenuClose(); }}>
                          <Close sx={{ mr: 1, fontSize: 18, color: 'error.main' }} /> Decline
                        </MenuItem>
                      </>
                    )}
                    {isAwaitingResponseTab && (
                      <MenuItem onClick={() => { onRevoke(commitment); handleMenuClose(); }}>
                        <Undo sx={{ mr: 1, fontSize: 18, color: 'error.main' }} /> Revoke
                      </MenuItem>
                    )}
                    {isOwedToMe && (
                      <MenuItem onClick={() => { onClarify(commitment); handleMenuClose(); }}>
                        <HelpOutline sx={{ mr: 1, fontSize: 18, color: 'primary.main' }} /> Clarify
                      </MenuItem>
                    )}
                    {isBadgeRequestsTab && (
                      <>
                        <MenuItem onClick={() => { onApproveBadge(commitment); handleMenuClose(); }}>
                          <GppGood sx={{ mr: 1, fontSize: 18, color: 'success.main' }} /> Approve
                        </MenuItem>
                        <MenuItem onClick={() => { onRejectBadge(commitment); handleMenuClose(); }}>
                          <GppBad sx={{ mr: 1, fontSize: 18, color: 'error.main' }} /> Reject
                        </MenuItem>
                      </>
                    )}
                  </Menu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommitmentsTable;