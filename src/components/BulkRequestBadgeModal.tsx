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
import { Close, Person, CalendarToday, Schedule } from '@mui/icons-material';
import ConfettiAnimation from './ConfettiAnimation';

interface Commitment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  committedDate?: string;
}

interface BulkRequestBadgeModalProps {
  open: boolean;
  onClose: () => void;
  commitments: Commitment[];
  isOwedToMe: boolean;
}

const BulkRequestBadgeModal: React.FC<BulkRequestBadgeModalProps> = ({ open, onClose, commitments, isOwedToMe }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    setIsSubmitted(false);
    setExplanation('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
      setExplanation('');
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
    console.log(`Badge requested for commitment ID ${commitments[currentIndex].id} with explanation:`, explanation);
    
    const isLast = currentIndex === commitments.length - 1;
    if (isLast) {
      setIsSubmitted(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setExplanation('');
    }
  };

  const currentCommitment = commitments[currentIndex];
  const isLastItem = currentIndex === commitments.length - 1;
  const personLabel = isOwedToMe ? 'From:' : 'To:';

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
                Bulk Request ({currentIndex + 1} of {commitments.length})
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
              You’re all set!
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${commitments.length} badge request${commitments.length > 1 ? 's' : ''} will be confirmed, rejected, or sent back for more info.`}
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333', fontSize: '20px' }}>
              {currentCommitment.title}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Person sx={{ fontSize: 20, color: '#FF7F41' }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                  {personLabel}{' '}
                  <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                    {currentCommitment.assignee}
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

              {currentCommitment.committedDate && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Schedule sx={{ fontSize: 20, color: '#83B114' }} />
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                    Committed:{' '}
                    <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                      {currentCommitment.committedDate}
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
                mb: 2.5,
                bgcolor: '#f8f9fa',
                p: 2,
                borderRadius: 2,
                border: '1px solid #e9ecef'
              }}
            >
              <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#333', fontSize: '16px', fontWeight: 400 }}>
                {currentCommitment.description}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: '#333', fontSize: '16px' }}>
              Explanation
            </Typography>

            <TextField
              multiline
              rows={4}
              fullWidth
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Please explain how you completed this commitment..."
              variant="outlined"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'white',
                  border: '1px solid #e9ecef',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    backgroundColor: 'white',
                    borderColor: '#bdbdbd', // Bolder gray on hover
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      border: '2px solid #1976d2',
                    },
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: '#333',
                  fontWeight: 400,
                  padding: '12px',
                },
                '& .MuiInputBase-inputMultiline': {
                  padding: '12px',
                },
              }}
            />

            <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!explanation.trim()}
                sx={{
                  bgcolor: '#FF7F41',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  width: '100%',
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '16px',
                  '&:hover': { bgcolor: '#F4611A' },
                  '&:disabled': { 
                    bgcolor: '#e0e0e0',
                    color: '#9e9e9e'
                  },
                }}
              >
                {isLastItem ? 'Submit' : 'Next Badge Request'}
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BulkRequestBadgeModal;