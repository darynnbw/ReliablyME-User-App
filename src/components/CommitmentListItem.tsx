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
  Collapse, // Import Collapse
  Divider,
} from '@mui/material';
import { CalendarToday, Person, MoreHoriz, Edit, ExpandMore as ExpandMoreIcon, Repeat } from '@mui/icons-material';
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
  isMyPromisesTab?: boolean; // This prop is actually for the old 'My Promises' tab (now 'Active Promises')
  isMyBadgesTab?: boolean; // New prop to specifically identify 'My Badges' tab
  isBadgesIssuedTab?: boolean; // Destructure new prop
  isExternal?: boolean;
  isOverdue?: boolean;
  showRevokeButton?: boolean;
  onRevoke?: () => void;
  showFromLabel?: boolean;
  acceptButtonText?: string;
  declineButtonText?: string;
  responses?: { date: string; answer: string; questions?: string[] }[]; // New prop for historical responses
  approvedDate?: string; // Added approvedDate prop
  isExpanded: boolean;
  onToggleExpand: () => void;
  isActionsPage?: boolean;
  isOthersCommitmentsSection?: boolean;
}

const areQuestionsRecurring = (responses?: { questions?: string[] }[]): boolean => {
  if (!responses || responses.length <= 1) {
    return true;
  }
  const firstQuestions = JSON.stringify(responses[0].questions || []);
  for (let i = 1; i < responses.length; i++) {
    if (JSON.stringify(responses[i].questions || []) !== firstQuestions) {
      return false;
    }
  }
  return true;
};

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
  isMyPromisesTab = false, // This prop is actually for the old 'My Promises' tab (now 'Active Promises')
  isMyBadgesTab = false, // New prop to specifically identify 'My Badges' tab
  isBadgesIssuedTab = false, // Destructure new prop
  isExternal = false,
  isOverdue = false,
  showRevokeButton = false,
  onRevoke,
  showFromLabel = false,
  acceptButtonText,
  declineButtonText,
  responses, // Destructure responses
  approvedDate, // Destructure approvedDate
  isExpanded,
  onToggleExpand,
  isActionsPage = false,
  isOthersCommitmentsSection = false,
}, ref) => {
  const theme = useTheme();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleSelect(id, event.target.checked);
  };

  const handleExpandClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click from triggering
    onToggleExpand();
  };

  // Determine the label and value based on the tab
  const displayDateLabel = isMyBadgesTab || isBadgesIssuedTab ? 'Approved' : 'Due';
  const displayDateValue = isMyBadgesTab || isBadgesIssuedTab ? (approvedDate || 'N/A') : dueDate;

  // Determine the color and weight based on overdue status
  const dateTextColor = isOverdue ? theme.palette.error.main : '#666';
  const dateTextWeight = isOverdue ? 600 : 'inherit';

  // Determine the icon color based on overdue status or section color
  const calendarIconColor = isOverdue ? theme.palette.error.main : color;

  // Show expand icon if it's a nudge with responses OR an issued badge with an explanation
  const showExpandIcon = (isNudge && responses && responses.length > 0) || ((isMyBadgesTab || isBadgesIssuedTab) && explanation);
  const isRecurringNudge = isNudge && areQuestionsRecurring(responses);

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
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', gap: 1.5 }}>
        {showBadgePlaceholder && (
          <Box sx={{
            width: 100,
            height: 100, // Fixed height for consistency
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            alignSelf: 'center', // Add this
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
        <Box sx={{ flex: 1, minWidth: 0, alignSelf: 'center' }}>
          {/* Top row: Title, MoreHoriz */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
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
                  aria-expanded={isExpanded}
                  aria-label="show historical responses"
                  size="small"
                  sx={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
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

          {/* Due/Approved Date */}
          {!hideDueDate && (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <CalendarToday sx={{ fontSize: 16, color: calendarIconColor }} />
              <Typography variant="body2" sx={{ color: dateTextColor, fontWeight: dateTextWeight }}>
                {displayDateLabel} {displayDateValue}
              </Typography>
              {isNudge && nudgesLeft !== undefined && totalNudges !== undefined && nudgesLeft > 0 && (
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                  ({nudgesLeft} of {totalNudges} nudges left)
                </Typography>
              )}
            </Stack>
          )}

          {isActionsPage ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              {/* Description and Explanation */}
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.5, mb: 1 }}>
                  {description}
                </Typography>
                {explanation && !(isMyBadgesTab || isBadgesIssuedTab) && !isNudge && (
                  <Box
                    sx={{
                      bgcolor: '#f8f9fa',
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      border: '1px solid #e9ecef',
                      mb: 1.5,
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
              </Box>

              {/* Assignee Info */}
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5, mb: 1 }}> {/* Changed spacing to 0.5 */}
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
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
                        px: buttonText === 'Clarification Request' ? 2 : 3, // Adjusted padding for longer text
                        py: 1,
                        borderRadius: 1,
                        flexShrink: 0,
                        '&:hover': { 
                          bgcolor: buttonText === 'Answer Nudge' || buttonText === 'Request Badge'
                            ? '#f4511e'
                            : (buttonText === 'Clarification Request' ? '#1565c0' : alpha(color, 0.8))
                        },
                      }}
                    >
                      {buttonText}
                    </Button>
                  )}
                  {showAcceptDeclineButtons && (
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: showActionButton ? 1 : 0 }}>
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
                        mt: (showActionButton || showAcceptDeclineButtons) ? 1 : 0,
                        '&:hover': { bgcolor: '#d32f2f' },
                      }}
                    >
                      Revoke
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <>
              <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.5, mb: 1.5 }}>
                {description}
              </Typography>
              {explanation && !(isMyBadgesTab || isBadgesIssuedTab) && !isNudge && (
                <Box
                  sx={{
                    bgcolor: '#f8f9fa',
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    border: '1px solid #e9ecef',
                    mb: 1.5,
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 1.5 }}>
                <Stack direction="row" spacing={0.5} alignItems="center"> {/* Changed spacing to 0.5 */}
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
                        px: buttonText === 'Clarification Request' ? 2 : 3, // Adjusted padding for longer text
                        py: 1,
                        borderRadius: 1,
                        flexShrink: 0,
                        '&:hover': { 
                          bgcolor: buttonText === 'Answer Nudge' || buttonText === 'Request Badge'
                            ? '#f4511e'
                            : (buttonText === 'Clarification Request' ? '#1565c0' : alpha(color, 0.8))
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
                        mt: (showActionButton || showAcceptDeclineButtons) ? 1 : 0,
                        '&:hover': { bgcolor: '#d32f2f' },
                      }}
                    >
                      Revoke
                    </Button>
                  )}
                </Box>
              </Box>
            </>
          )}

          {/* Collapsible Responses / Explanation */}
          {showExpandIcon && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <Box sx={{ mt: 1.5, p: 2, bgcolor: 'grey.50', borderRadius: 1, border: '1px solid grey.200' }}>
                {isNudge && responses && responses.length > 0 && (
                  isRecurringNudge ? (
                    <>
                      {responses[0].questions && responses[0].questions.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#4f4f4f' }}>
                              Questions Asked:
                            </Typography>
                            <Tooltip title="You’ll answer this same set of questions with each nudge.">
                              <Repeat sx={{ fontSize: 16, color: 'text.secondary' }} />
                            </Tooltip>
                          </Box>
                          <Stack spacing={0.5}>
                            {responses[0].questions.map((q, qIdx) => (
                              <Typography key={qIdx} variant="body2" sx={{ color: '#666', lineHeight: 1.5 }}>
                                {q}
                              </Typography>
                            ))}
                          </Stack>
                        </Box>
                      )}
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 1.5 }}>
                        All Responses ({responses.length}):
                      </Typography>
                      <Stack spacing={1.5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
                        {responses
                          .sort((a, b) => dayjs(a.date, 'MMM D, YYYY').valueOf() - dayjs(b.date, 'MMM D, YYYY').valueOf())
                          .map((response, idx) => (
                            <Box key={idx}>
                              <Chip
                                label={response.date}
                                size="small"
                                sx={{
                                  bgcolor: color === '#ff7043' ? '#fff3e0' : (color === '#1976d2' ? '#e3f2fd' : 'grey.200'),
                                  color: color,
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
                    </>
                  ) : (
                    <>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.primary' }}>
                        All Responses ({responses.length}):
                      </Typography>
                      <Stack spacing={1.5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
                        {responses
                          .sort((a, b) => dayjs(a.date, 'MMM D, YYYY').valueOf() - dayjs(b.date, 'MMM D, YYYY').valueOf())
                          .map((response, idx) => (
                            <Box key={idx}>
                              <Chip
                                label={response.date}
                                size="small"
                                sx={{
                                  bgcolor: color === '#ff7043' ? '#fff3e0' : (color === '#1976d2' ? '#e3f2fd' : 'grey.200'),
                                  color: color,
                                  fontWeight: 700,
                                  fontSize: '12px',
                                  mb: 1.5,
                                }}
                              />
                              {response.questions && response.questions.length > 0 && (
                                <Box sx={{ mb: 1 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#4f4f4f' }}>
                                    Questions Asked:
                                  </Typography>
                                  <Stack spacing={0.5}>
                                    {response.questions.map((q, qIdx) => (
                                      <Typography key={qIdx} variant="body2" sx={{ color: '#666', lineHeight: 1.5 }}>
                                        {q}
                                      </Typography>
                                    ))}
                                  </Stack>
                                </Box>
                              )}
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#4f4f4f' }}>
                                  {isOthersCommitmentsSection ? 'Their Answer:' : 'Your Answer:'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.5 }}>
                                  {response.answer}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                      </Stack>
                    </>
                  )
                )}
                {(isMyBadgesTab || isBadgesIssuedTab) && explanation && (
                  <>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                      Explanation:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.5 }}>
                      {explanation}
                    </Typography>
                  </>
                )}
              </Box>
            </Collapse>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

export default CommitmentListItem;