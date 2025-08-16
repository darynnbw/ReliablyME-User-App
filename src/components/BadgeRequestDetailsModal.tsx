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
  Chip,
  alpha,
  useTheme,
} from '@mui/material';
import { Close, Person, CalendarToday, Schedule, TaskAltOutlined } from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';

interface Commitment {
  title: string;
  description: string;
  explanation?: string;
  assignee: string;
  dueDate: string;
  committedDate?: string;
}

interface BadgeRequestDetailsModalProps {
  open: boolean;
  onClose: () => void;
  commitment: Commitment | null;
  onApprove: () => void;
  onReject: () => void;
}

const parseDateForOverdueCheck = (dateString: string): Dayjs | null => {
  let cleanDateString = dateString;
  if (dateString.startsWith('Completed ')) {
    cleanDateString = dateString.substring('Completed '.length);
  }
  const date = dayjs(cleanDateString, ['MMM D, YYYY, hh:mm A', 'MMM D, hh:mm A', 'MMM D, YYYY'], true);
  return date.isValid() ? date : null;
};

const BadgeRequestDetailsModal: React.FC<BadgeRequestDetailsModalProps> = ({
  open,
  onClose,
  commitment,
  onApprove,
  onReject,
}) => {
  const theme = useTheme();
  if (!commitment) return null;

  const parsedDueDate = parseDateForOverdueCheck(commitment.dueDate);
  const isCompleted = commitment.dueDate.startsWith('Completed ');
  const isOverdue = !isCompleted && parsedDueDate ? parsedDueDate.isBefore(dayjs()) : false;

  const completionDate = isCompleted ? commitment.dueDate.substring('Completed '.length) : null;
  // For completed items, the original due date is not available in the current data structure.
  const originalDueDate = isCompleted ? null : commitment.dueDate;

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
            Badge Request
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
              From:{' '}
              <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                {commitment.assignee}
              </Typography>
            </Typography>
          </Box>

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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CalendarToday sx={{ fontSize: 20, color: '#004C97' }} />
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
              Due:{' '}
              <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                {originalDueDate || 'N/A'}
              </Typography>
              {isOverdue && (
                <Chip
                  label="Overdue"
                  size="small"
                  sx={{
                    ml: 1,
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    color: 'error.dark',
                    fontSize: '12px',
                    fontWeight: 700,
                    height: 20,
                  }}
                />
              )}
            </Typography>
          </Box>

          {isCompleted && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TaskAltOutlined sx={{ fontSize: 20, color: '#4CAF50' }} />
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                Completed:{' '}
                <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                  {completionDate}
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

        {commitment.explanation && (
          <>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1.5, color: '#333', fontSize: '16px' }}>
              Explanation
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
                {commitment.explanation}
              </Typography>
            </Box>
          </>
        )}

        <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />

        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <Button
            variant="contained"
            onClick={onReject}
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
            Reject
          </Button>
          <Button
            variant="contained"
            onClick={onApprove}
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
            Approve
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BadgeRequestDetailsModal;