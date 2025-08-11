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
  Stack,
} from '@mui/material';
import { Close, CalendarToday } from '@mui/icons-material';
import ConfettiAnimation from './ConfettiAnimation';

interface AnswerNudgeModalProps {
  open: boolean;
  onClose: () => void;
  commitment: {
    title: string;
    description?: string;
    questions?: string[];
    dueDate?: string;
  } | null;
}

const AnswerNudgeModal: React.FC<AnswerNudgeModalProps> = ({ open, onClose, commitment }) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    setIsSubmitted(false);
    setAnswer('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isSubmitted) {
      const timerId = setTimeout(handleClose, 3500);
      return () => clearTimeout(timerId);
    }
  }, [isSubmitted, handleClose]);

  const handleSubmit = () => {
    console.log('Submitted answer:', answer);
    setIsSubmitted(true);
  };

  const defaultQuestions = [
    '1. What have you accomplished so far this week?',
    '2. What do you plan to accomplish/complete by the end of the week?',
    '3. What are you concerned about that might hinder your progress?',
  ];

  const questionsToRender = commitment?.questions?.map((q, i) => `${i + 1}. ${q}`) ?? defaultQuestions;

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
                Answer Nudge
              </Typography>
              <IconButton onClick={onClose} sx={{ color: '#666' }}>
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
              Nudge answered!
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Consistency is key.
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', fontSize: '20px' }}>
              {commitment?.title || 'Mid-Week Progress'}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, mb: 3 }}>
              <CalendarToday sx={{ fontSize: 20, color: '#004C97' }} />
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                Due:{' '}
                <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                  {commitment?.dueDate || 'Apr 4, 9:30 PM'}
                </Typography>
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1.5, color: '#333', fontSize: '16px' }}>
              Today's Questions
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
              <Stack spacing={1}>
                {questionsToRender.map((question, index) => (
                  <Typography key={index} variant="body1" sx={{ lineHeight: 1.6, color: '#333', fontSize: '16px', fontWeight: 400 }}>
                    {question}
                  </Typography>
                ))}
              </Stack>
            </Box>

            <TextField
              multiline
              rows={4}
              fullWidth
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
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

            <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!answer.trim()}
                sx={{
                  bgcolor: '#ff7043',
                  color: 'white',
                  textTransform: 'none',
                  width: '100%',
                  minHeight: '48px',
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '16px',
                  '&:hover': { bgcolor: '#f4511e' },
                  '&:disabled': { 
                    bgcolor: '#e0e0e0',
                    color: '#9e9e9e'
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AnswerNudgeModal;