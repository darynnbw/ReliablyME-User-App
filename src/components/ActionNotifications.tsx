import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Chip,
  Button,
  Tooltip,
  Stack,
} from '@mui/material';
import {
  Check,
  Close,
  Edit,
  Undo,
  MoreHoriz,
  Person,
} from '@mui/icons-material';
import CommitmentDetailsModal from './CommitmentDetailsModal';
import AnswerNudgeModal from './AnswerNudgeModal';
import ConfirmationModal from './ConfirmationModal';
import DeclineModal from './DeclineModal';
import ContactTooltip from './ContactTooltip';
import RequestClarificationModal from './RequestClarificationModal';
import ApprovalConfirmationModal from './ApprovalConfirmationModal';
import AcceptRequestModal from './AcceptRequestModal';

const initialNotifications = [
  {
    id: 1,
    title: 'Promise Kept General',
    type: 'Invitation',
    description: 'I will join the project kickoff meeting to discuss the upcoming launch and provide my input on the project roadmap.',
    assignee: 'Chris Parker',
    actions: ['accept', 'decline'],
    dueDate: 'Apr 10, 5:00 PM',
  },
  {
    id: 2,
    title: 'Promise Kept General',
    type: 'Nudge',
    description: 'Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text.',
    assignee: 'Chris Parker',
    actions: ['edit'],
    dueDate: 'Apr 11, 9:00 AM',
  },
  {
    id: 3,
    title: 'Promise Kept General',
    type: 'Badge Request',
    description: 'Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text.',
    assignee: 'Chris Parker',
    actions: ['accept', 'decline', 'undo'],
    dueDate: 'Apr 12, 12:00 PM',
  },
  {
    id: 4,
    title: 'Promise Kept General',
    type: 'Invitation',
    description: 'Please review the weekly progress report and provide feedback on the team performance metrics.',
    assignee: 'Sarah Wilson',
    actions: ['accept', 'decline'],
    dueDate: 'Apr 13, 2:00 PM',
  },
  {
    id: 5,
    title: 'Promise Kept General',
    type: 'Nudge',
    description: 'Your input is needed on the latest pull request for the authentication system updates.',
    assignee: 'Mike Johnson',
    actions: ['edit'],
    dueDate: 'Apr 14, 4:00 PM',
  },
];

const ActionNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [modalOpen, setModalOpen] = useState(false);
  const [answerNudgeModalOpen, setAnswerNudgeModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [requestClarificationModalOpen, setRequestClarificationModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [commitmentForDetails, setCommitmentForDetails] = useState<any>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Invitation':
        return '#ff7043';
      case 'Nudge':
        return '#ff7043';
      case 'Badge Request':
        return '#1976d2';
      default:
        return '#666';
    }
  };

  const getTypeBackground = (type: string) => {
    switch (type) {
      case 'Invitation':
        return '#fff3e0';
      case 'Nudge':
        return '#fff3e0';
      case 'Badge Request':
        return '#e3f2fd';
      default:
        return '#f5f5f5';
    }
  };

  const handleActionClick = (action: string, notification: any) => {
    setSelectedNotification(notification);
    
    if (action === 'accept') {
      if (notification.type === 'Invitation') {
        setAcceptModalOpen(true);
      } else { // This handles 'Badge Request'
        setConfirmationModalOpen(true);
      }
    } else if (action === 'decline') {
      setDeclineModalOpen(true);
    } else if (action === 'edit' && notification.type === 'Nudge') {
      setAnswerNudgeModalOpen(true);
    }
  };

  const handleClarificationClick = (notification: any) => {
    setSelectedNotification(notification);
    setRequestClarificationModalOpen(true);
  };

  const handleConfirmBadgeApproval = () => {
    if (selectedNotification) {
      setNotifications(prev => prev.filter(n => n.id !== selectedNotification.id));
      setConfirmationModalOpen(false);
      setApprovalModalOpen(true);
    }
  };

  const handleDecline = () => {
    if (selectedNotification) {
      console.log('Declined invitation:', selectedNotification.title);
      setNotifications(prev => prev.filter(n => n.id !== selectedNotification.id));
      setDeclineModalOpen(false);
      setSelectedNotification(null);
    }
  };

  const handleAcceptCommit = () => {
    if (selectedNotification) {
      setNotifications(prev => prev.filter(n => n.id !== selectedNotification.id));
      setAcceptModalOpen(false);
      setSelectedNotification(null);
    }
  };

  const handleViewDetails = (notification: any) => {
    setCommitmentForDetails(notification);
    setModalOpen(true);
  };

  const handleSendClarification = (message: string) => {
    console.log(`Clarification request sent for notification ${selectedNotification?.id}: ${message}`);
  };

  return (
    <>
      <Paper sx={{ 
        p: 3, 
        height: { xs: 'auto', md: 500 },
        minHeight: { xs: 400, md: 500 },
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
            Action Notifications
          </Typography>
          <Chip
            label={notifications.length}
            size="small"
            sx={{
              ml: 1,
              bgcolor: '#f44336',
              color: 'white',
              minWidth: 24,
              height: 24,
              fontWeight: 700,
              transition: 'all 0.3s ease',
              transform: notifications.length > 0 ? 'scale(1)' : 'scale(0)',
            }}
          />
        </Box>

        <Box sx={{ 
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          mb: 2,
          pr: 1,
          scrollbarWidth: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0',
          },
        }}>
          {notifications.length > 0 ? (
            <Stack spacing={1}>
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  sx={{
                    minHeight: 140,
                    borderLeft: `4px solid ${getTypeColor(notification.type)}`,
                    boxShadow: 1,
                    transition: 'all 0.2s ease-in-out',
                    flexShrink: 0,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {notification.title}
                        </Typography>
                        <Chip
                          label={notification.type}
                          size="small"
                          sx={{
                            bgcolor: getTypeBackground(notification.type),
                            color: getTypeColor(notification.type),
                            fontSize: '12px',
                            fontWeight: 700,
                            height: 28,
                            px: 1,
                          }}
                        />
                      </Box>
                      <Tooltip title="View details" placement="top" arrow>
                        <IconButton size="small" onClick={() => handleViewDetails(notification)}>
                          <MoreHoriz />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{ color: '#666', mb: 2, lineHeight: 1.5 }}
                    >
                      {notification.description}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person sx={{ 
                          fontSize: 16, 
                          color: getTypeColor(notification.type)
                        }} />
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          To:{' '}
                          {notification.assignee === 'Chris Parker' ? (
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
                                {notification.assignee}
                              </span>
                            </ContactTooltip>
                          ) : (
                            notification.assignee
                          )}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {notification.actions.includes('accept') && (
                          <Tooltip title="Accept" placement="top" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleActionClick('accept', notification)}
                              sx={{
                                bgcolor: '#e8f5e8',
                                color: '#4caf50',
                                '&:hover': { bgcolor: '#d4edda' },
                              }}
                            >
                              <Check fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {notification.actions.includes('decline') && (
                          <Tooltip title="Decline" placement="top" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleActionClick('decline', notification)}
                              sx={{
                                bgcolor: '#fde8e8',
                                color: '#f44336',
                                '&:hover': { bgcolor: '#f8d7da' },
                              }}
                            >
                              <Close fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {notification.actions.includes('edit') && (
                          <Tooltip title="Answer Nudge" placement="top" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleActionClick('edit', notification)}
                              sx={{
                                bgcolor: '#fff3e0',
                                color: '#ff7043',
                                '&:hover': { bgcolor: '#ffe0b2' },
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {notification.actions.includes('undo') && (
                          <Tooltip title="Request Clarification" placement="top" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleClarificationClick(notification)}
                              sx={{
                                bgcolor: '#fff8e1',
                                color: '#ff9800',
                                '&:hover': { bgcolor: '#fff3c4' },
                              }}
                            >
                              <Undo fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <Box sx={{ textAlign: 'center', color: 'text.secondary', mt: 8 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>All caught up!</Typography>
              <Typography>You have no pending notifications.</Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#607d8b',
              textTransform: 'none',
              px: 6,
              py: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: '#546e7a' },
            }}
          >
            See all
          </Button>
        </Box>
      </Paper>

      <CommitmentDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        commitment={commitmentForDetails}
      />

      <AnswerNudgeModal
        open={answerNudgeModalOpen}
        onClose={() => setAnswerNudgeModalOpen(false)}
      />

      <ConfirmationModal
        open={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        title="Confirm Your Commitment"
        commitmentTitle={selectedNotification?.title || ''}
        onConfirm={handleConfirmBadgeApproval}
      />

      <DeclineModal
        open={declineModalOpen}
        onClose={() => setDeclineModalOpen(false)}
        title="Decline Invitation"
        onDecline={handleDecline}
      />

      <RequestClarificationModal
        open={requestClarificationModalOpen}
        onClose={() => setRequestClarificationModalOpen(false)}
        notification={selectedNotification}
        onSend={handleSendClarification}
      />

      <ApprovalConfirmationModal
        open={approvalModalOpen}
        onClose={() => {
          setApprovalModalOpen(false);
          setSelectedNotification(null);
        }}
        requesterName={selectedNotification?.assignee || ''}
      />

      <AcceptRequestModal
        open={acceptModalOpen}
        onClose={() => setAcceptModalOpen(false)}
        onCommit={handleAcceptCommit}
        commitmentDescription={selectedNotification?.description || ''}
      />
    </>
  );
};

export default ActionNotifications;