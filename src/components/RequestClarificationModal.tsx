import React, { useState, useCallback } from 'react';
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
import { Close, CalendarToday, Person, Group as GroupIcon } from '@mui/icons-material';

interface Notification {
  title: string;
  description: string;
  assignee: string;
  dueDate?: string;
  isGroup?: boolean;
  groupMembers?: string[];
}

interface RequestClarificationModalProps {
  open: boolean;
  onClose: () => void;
  notification: Notification | null;
  onSend: (message: string) => void;
}

const RequestClarificationModal: React.FC<RequestClarificationModalProps> = ({ 
  open, 
  onClose, 
  notification,
  onSend 
}) => {
  const [message, setMessage] = useState('');

  const handleClose = useCallback(() => {
    setMessage('');
    onClose();
  }, [onClose]);

  const handleSend = () => {
    onSend(message);
    handleClose();
  };

  if (!notification) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
            Request Clarification
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#666' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />

      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', fontSize: '20px' }}>
          {notification.title}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {notification.isGroup ? (
              <GroupIcon sx={{ fontSize: 20, color: '#1976d2' }} />
            ) : (
              <Person sx={{ fontSize: 20, color: '#1976d2' }} />
            )}
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
              To:{' '}
              <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                {notification.assignee}
                {notification.isGroup && notification.groupMembers && notification.groupMembers.length > 0 && (
                  ` (${notification.groupMembers.join(', ')})`
                )}
              </Typography>
            </Typography>
          </Box>
          {notification.dueDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CalendarToday sx={{ fontSize: 20, color: '#004C97' }} />
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
                Due:{' '}
                <Typography component="span" sx={{ fontWeight: 400, color: '#333', fontSize: '16px' }}>
                  {notification.dueDate}
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
            {notification.description}
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

        <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={!message.trim()}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              textTransform: 'none',
              width: '100%',
              minHeight: '48px',
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600, // Consistent font weight
              fontSize: '16px',
              '&:hover': { 
                bgcolor: 'primary.dark'
              },
              '&:disabled': { 
                bgcolor: '#e0e0e0',
                color: '#9e9e9e'
              },
            }}
          >
            Send Request
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RequestClarificationModal;