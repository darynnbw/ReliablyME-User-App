import React from 'react';
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
} from '@mui/material';
import { CalendarToday, Person, MoreHoriz, Shield, Edit } from '@mui/icons-material';

interface CommitmentListItemProps {
  id: number;
  title: string;
  dueDate: string;
  description: string;
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
  showBadgePlaceholder?: boolean;
  showAcceptDeclineButtons?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  isBulkSelecting?: boolean;
  hideDueDate?: boolean;
  isNudge?: boolean;
  nudgesLeft?: number;
  isMyPromisesTab?: boolean;
  isExternal?: boolean;
  isOverdue?: boolean;
}

const CommitmentListItem = React.forwardRef<HTMLDivElement, CommitmentListItemProps>(({
  id,
  title,
  dueDate,
  description,
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
  showBadgePlaceholder = false,
  showAcceptDeclineButtons = false,
  onAccept,
  onDecline,
  isBulkSelecting = false,
  hideDueDate = false,
  isNudge = false,
  nudgesLeft,
  isMyPromisesTab = false,
  isExternal = false,
  isOverdue = false,
}, ref) => {
  const theme = useTheme();
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleSelect(id, event.target.checked);
  };

  const isDueToday = dueDate === 'Today';
  const dueRowColor = (isOverdue || isDueToday) ? theme.palette.error.main : '#666';
  const dueRowWeight = (isOverdue || isDueToday) ? 600 : 'inherit';
  const calendarIconColor = (isOverdue || isDueToday) ? theme.palette.error.main : color;

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
            width: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
            borderRadius: 1,
            flexShrink: 0,
          }}>
            <Shield sx={{ fontSize: 40, color: 'grey.400' }} />
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
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
                    fontSize: '10px',
                    fontWeight: 700,
                    height: 20,
                  }}
                />
              )}
            </Stack>
            <Tooltip title="View details" placement="top" arrow>
              <IconButton size="small" onClick={onViewDetails}>
                <MoreHoriz />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Main content area with vertical stack */}
          <Stack>
            {/* Due Date */}
            {!hideDueDate && (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                <CalendarToday sx={{ fontSize: 16, color: calendarIconColor }} />
                <Typography variant="body2" sx={{ color: dueRowColor, fontWeight: dueRowWeight }}>
                  Due {dueDate}
                </Typography>
                {isNudge && nudgesLeft !== undefined && (
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                    ({nudgesLeft} nudges left)
                  </Typography>
                )}
              </Stack>
            )}

            {/* Description */}
            <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.5, mb: 0.5 }}>
              {description}
            </Typography>

            {/* Bottom row: Assignee and Button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              {/* Assignee */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Person sx={{ fontSize: 16, color: color }} />
                <Typography variant="body2" sx={{ color: '#666' }}>
                  To: {assignee}
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
                      px: 3,
                      py: 1,
                      borderRadius: 1,
                      flexShrink: 0,
                      '&:hover': { 
                        bgcolor: (isNudge && isMyPromisesTab) ? '#f4511e' : alpha(color, 0.8)
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
                        px: 2.5,
                        py: 0.75,
                        borderRadius: 1,
                        '&:hover': { bgcolor: '#d32f2f' },
                      }}
                    >
                      Decline
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
                        px: 2.5,
                        py: 0.75,
                        borderRadius: 1,
                        '&:hover': { bgcolor: '#388e3c' },
                      }}
                    >
                      Accept
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
});

export default CommitmentListItem;