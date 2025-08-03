import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import { Close, Person, CalendarToday, Schedule } from '@mui/icons-material';

interface Commitment {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  committedDate?: string;
}

interface CommitmentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  commitment: Commitment | null;
  onRequestBadgeClick?: () => void;
  isRequest?: boolean;
  onAcceptRequestClick?: () => void;
  onDeclineRequestClick?: () => void;
  isAwaitingResponse?: boolean;
  isOwedToMe?: boolean;
  onRevokeClick?: () => void;
  onClarifyClick?: () => void;
  isCommitmentPortfolioPage?: boolean; // New prop
}

const CommitmentDetailsModal: React.FC<CommitmentDetailsModalProps> = ({
  open,
  onClose,
  commitment,
  onRequestBadgeClick,
  isRequest,
  onAcceptRequestClick,
  onDeclineRequestClick,
  isAwaitingResponse,
  isOwedToMe,
  onRevokeClick,
  onClarifyClick,
  isCommitmentPortfolioPage = false, // Default to false
}) => {
  if (!commitment) return null;

  const renderActionButtons = () => {
    if (isAwaitingResponse) {
      return (
        <Button
          variant="contained"
          onClick={onRevokeClick}
          fullWidth
          sx={{
            bgcolor: '#F44336',
            color: 'white',
            textTransform: 'none',
            py: 1.5,
            fontSize: '16px',
            fontWeight: 'bold',
            '&:hover': { bgcolor: '#d32f2f' },
          }}
        >
          Revoke
        </Button>
      );
    }
    if (isOwedToMe) {
      return (
        <Button
          variant="contained"
          onClick={onClarifyClick}
          fullWidth
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            textTransform: 'none',
            py: 1.5,
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: 1,
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          Clarify
        </Button>
      );
    }
    if (isRequest) {
      return (
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <Button
            variant="contained"
            onClick={onDeclineRequestClick}
            fullWidth
            sx={{
              bgcolor: '#F44336',
              color: 'white',
              textTransform: 'none',
              py: 1.5,
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#d32f2f' },
            }}
          >
            Decline
          </Button>
          <Button
            variant="contained"
            onClick={onAcceptRequestClick}
            fullWidth
            sx={{
              bgcolor: '#4CAF50',
              color: 'white',
              textTransform: 'none',
              py: 1.5,
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#388e3c' },
            }}
          >
            Accept
          </Button>
        </Box>
      );
    }
    // Default button (Request Badge) - only show if NOT on Commitment Portfolio page
    if (!isCommitmentPortfolioPage) {
      return (
        <Button
          variant="contained"
          onClick={onRequestBadgeClick}
          fullWidth
          sx={{
            bgcolor: '#FF7F41',
            color: 'white',
            textTransform: 'none',
            fontWeight: 'bold',
            py: 1.5,
            borderRadius: 1,
            fontSize: '16px',
            '&:hover': { bgcolor: '#F4611A' },
          }}
        >
          Request Badge
        </Button>
      );
    }
    return null; // No button if on Commitment Portfolio page
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 3,
          maxWidth: '600px',
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '24px' }}>
            Commitment Details
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#666' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />

      <DialogContent sx={{ p: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333', fontSize: '20px' }}>
          {commitment.title}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Person sx={{ fontSize: 20, color: '#FF7F41' }} />
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
              To:{' '}
              <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                {commitment.assignee}
              </Typography>
            </Typography>
          </Box>

          {!isAwaitingResponse && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CalendarToday sx={{ fontSize: 20, color: '#004C97' }} />
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                Due:{' '}
                <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                  {commitment.dueDate}
                </Typography>
              </Typography>
            </Box>
          )}

          {commitment.committedDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Schedule sx={{ fontSize: 20, color: '#83B114' }} />
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                Committed:{' '}
                <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                  {commitment.committedDate}
                </Typography>
              </Typography>
            </Box>
          )}
        </Box>

        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1.5, color: '#333', fontSize: '16px' }}>
          Original Commitment
        </Typography>
        <Box 
          sx={{ 
            mb: 3,
            bgcolor: '#f8f9fa',
            p: 2.5,
            borderRadius: 2,
            border: '1px solid #e9ecef'
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#333', fontSize: '16px', fontWeight: 400 }}>
            {commitment.description}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {renderActionButtons()}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CommitmentDetailsModal;