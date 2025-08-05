import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Checkbox,
  Button,
  IconButton,
  Tooltip,
  Stack,
  alpha,
  Chip,
  useTheme,
  Collapse, // Import Collapse
} from '@mui/material';
import { CalendarToday, Person, MoreHoriz, Edit, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'; // Removed Shield
import ContactTooltip from './ContactTooltip'; // Import ContactTooltip
import dayjs from 'dayjs'; // Import dayjs for sorting
import BadgeContent from './BadgeContent'; // Import the new BadgeContent component

interface CommitmentListItemProps {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  explanation?: string;
  assignee: string;
  selected?: boolean;
  color: string;
  showCheckbox: boolean;
  isCheckboxDisabled?: boolean;
  showActionButton: boolean;
  buttonText: string;
  onViewDetails: () => void;
  onActionButtonClick: () => void;
  onToggleSelect: (id: number, checked: boolean) => void;
  showBadgePlaceholder?: boolean; // This prop will now control rendering BadgeContent
  showAcceptDeclineButtons?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  isBulkSelecting?: boolean;
  hideDueDate?: boolean;
  isNudge?: boolean;
  nudgesLeft?: number;
  totalNudges?: number; // Added totalNudges
  isMyPromisesTab?: boolean;
  isExternal?: boolean;
  isOverdue?: boolean;
  showRevokeButton?: boolean;
  onRevoke?: () => void;
  showFromLabel?: boolean;
  acceptButtonText?: string;
  declineButtonText?: string;
  responses?: { date: string; answer: string }[]; // New prop for historical responses
}

const CommitmentListItem = React.forwardRef<HTMLDivElement, CommitmentListItemProps>(({
  id,
  title,
  dueDate,
  description,
  explanation,
  assignee,
  selected = false,
  color,
  showCheckbox,
  isCheckboxDisabled = false,
  showActionButton,
  buttonText,
  onViewDetails,
  onActionButtonClick,
  onToggleSelect,
  showBadgePlaceholder = false, // This prop will now control rendering BadgeContent
  showAcceptDeclineButtons = false,
  onAccept,
  onDecline,
  isBulkSelecting = false,
  hideDueDate = false,
  isNudge = false,
  nudgesLeft,
  totalNudges, // Destructure totalNudges
  isMyPromisesTab = false,
  isExternal = false,
  isOverdue = false,
  showRevokeButton = false,
  onRevoke,
  showFromLabel = false,
  acceptButtonText,
  declineButtonText,
  responses, // Destructure responses
}, ref) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false); // State for inline collapse

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleSelect(id, event.target.checked);
  };

  const handleExpandClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click from triggering
    setExpanded(!expanded);
  };

  const isDueToday = dueDate === 'Today';
  const dueRowColor = isOverdue ? theme.palette.error.main : '#666';
  const dueRowWeight = (isOverdue || isDueToday) ? 600 : 'inherit';
  const calendarIconColor = isOverdue ? theme.palette.error.main : color;

  const showExpandIcon = isNudge && responses && responses.length > 0;

  return (
    <Card
      ref={ref}
      sx={{
        position: 'relative',
        minHeight: 140,
        borderLeft: `4px solid ${color}`,
        boxShadow: 1,
        transition: 'all 0.2s ease-in-out',
        flexShrink: 0,
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
    >
      {isOverdue && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '24px',
            height: '24px',
            bgcolor: 'error.main',
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          }}
        />
      )}
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', alignItems: 'stretch', gap: 1.5 }}>
        {showBadgePlaceholder && (
          <Box sx={{
            width: 120, // Increased width to give more space for centering
            height: 100, // Fixed height for consistency
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <BadgeContent badgeType={title} size="list-item-large" />
          </Box>
        )}
        {showCheckbox && (
          <Checkbox
            size="small"
            sx={{
              p: 0,
              mt: 0.5,
              alignSelf: 'flex-start',
            }}
            checked={selected}
            onChange={handleCheckboxChange}
            disabled={isCheckboxDisabled}
          />
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Top row: Title, MoreHoriz */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}> {/* Reduced mb */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              {isNudge && (
                <Chip
                  label="Nudge"
                  size="small"
                  sx={{
                    bgcolor: '#fff3e0',
                    color: '#ff7043',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                />
              )}
              {isExternal && (
                <Chip
                  label="External"
                  size="small"
                  sx={{
                    bgcolor: 'grey.300',
                    color: 'text.secondary',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                />
              )}
              {isOverdue && (
                <Chip
                  label="Overdue"
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    color: 'error.dark',
                    fontSize: '12px',
                    fontWeight: 700,
                    height: 20,
                  }}
                />
              )}
            </Stack>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {showExpandIcon && (
                <IconButton
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show historical responses"
                  size="small"
                  sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              )}
              <Tooltip title="View details" placement="top" arrow>
                <IconButton size="small" onClick={onViewDetails}>
                  <MoreHoriz />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Due Date */}
          {!hideDueDate && (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}> {/* Reduced mb */}
              <CalendarToday sx={{ fontSize: 16, color: calendarIconColor }} />
              <Typography variant="body2" sx={{ color: dueRowColor, fontWeight: dueRowWeight }}>
                Due {dueDate}
              </Typography>
              {isNudge && nudgesLeft !== undefined && totalNudges !== undefined && (
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                  ({nudgesLeft} of {totalNudges} nudges left)
                </Typography>
              )}
            </Stack>
          )}

          {/* Original Description - always visible */}
          <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.5, mb: 1.5 }}> {/* Reduced mb */}
            {description}
          </Typography>

          {/* Explanation */}
          {explanation && (
            <Box
              sx={{
                bgcolor: '#f8f9fa',
                px: 2,
                py: 1.5,
                borderRadius: 2,
                border: '1px solid #e9ecef',
                mb: 1.5, // Reduced mb
                maxWidth: '100%',
              }}
            >
              <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#333' }}>
                <Typography component="span" sx={{ fontWeight: 'bold', fontSize: 'inherit', color: 'inherit' }}>
                  Explanation:{' '}
                </Typography>
                {explanation}
              </Typography>
            </Box>
          )}

          {/* Bottom row: Assignee and Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 1.5 }}> {/* Reduced mb */}
            {/* Assignee */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Person sx={{ fontSize: 16, color: color }} />
              <Typography variant="body2" sx={{ color: '#666' }}>
                {showFromLabel ? 'From:' : 'To:'}{' '}
                {!isExternal ? (
                  <ContactTooltip>
                    <span
                      style={{
                        color: '#666',
                        cursor: 'pointer',
                        fontSize: 'inherit',
                        fontFamily: 'inherit',
                        fontWeight: 'inherit'
                      }}
                    >
                      {assignee}
                    </span>
                  </ContactTooltip>
                ) : (
                  assignee
                )}
              </Typography>
              {isExternal && (
                <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                  (Non-member)
                </Typography>
              )}
            </Stack>

            {/* Action Buttons */}
            <Box sx={{ minWidth: 130, textAlign: 'right' }}>
              {showActionButton && (
                <Button
                  variant="contained"
                  onClick={onActionButtonClick}
                  disabled={isBulkSelecting}
                  startIcon={isNudge && isMyPromisesTab ? <Edit /> : undefined}
                  sx={{
                    bgcolor: (isNudge && isMyPromisesTab) ? '#ff7043' : color,
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: buttonText === 'Clarify' ? 6 : 3,
                    py: 1,
                    borderRadius: 1,
                    flexShrink: 0,
                    '&:hover': { 
                      bgcolor: buttonText === 'Answer Nudge' || buttonText === 'Request Badge'
                        ? '#f4511e' // Orange hover for Answer Nudge and Request Badge
                        : (buttonText === 'Clarify' ? '#1565c0' : alpha(color, 0.8)) // Dark blue for Clarify, fallback for others (shouldn't be hit)
                    },
                  }}
                >
                  {buttonText}
                </Button>
              )}
              {showAcceptDeclineButtons && (
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={onDecline}
                    disabled={isBulkSelecting}
                    sx={{
                      bgcolor: '#F44336',
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 4,
                      py: 0.75,
                      borderRadius: 1,
                      '&:hover': { bgcolor: '#d32f2f' },
                    }}
                  >
                    {declineButtonText || 'Decline'}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={onAccept}
                    disabled={isBulkSelecting}
                    sx={{
                      bgcolor: '#4CAF50',
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 4,
                      py: 0.75,
                      borderRadius: 1,
                      '&:hover': { bgcolor: '#388e3c' },
                    }}
                  >
                    {acceptButtonText || 'Accept'}
                  </Button>
                </Box>
              )}
              {showRevokeButton && (
                <Button
                  variant="contained"
                  onClick={onRevoke}
                  disabled={isBulkSelecting}
                  sx={{
                    bgcolor: '#F44336',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 4,
                    py: 0.75,
                    borderRadius: 1,
                    '&:hover': { bgcolor: '#d32f2f' },
                  }}
                >
                  Revoke
                </Button>
              )}
            </Box>
          </Box>

          {/* Collapsible Responses - MOVED HERE */}
          {showExpandIcon && (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box sx={{ mt: 1.5, p: 2, bgcolor: 'grey.50', borderRadius: 1, border: '1px solid grey.200' }}> {/* Reduced mt */}
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                  All Responses:
                </Typography>
                <Stack spacing={1}>
                  {responses
                    ?.sort((a, b) => dayjs(b.date, 'MMM D, YYYY').valueOf() - dayjs(a.date, 'MMM D, YYYY').valueOf())
                    .map((response, idx) => (
                      <Box key={idx} sx={{ pb: 1, borderBottom: idx < responses.length - 1 ? '1px dashed grey.300' : 'none' }}>
                        <Chip
                          label={response.date}
                          size="small"
                          sx={{
                            bgcolor: '#fff3e0', // Nudge pill background
                            color: '#ff7043', // Nudge pill text color
                            fontWeight: 700, // Nudge pill font weight
                            fontSize: '12px', // Nudge pill font size
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
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

export default CommitmentListItem;