import React, { useState, useRef } from 'react';
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
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Collapse, // Import Collapse
  Stack, // Import Stack for layout
  Chip, // Import Chip for pill-shaped dates
  Tooltip, // Import Tooltip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { CalendarToday, ArrowDropDown, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'; // Import new icons
import dayjs from 'dayjs'; // Import dayjs for sorting responses

interface Commitment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  committedDate?: string;
  approvedDate?: string; // Added approvedDate
  type?: string;
  nudgesLeft?: number;
  totalNudges?: number;
  isExternal?: boolean;
  questions?: string[];
  explanation?: string;
  responses?: { date: string; answer: string }[]; // Add responses to interface
}

interface CommitmentsTableProps {
  commitments: Commitment[];
  filters: {
    badge: string;
    commitmentText: string;
    assignee: string;
    dueDate: Dayjs | null;
    committedDate: Dayjs | null;
    approvedDate: Dayjs | null;
  };
  onFilterChange: (filterName: string, value: any) => void;
  badgeOptions: string[];
  assigneeOptions: string[];
}

const CommitmentsTable: React.FC<CommitmentsTableProps> = ({
  commitments,
  filters,
  onFilterChange,
  badgeOptions,
  assigneeOptions,
}) => {
  const theme = useTheme();
  const [badgeAnchorEl, setBadgeAnchorEl] = useState<null | HTMLElement>(null);
  const [assigneeAnchorEl, setAssigneeAnchorEl] = useState<null | HTMLElement>(null);
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [committedDateOpen, setCommittedDateOpen] = useState(false);
  const [approvedDateOpen, setApprovedDateOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set()); // State for expanded rows

  const badgeCellRef = useRef<HTMLTableCellElement>(null);
  const assigneeCellRef = useRef<HTMLTableCellElement>(null);
  const dueDateButtonRef = useRef<HTMLButtonElement>(null); // Ref for Due Date icon button
  const committedDateButtonRef = useRef<HTMLButtonElement>(null); // Ref for Committed Date icon button
  const approvedDateButtonRef = useRef<HTMLButtonElement>(null); // Ref for Approved Date icon button

  const handleBadgeMenuOpen = () => {
    setBadgeAnchorEl(badgeCellRef.current);
  };
  const handleBadgeMenuClose = () => {
    setBadgeAnchorEl(null);
  };
  const handleBadgeSelect = (value: string) => {
    onFilterChange('badge', value);
    handleBadgeMenuClose();
  };

  const handleAssigneeMenuOpen = () => {
    setAssigneeAnchorEl(assigneeCellRef.current);
  };
  const handleAssigneeMenuClose = () => {
    setAssigneeAnchorEl(null);
  };
  const handleAssigneeSelect = (value: string) => {
    onFilterChange('assignee', value);
    handleAssigneeMenuClose();
  };

  const handleDueDateChange = (newValue: Dayjs | null) => {
    onFilterChange('dueDate', newValue);
    setDueDateOpen(false);
  };

  const handleCommittedDateChange = (newValue: Dayjs | null) => {
    onFilterChange('committedDate', newValue);
    setCommittedDateOpen(false);
  };

  const handleApprovedDateChange = (newValue: Dayjs | null) => {
    onFilterChange('approvedDate', newValue);
    setApprovedDateOpen(false);
  };

  const handleToggleExpand = (id: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderFormattedDate = (dateString?: string) => {
    if (!dateString || dateString === 'N/A') {
      return <Typography variant="body2">N/A</Typography>;
    }
    const date = dayjs(dateString, 'MMM D, YYYY, hh:mm A');
    if (!date.isValid()) {
      return <Typography variant="body2">{dateString}</Typography>;
    }
    return (
      <Box>
        <Typography variant="body2" sx={{ lineHeight: 1.3 }}>
          {date.format('MMM D, YYYY')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.3 }}>
          {date.format('hh:mm A')}
        </Typography>
      </Box>
    );
  };

  const badgeIconColor = filters.badge ? theme.palette.primary.main : 'text.secondary';
  const assigneeIconColor = filters.assignee ? theme.palette.primary.main : 'text.secondary';
  const dueDateIconColor = filters.dueDate ? theme.palette.primary.main : 'text.secondary';
  const committedDateIconColor = filters.committedDate ? theme.palette.primary.main : 'text.secondary';
  const approvedDateIconColor = filters.approvedDate ? theme.palette.primary.main : 'text.secondary';

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 'none',
        border: '1px solid #e8eaed',
        borderRadius: 3,
        minHeight: commitments.length === 1 ? 'auto' : 392,
        width: '100%',
        overflowY: 'scroll',
      }}
    >
      <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="commitments table">
        <TableHead sx={{ bgcolor: 'grey.50' }}>
          <TableRow>
            <TableCell ref={badgeCellRef} sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap', width: '15%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 32, flexShrink: 0, mr: 1 }} /> {/* Placeholder for alignment */}
                Badge
                <IconButton size="small" onClick={handleBadgeMenuOpen} aria-label="filter by badge">
                  <ArrowDropDown fontSize="small" sx={{ color: badgeIconColor }} />
                </IconButton>
                <Menu
                  anchorEl={badgeAnchorEl}
                  open={Boolean(badgeAnchorEl)}
                  onClose={handleBadgeMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  PaperProps={{
                    sx: { minWidth: badgeCellRef.current ? badgeCellRef.current.offsetWidth : 'auto' }
                  }}
                >
                  <MenuItem onClick={() => handleBadgeSelect('')} selected={filters.badge === ''}>All</MenuItem>
                  {badgeOptions.map((option) => (
                    <MenuItem key={option} onClick={() => handleBadgeSelect(option)} selected={filters.badge === option}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap', width: '34%' }}>
              Original Commitment
            </TableCell>
            <TableCell ref={assigneeCellRef} sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap', width: '12%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Assignee
                <IconButton size="small" onClick={handleAssigneeMenuOpen} aria-label="filter by assignee">
                  <ArrowDropDown fontSize="small" sx={{ color: assigneeIconColor }} />
                </IconButton>
                <Menu
                  anchorEl={assigneeAnchorEl}
                  open={Boolean(assigneeAnchorEl)}
                  onClose={handleAssigneeMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  PaperProps={{
                    sx: { minWidth: assigneeCellRef.current ? assigneeCellRef.current.offsetWidth : 'auto' }
                  }}
                >
                  <MenuItem onClick={() => handleAssigneeSelect('')} selected={filters.assignee === ''}>All</MenuItem>
                  {assigneeOptions.map((option) => (
                    <MenuItem key={option} onClick={() => handleAssigneeSelect(option)} selected={filters.assignee === option}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap', width: '13%' }}>
              <Tooltip title="The exact time when the user committed to doing something." placement="top">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Committed
                  <IconButton ref={committedDateButtonRef} size="small" onClick={() => setCommittedDateOpen(true)} aria-label="filter by committed date">
                    <CalendarToday fontSize="small" sx={{ color: committedDateIconColor }} />
                  </IconButton>
                  <DatePicker
                    label="Committed Date"
                    open={committedDateOpen}
                    onClose={() => setCommittedDateOpen(false)}
                    value={filters.committedDate}
                    onChange={handleCommittedDateChange}
                    slotProps={{
                      textField: {
                        style: { display: 'none' }
                      },
                      popper: {
                        placement: 'bottom-start',
                        anchorEl: committedDateButtonRef.current,
                      }
                    }}
                  />
                </Box>
              </Tooltip>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap', width: '13%' }}>
              <Tooltip title="The end date for a commitment. If past this date, the commitment will be overdue." placement="top">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Due
                  <IconButton ref={dueDateButtonRef} size="small" onClick={() => setDueDateOpen(true)} aria-label="filter by due date">
                    <CalendarToday fontSize="small" sx={{ color: dueDateIconColor }} />
                  </IconButton>
                  <DatePicker
                    label="Due Date"
                    open={dueDateOpen}
                    onClose={() => setDueDateOpen(false)}
                    value={filters.dueDate}
                    onChange={handleDueDateChange}
                    slotProps={{
                      textField: {
                        style: { display: 'none' }
                      },
                      popper: {
                        placement: 'bottom-start',
                        anchorEl: dueDateButtonRef.current,
                      }
                    }}
                  />
                </Box>
              </Tooltip>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap', width: '13%', pr: 4 }}>
              <Tooltip title="The date when the person you committed to has approved the badge." placement="top">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Approved
                  <IconButton ref={approvedDateButtonRef} size="small" onClick={() => setApprovedDateOpen(true)} aria-label="filter by approved date">
                    <CalendarToday fontSize="small" sx={{ color: approvedDateIconColor }} />
                  </IconButton>
                  <DatePicker
                    label="Approved Date"
                    open={approvedDateOpen}
                    onClose={() => setApprovedDateOpen(false)}
                    value={filters.approvedDate}
                    onChange={handleApprovedDateChange}
                    slotProps={{
                      textField: {
                        style: { display: 'none' }
                      },
                      popper: {
                        placement: 'bottom-start',
                        anchorEl: approvedDateButtonRef.current,
                      }
                    }}
                  />
                </Box>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commitments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} sx={{
                textAlign: 'center',
                color: 'text.secondary',
                height: 336,
                verticalAlign: 'middle',
                border: 'none',
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Nothing here yet.</Typography>
                <Typography variant="body1">Try changing your filters or switch to Regular Mode to see more items.</Typography>
              </TableCell>
            </TableRow>
          ) : (
            commitments.map((commitment, index) => (
              <React.Fragment key={commitment.id}>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    bgcolor: index % 2 === 0 ? 'background.paper' : 'grey.50',
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {/* Fixed-width container for the expand/collapse icon */}
                      <Box sx={{ width: 32, flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {(() => {
                          const isNudgeWithResponses = commitment.type === 'nudge' && commitment.responses && commitment.responses.length > 0;
                          return (
                            <IconButton
                              size="small"
                              onClick={() => handleToggleExpand(commitment.id)}
                              sx={{ visibility: isNudgeWithResponses ? 'visible' : 'hidden' }}
                            >
                              {expandedRows.has(commitment.id) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                          );
                        })()}
                      </Box>
                      {commitment.title}
                    </Box>
                  </TableCell>
                  <TableCell>{commitment.description}</TableCell>
                  <TableCell>{commitment.assignee}</TableCell>
                  <TableCell>{renderFormattedDate(commitment.committedDate)}</TableCell>
                  <TableCell>{renderFormattedDate(commitment.dueDate)}</TableCell>
                  <TableCell sx={{ pr: 4 }}>{renderFormattedDate(commitment.approvedDate)}</TableCell>
                </TableRow>
                {commitment.type === 'nudge' && commitment.responses && (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ py: 0 }}>
                      <Collapse in={expandedRows.has(commitment.id)} timeout="auto" unmountOnExit>
                        <Box sx={{ my: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1, border: '1px solid grey.200' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                            All Responses:
                          </Typography>
                          <Stack spacing={1}>
                            {commitment.responses
                              .sort((a, b) => dayjs(b.date, 'MMM D, YYYY').valueOf() - dayjs(a.date, 'MMM D, YYYY').valueOf())
                              .map((response, idx) => (
                                <Box key={idx} sx={{ pb: 1, borderBottom: idx < commitment.responses!.length - 1 ? '1px dashed grey.300' : 'none' }}>
                                  <Chip
                                    label={response.date}
                                    size="small"
                                    sx={{
                                      bgcolor: '#fff3e0',
                                      color: '#ff7043',
                                      fontWeight: 700,
                                      fontSize: '12px',
                                      mb: 1,
                                    }}
                                  />
                                  <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.5 }}>
                                    {response.answer}
                                  </Typography>
                                </Box>
                              ))}
                          </Stack>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommitmentsTable;