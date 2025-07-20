import React, { useState, useEffect } from 'react';
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

interface RequestBadgeModalProps {
  open: boolean;
  onClose: () => void;
}

const RequestBadgeModal: React.FC<RequestBadgeModalProps> = ({ open, onClose }) => {
  const [explanation, setExplanation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    setIsSubmitted(false);
    setExplanation('');
    onClose();
  };

  useEffect(() => {
    if (isSubmitted) {
      const timerId = setTimeout(handleClose, 3000);
      return () => clearTimeout(timerId);
    }
  }, [isSubmitted]);

  const handleRequestBadge = () => {
    console.log('Badge requested with explanation:', explanation);
    setIsSubmitted(true);
  };

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
            ? { p: 3, maxWidth: '450px', height: '250px', alignItems: 'center', justifyContent: 'center' }
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
                Badge Request
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
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 3, mb: 1.5 }}>
              You’re all set!
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              1 badge request will be confirmed, rejected, or sent back for more info.
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333', fontSize: '20px' }}>
              Promise Kept General
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Person sx={{ fontSize: 20, color: '#FF7F41' }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                  From:{' '}
                  <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                    Chris Parker
                  </Typography>
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CalendarToday sx={{ fontSize: 20, color: '#004C97' }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                  Due:{' '}
                  <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                    Apr 1, 12:00 AM
                  </Typography>
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Schedule sx={{ fontSize: 20, color: '#83B114' }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                  Committed:{' '}
                  <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                    Mar 27, 9:15 PM
                  </Typography>
                </Typography>
              </Box>
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
                I will join the project kickoff meeting to discuss the upcoming launch and provide my input on the project roadmap.
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: '#333', fontSize: '16px' }}>
              Explanation
            </Typography>

            <TextField
              multiline
              rows={2}
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
                onClick={handleRequestBadge}
                disabled={!explanation.trim()}
                sx={{
                  bgcolor: '#FF7F41',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  width: '100%',
                  py: 1,
                  borderRadius: 1,
                  fontSize: '16px',
                  '&:hover': { bgcolor: '#F4611A' },
                  '&:disabled': { 
                    bgcolor: '#e0e0e0',
                    color: '#9e9e9e'
                  },
                }}
              >
                Request Badge
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequestBadgeModal;