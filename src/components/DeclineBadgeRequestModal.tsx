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
  description: string;
  assignee: string;
}

interface DeclineBadgeRequestModalProps {
  open: boolean;
  onClose: () => void;
  notification: Notification | null;
  onDecline: (reason: string) => void;
}

const DeclineBadgeRequestModal: React.FC<DeclineBadgeRequestModalProps> = ({ 
  open, 
  onClose, 
  notification,
  onDecline 
}) => {
  const [reason, setReason] = useState('');

  const handleDecline = () => {
    onDecline(reason);
    setReason('');
    onClose();
  };

  const handleClose = () => {
    setReason('');
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
            Decline Badge Request
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
          You are declining a badge for{' '}
          <Typography component="span" sx={{ fontWeight: 600 }}>{notification.assignee}</Typography>. You can optionally provide a reason below.
        </Typography>

        <TextField
          multiline
          rows={4}
          fullWidth
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Optional: Explain why you are declining this request..."
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
            onClick={handleDecline}
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              textTransform: 'none',
              flex: 1,
              height: '40px',
              borderRadius: 1,
              fontWeight: 600,
              fontSize: '14px',
              '&:hover': { 
                bgcolor: 'error.dark'
              },
            }}
          >
            Decline Request
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeclineBadgeRequestModal;