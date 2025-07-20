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
  Stack,
} from '@mui/material';
import { Close, Person, CalendarToday, Schedule, Numbers as NumbersIcon, Edit } from '@mui/icons-material';

interface Commitment {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  committedDate?: string;
  nudgesLeft?: number;
  totalNudges?: number;
  questions?: string[];
}

interface NudgeDetailsModalProps {
  open: boolean;
  onClose: () => void;
  commitment: Commitment | null;
  onAnswerNudgeClick: () => void;
  isRequest?: boolean;
  onAcceptClick?: () => void;
  onDeclineClick?: () => void;
}

const NudgeDetailsModal: React.FC<NudgeDetailsModalProps> = ({
  open,
  onClose,
  commitment,
  onAnswerNudgeClick,
  isRequest = false,
  onAcceptClick,
  onDeclineClick,
}) => {
  if (!commitment) return null;

  const totalNudges = commitment.totalNudges || 10;
  const usedNudges = totalNudges - (commitment.nudgesLeft || 0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 3, maxWidth: '600px' } }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '24px' }}>
            Nudge Details
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
              <Typography component="span" sx={{ fontWeight: 400, fontSize: 'inherit' }}>
                {commitment.assignee}
              </Typography>
            </Typography>
          </Box>

          {!isRequest && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CalendarToday sx={{ fontSize: 20, color: '#004C97' }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                  Last Nudge Due:{' '}
                  <Typography component="span" sx={{ fontWeight: 400, fontSize: 'inherit' }}>
                    {commitment.dueDate}
                  </Typography>
                </Typography>
              </Box>

              {commitment.committedDate && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Schedule sx={{ fontSize: 20, color: '#83B114' }} />
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                    Committed:{' '}
                    <Typography component="span" sx={{ fontWeight: 400, fontSize: 'inherit' }}>
                      {commitment.committedDate}
                    </Typography>
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <NumbersIcon sx={{ fontSize: 20, color: '#666' }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                  Number of Nudges:{' '}
                  <Typography component="span" sx={{ fontWeight: 400, fontSize: 'inherit' }}>
                    {`${usedNudges}/${totalNudges}`}
                  </Typography>
                </Typography>
              </Box>
            </>
          )}
        </Box>

        <Box sx={{ mb: 3, bgcolor: '#f8f9fa', p: 2.5, borderRadius: 2, border: '1px solid #e9ecef' }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>Original Commitment</Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#333', fontSize: '16px', fontWeight: 400, mb: 2 }}>
            {commitment.description}
          </Typography>
          {commitment.questions && commitment.questions.length > 0 && (
            <>
              <Divider sx={{ my: 2 }}/>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>Nudge Questions</Typography>
              <Stack spacing={1}>
                {commitment.questions.map((q, i) => (
                  <Typography key={i} variant="body1" sx={{ lineHeight: 1.6, color: '#333', fontSize: '16px', fontWeight: 400 }}>
                    {i + 1}. {q}
                  </Typography>
                ))}
              </Stack>
            </>
          )}
        </Box>

        <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {isRequest ? (
            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
              <Button
                variant="contained"
                onClick={onDeclineClick}
                fullWidth
                sx={{
                  bgcolor: '#F44336',
                  color: 'white',
                  textTransform: 'none',
                  py: 1.5,
                  fontSize: '16px',
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#d32f2f' },
                }}
              >
                Decline
              </Button>
              <Button
                variant="contained"
                onClick={onAcceptClick}
                fullWidth
                sx={{
                  bgcolor: '#4CAF50',
                  color: 'white',
                  textTransform: 'none',
                  py: 1.5,
                  fontSize: '16px',
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#388e3c' },
                }}
              >
                Accept
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              onClick={onAnswerNudgeClick}
              startIcon={<Edit />}
              sx={{
                bgcolor: '#ff7043',
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                width: '100%',
                py: 1.5,
                borderRadius: 2,
                fontSize: '16px',
                '&:hover': { bgcolor: '#f4511e' },
              }}
            >
              Answer Nudge
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NudgeDetailsModal;