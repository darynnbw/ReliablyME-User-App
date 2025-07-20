import React, { useState } from 'react';
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
import { Close } from '@mui/icons-material';

interface Notification {
  title: string;
  description: string;
  assignee: string;
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

  const handleSend = () => {
    onSend(message);
    setMessage('');
    onClose();
  };

  const handleClose = () => {
    setMessage('');
    onClose();
  };

  if (!notification) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 3,
          maxWidth: '550px',
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '24px' }}>
            Request Clarification
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: '#666' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />

      <DialogContent sx={{ p: 0 }}>
        <Typography variant="body1" sx={{ 
          fontWeight: 400, 
          mb: 2, 
          color: '#333', 
          fontSize: '16px', 
          lineHeight: 1.6
        }}>
          You are requesting clarification for the following commitment from{' '}
          <Typography component="span" sx={{ fontWeight: 600 }}>{notification.assignee}</Typography>:
        </Typography>

        <Box 
          sx={{ 
            mb: 3,
            bgcolor: '#f8f9fa',
            p: 2,
            borderRadius: 2,
            border: '1px solid #e9ecef'
          }}
        >
          <Typography variant="body1" sx={{ 
            lineHeight: 1.6, 
            color: '#333', 
            fontSize: '16px', 
            fontWeight: 400 
          }}>
            {notification.description}
          </Typography>
        </Box>

        <TextField
          multiline
          rows={4}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What information do you need to approve this badge?"
          variant="outlined"
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: '#fafafa',
            },
          }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: '#666',
              borderColor: '#ddd',
              textTransform: 'none',
              flex: 1,
              height: '40px',
              borderRadius: 1,
              fontWeight: 500,
              fontSize: '14px',
              '&:hover': { 
                borderColor: '#bbb',
                bgcolor: '#f9f9f9'
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={!message.trim()}
            sx={{
              bgcolor: '#ff9800',
              color: 'white',
              textTransform: 'none',
              flex: 1,
              height: '40px',
              borderRadius: 1,
              fontWeight: 600,
              fontSize: '14px',
              '&:hover': { 
                bgcolor: '#fb8c00'
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