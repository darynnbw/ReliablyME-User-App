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

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  commitmentTitle: string;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  open, 
  onClose, 
  title,
  commitmentTitle,
  onConfirm 
}) => {
  const handleConfirm = () => {
    onConfirm();
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
          mb: 3, 
          color: '#333', 
          fontSize: '16px', 
          lineHeight: 1.6
        }}>
          You're about to commit to the following:
        </Typography>

        <Box 
          sx={{ 
            mb: 4,
            bgcolor: '#f8f9fa',
            p: 2.5,
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
            {commitmentTitle}
          </Typography>
        </Box>

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
            onClick={handleConfirm}
            sx={{
              bgcolor: '#4caf50',
              color: 'white',
              textTransform: 'none',
              flex: 1,
              height: '40px',
              borderRadius: 1,
              fontWeight: 600,
              fontSize: '14px',
              '&:hover': { 
                bgcolor: '#45a049'
              },
            }}
          >
            Commit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;