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
} from '@mui/material';
import { CalendarToday, Person, MoreHoriz, Shield } from '@mui/icons-material';

interface CommitmentListItemProps {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  selected?: boolean;
  color: string;
  showCheckbox: boolean;
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
}, ref) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleSelect(id, event.target.checked);
  };

  return (
    <Card
      ref={ref}
      sx={{
        minHeight: 140,
        borderLeft: `4px solid ${color}`,
        boxShadow: 1,
        transition: 'all 0.2s ease-in-out',
        flexShrink: 0,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
    >
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
          />
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Top row: Title, MoreHoriz */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
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
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                <CalendarToday sx={{ fontSize: 16, color: color }} />
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Due {dueDate}
                </Typography>
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
              </Stack>

              {/* Action Buttons */}
              <Box sx={{ minWidth: 130, textAlign: 'right' }}>
                {showActionButton && (
                  <Button
                    variant="contained"
                    onClick={onActionButtonClick}
                    disabled={isBulkSelecting}
                    sx={{
                      bgcolor: color,
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 3,
                      py: 1,
                      borderRadius: 1,
                      flexShrink: 0,
                      '&:hover': { bgcolor: alpha(color, 0.8) },
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