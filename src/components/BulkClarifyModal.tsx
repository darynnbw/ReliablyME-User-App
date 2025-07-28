import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import { Close, Person, CalendarToday, Group as GroupIcon } from '@mui/icons-material';
import ConfettiAnimation from './ConfettiAnimation';

interface Commitment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  isGroup?: boolean;
  groupMembers?: string[];
}

interface BulkClarifyModalProps {
  open: boolean;
  onClose: () => void;
  commitments: Commitment[];
}

const BulkClarifyModal: React.FC<BulkClarifyModalProps> = ({ open, onClose, commitments }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    setIsSubmitted(false);
    setMessage('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
      setMessage('');
      setIsSubmitted(false);
    }
  }, [open]);

  useEffect(() => {
    if (isSubmitted) {
      const timerId = setTimeout(handleClose, 3500);
      return () => clearTimeout(timerId);
    }
  }, [isSubmitted, handleClose]);

  if (!open || commitments.length === 0) {
    return null;
  }

  const handleNext = () => {
    console.log(`Clarification for commitment ID ${commitments[currentIndex].id} sent:`, message);
    
    const isLast = currentIndex === commitments.length - 1;
    if (isLast) {
      setIsSubmitted(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setMessage('');
    }
  };

  const currentCommitment = commitments[currentIndex];
  const isLastItem = currentIndex === commitments.length - 1;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          transition: 'all 0.3s ease-in-out',
          ...(isSubmitted
            ? { p: 3, maxWidth: '450px', alignItems: 'center', justifyContent: 'center' }
            : { p: 3, maxWidth: '600px' }
          ),
        },
      }}
    >
      {!isSubmitted && (
        <>
          <DialogTitle sx={{ p: 0, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '24px' }}>
                Bulk Clarify ({currentIndex + 1} of {commitments.length})
              </Typography>
              <IconButton onClick={handleClose} sx={{ color: '#666' }}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
        </>
      )}

      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {isSubmitted ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center' }}>
            <ConfettiAnimation />
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 1 }}>
              Requests Sent!
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${commitments.length} clarification request${commitments.length > 1 ? 's have' : ' has'} been sent.`}
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333', fontSize: '20px' }}>
              {currentCommitment.title}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {currentCommitment.isGroup ? (
                  <GroupIcon sx={{ fontSize: 20, color: '#1976d2' }} />
                ) : (
                  <Person sx={{ fontSize: 20, color: '#1976d2' }} />
                )}
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                  To:{' '}
                  <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                    {currentCommitment.assignee}
                    {currentCommitment.isGroup && currentCommitment.groupMembers && currentCommitment.groupMembers.length > 0 && (
                      ` (${currentCommitment.groupMembers.join(', ')})`
                    )}
                  </Typography>
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CalendarToday sx={{ fontSize: 20, color: '#004C97' }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                  Due:{' '}
                  <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                    {currentCommitment.dueDate.replace('Due ', '')}
                  </Typography>
                </Typography>
              </Box>
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
                {currentCommitment.description}
              </Typography>
            </Box>

            <TextField
              multiline
              rows={4}
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe what details or documents you need to approve this badge"
              variant="outlined"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#fafafa',
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#bdbdbd',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: '16px',
                  lineHeight: 1.5,
                },
              }}
            />

            <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!message.trim()}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600, // Consistent font weight
                  width: '100%',
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '16px',
                  '&:hover': { bgcolor: 'primary.dark' },
                  '&:disabled': { 
                    bgcolor: '#e0e0e0',
                    color: '#9e9e9e'
                  },
                }}
              >
                {isLastItem ? 'Send Requests' : 'Next Clarification'}
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BulkClarifyModal;