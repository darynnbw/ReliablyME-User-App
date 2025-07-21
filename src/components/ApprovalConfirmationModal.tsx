import React, { useEffect } from 'react';
import { Dialog, Box, Typography } from '@mui/material';
import ConfettiAnimation from './ConfettiAnimation';

interface ApprovalConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  requesterName: string;
}

const ApprovalConfirmationModal: React.FC<ApprovalConfirmationModalProps> = ({ open, onClose, requesterName }) => {
  useEffect(() => {
    if (open) {
      const timerId = setTimeout(onClose, 3500); // A bit longer to enjoy the confetti
      return () => clearTimeout(timerId);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          p: 4,
          maxWidth: '480px',
          minHeight: '280px',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <ConfettiAnimation />
        <Typography variant="h5" sx={{ fontWeight: 700, mt: 3, mb: 1 }}>
          Badge Approved!
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {requesterName} has been notified.
        </Typography>
      </Box>
    </Dialog>
  );
};

export default ApprovalConfirmationModal;