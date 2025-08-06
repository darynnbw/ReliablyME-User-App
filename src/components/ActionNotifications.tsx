import React, { useState, useCallback } from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import CommitmentDetailsModal from './CommitmentDetailsModal';
import AnswerNudgeModal from './AnswerNudgeModal';
import DeclineModal from './DeclineModal';
import RequestClarificationModal from './RequestClarificationModal';
import SuccessConfirmationModal from './SuccessConfirmationModal';
import AcceptRequestModal from './AcceptRequestModal';
import NudgeDetailsModal from './NudgeDetailsModal';
import NotificationCard from './NotificationCard';

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
    title: 'On Track Daily',
    type: 'Nudge',
    description: 'I will provide a daily update on my task progress.',
    assignee: 'Chris Parker',
    actions: ['edit'],
    dueDate: 'Apr 11, 9:00 AM',
    questions: ['Did you complete all your planned tasks today?'],
  },
  {
    id: 3,
    title: 'Promise Kept General',
    type: 'Badge Request',
    description: 'I am going to complete the mandatory HR compliance training course.',
    explanation: 'I have submitted the form and answered all the questions.',
    assignee: 'Chris Parker',
    actions: ['accept', 'decline', 'undo'],
    dueDate: 'Apr 12, 12:00 PM',
  },
  {
    id: 4,
    title: 'Promise Kept General',
    type: 'Invitation',
    description: 'I promise to review the weekly progress report and provide feedback on the team performance metrics.',
    assignee: 'Sarah Wilson',
    actions: ['accept', 'decline'],
    dueDate: 'Apr 13, 2:00 PM',
  },
  {
    id: 5,
    title: 'PR Feedback Nudge',
    type: 'Nudge',
    description: 'I will review the latest pull request for the authentication system updates and provide my feedback.',
    assignee: 'Mike Johnson',
    actions: ['edit'],
    dueDate: 'Apr 14, 4:00 PM',
    questions: ['Have you had a chance to review the pull request?'],
  },
];

const ActionNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [modalOpen, setModalOpen] = useState(false);
  const [answerNudgeModalOpen, setAnswerNudgeModalOpen] = useState(false);
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [requestClarificationModalOpen, setRequestClarificationModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [nudgeDetailsModalOpen, setNudgeDetailsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [commitmentForDetails, setCommitmentForDetails] = useState<any>(null);
  const [showClarificationSuccessModal, setShowClarificationSuccessModal] = useState(false);

  const handleCloseDetailsModal = useCallback(() => setModalOpen(false), []);
  const handleCloseAnswerNudgeModal = useCallback(() => setAnswerNudgeModalOpen(false), []);
  const handleCloseDeclineModal = useCallback(() => setDeclineModalOpen(false), []);
  const handleCloseClarificationModal = useCallback(() => setRequestClarificationModalOpen(false), []);
  const handleCloseAcceptModal = useCallback(() => setAcceptModalOpen(false), []);
  const handleCloseNudgeDetailsModal = useCallback(() => setNudgeDetailsModalOpen(false), []);
  const handleCloseApprovalModal = useCallback(() => {
    setApprovalModalOpen(false);
    setSelectedNotification(null);
  }, []);
  const handleCloseClarificationSuccessModal = useCallback(() => {
    setShowClarificationSuccessModal(false);
  }, []);

  const handleActionClick = (action: string, notification: any) => {
    setSelectedNotification(notification);
    
    if (action === 'accept') {
      if (notification.type === 'Invitation') {
        setAcceptModalOpen(true);
      } else {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
        setApprovalModalOpen(true);
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

  const handleDecline = () => {
    if (selectedNotification) {
      setNotifications(prev => prev.filter(n => n.id !== selectedNotification.id));
      setDeclineModalOpen(false);
      setSelectedNotification(null);
    }
  };

  const handleAcceptCommit = () => {
    if (selectedNotification) {
      setNotifications(prev => prev.filter(n => n.id !== selectedNotification.id));
      setSelectedNotification(null);
    }
  };

  const handleViewDetails = (notification: any) => {
    setSelectedNotification(notification);
    if (notification.type === 'Nudge') {
      setNudgeDetailsModalOpen(true);
    } else {
      setCommitmentForDetails(notification);
      setModalOpen(true);
    }
  };

  const handleSendClarification = (message: string) => {
    console.log(`Clarification request sent for notification ${selectedNotification?.id}: ${message}`);
    setNotifications(prev => prev.filter(n => n.id !== selectedNotification.id));
    setShowClarificationSuccessModal(true);
  };

  const handleAnswerNudgeFromDetails = () => {
    setNudgeDetailsModalOpen(false);
    setAnswerNudgeModalOpen(true);
  };

  return (
    <>
      <Paper sx={{ 
        p: 3, 
        height: { xs: 'auto', md: 500 },
        minHeight: { xs: 400, md: 500 },
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e8eaed',
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
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '4px' },
          '&::-webkit-scrollbar-track': { backgroundColor: '#f0f0f0' },
        }}>
          {notifications.length > 0 ? (
            <Stack spacing={1}>
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onActionClick={handleActionClick}
                  onClarificationClick={handleClarificationClick}
                  onViewDetails={handleViewDetails}
                />
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
          <Button variant="contained" sx={{ bgcolor: '#607d8b', textTransform: 'none', px: 6, py: 1, borderRadius: 1, '&:hover': { bgcolor: '#546e7a' } }}>
            See all
          </Button>
        </Box>
      </Paper>

      <CommitmentDetailsModal open={modalOpen} onClose={handleCloseDetailsModal} commitment={commitmentForDetails} />
      <NudgeDetailsModal open={nudgeDetailsModalOpen} onClose={handleCloseNudgeDetailsModal} commitment={selectedNotification} onAnswerNudgeClick={handleAnswerNudgeFromDetails} />
      <AnswerNudgeModal open={answerNudgeModalOpen} onClose={handleCloseAnswerNudgeModal} commitment={selectedNotification} />
      <DeclineModal open={declineModalOpen} onClose={handleCloseDeclineModal} title="Decline Invitation" onDecline={handleDecline} />
      <RequestClarificationModal open={requestClarificationModalOpen} onClose={handleCloseClarificationModal} notification={selectedNotification} onSend={handleSendClarification} />
      <SuccessConfirmationModal open={approvalModalOpen} onClose={handleCloseApprovalModal} title="Badge Approved!" message={`${selectedNotification?.assignee || 'The user'} has been notified.`} />
      <SuccessConfirmationModal open={showClarificationSuccessModal} onClose={handleCloseClarificationSuccessModal} title="Request Sent!" message="The clarification request has been sent." />
      <AcceptRequestModal open={acceptModalOpen} onClose={handleCloseAcceptModal} onCommit={handleAcceptCommit} commitmentDescription={selectedNotification?.description || ''} />
    </>
  );
};

export default ActionNotifications;