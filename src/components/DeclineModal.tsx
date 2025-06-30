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
import { Close } from '@mui/icons-material';

interface DeclineModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  onDecline: () => void;
}

const DeclineModal: React.FC<DeclineModalProps> = ({ 
  open, 
  onClose, 
  title,
  onDecline 
}) => {
  const handleDecline = () => {
    onDecline();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 3,
          maxWidth: '450px',
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '24px' }}>
            {title}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#666' }}>
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
          Are you sure you want to decline this invitation?
        </Typography>

        <Typography variant="body2" sx={{ 
          fontWeight: 400, 
          mb: 4, 
          color: '#666', 
          fontSize: '16px', 
          lineHeight: 1.6
        }}>
          This action cannot be undone. The sender will be notified of your decision.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={onClose}
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
              bgcolor: '#e53e3e',
              color: 'white',
              textTransform: 'none',
              flex: 1,
              height: '40px',
              borderRadius: 1,
              fontWeight: 600,
              fontSize: '14px',
              '&:hover': { 
                bgcolor: '#c53030'
              },
            }}
          >
            Decline
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeclineModal;