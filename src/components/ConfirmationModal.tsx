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
  description: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  open, 
  onClose, 
  title,
  description,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary'
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
        {typeof description === 'string' ? (
          <Typography variant="body1" sx={{ mb: 4, color: '#333', fontSize: '16px', lineHeight: 1.6 }}>
            {description}
          </Typography>
        ) : (
          description
        )}

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
            {cancelText}
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            color={confirmColor}
            sx={{
              textTransform: 'none',
              flex: 1,
              height: '40px',
              borderRadius: 1,
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            {confirmText}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;