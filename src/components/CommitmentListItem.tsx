import React, { useState, useCallback, useEffect } from 'react';
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
import ContactTooltip from './ContactTooltip'; // Import ContactTooltip

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
  showRevokeButton?: boolean;
  onRevoke?: () => void;
  showFromLabel?: boolean;
  acceptButtonText?: string;
  declineButtonText?: string;
  minHeight?: number;
  maxHeight?: number;
}

const MIN_ROW_HEIGHT = 140; // Minimum height for a row
const MAX_ROW_HEIGHT = 500; // Maximum height for a row

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
  showRevokeButton = false,
  onRevoke,
  showFromLabel = false,
  acceptButtonText,
  declineButtonText,
  minHeight = MIN_ROW_HEIGHT,
  maxHeight = MAX_ROW_HEIGHT,
}, ref) => { // 'ref' is the forwarded ref
  const theme = useTheme();
  // Removed local cardRef as the forwarded ref 'ref' will be used directly
  const [currentHeight, setCurrentHeight] = useState(minHeight);
  const [isResizing, setIsResizing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  // Set initial height after component mounts, if ref is ready
  useEffect(() => {
    // Check if ref is an object ref and has a current property
    if (ref && typeof ref !== 'function' && ref.current) {
      // Ensure initial height is within min/max bounds
      const initialContentHeight = ref.current.scrollHeight; // Get content height
      setCurrentHeight(Math.max(minHeight, Math.min(maxHeight, initialContentHeight)));
    }
  }, [minHeight, maxHeight, ref]); // Add ref to dependency array

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setStartY(e.clientY);
    setStartHeight(currentHeight);
    // Add global event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [currentHeight]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newHeight = startHeight + (e.clientY - startY);
      const clampedHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));
      setCurrentHeight(clampedHeight);
    }
  }, [isResizing, startY, startHeight, minHeight, maxHeight]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    // Remove global event listeners
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleSelect(id, event.target.checked);
  };

  const isDueToday = dueDate === 'Today';
  const dueRowColor = isOverdue ? theme.palette.error.main : '#666';
  const dueRowWeight = (isOverdue || isDueToday) ? 600 : 'inherit';
  const calendarIconColor = isOverdue ? theme.palette.error.main : color;

  return (
    <Card
      ref={ref} // Attach the forwarded ref here
      sx={{
        position: 'relative',
        minHeight: `${minHeight}px`, // Ensure minHeight is respected
        height: currentHeight, // Dynamic height
        borderLeft: `4px solid ${color}`,
        boxShadow: 1,
        transition: isResizing ? 'none' : 'all 0.2s ease-in-out', // Disable transition during resize
        flexShrink: 0,
        overflow: 'hidden',
        display: 'flex', // Use flex to manage content and resizer
        flexDirection: 'column',
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
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', alignItems: 'stretch', gap: 1.5, flexGrow: 1 }}> {/* flexGrow to push resizer to bottom */}
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
                    fontSize: '12px',
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

            {/* Explanation */}
            {explanation && (
              <Box
                sx={{
                  bgcolor: '#f8f9fa',
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  border: '1px solid #e9ecef',
                  mt: 1,
                  mb: 3,
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
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
          </Stack>
        </Box>
      </CardContent>
      {/* Resizer Handle */}
      <Box
        sx={{
          width: '100%',
          height: 10, // Height of the draggable area
          cursor: 'ns-resize',
          bgcolor: 'transparent', // Transparent by default
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 1, // Ensure it's above other content
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.05)', // Faint background on hover
          },
        }}
        onMouseDown={handleMouseDown}
      />
    </Card>
  );
});

export default CommitmentListItem;