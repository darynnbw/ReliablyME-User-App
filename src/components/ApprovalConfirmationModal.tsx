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
          p: 3,
          maxWidth: '450px',
          height: '250px',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <ConfettiAnimation />
        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1.1rem', mt: 3 }}>
          Badge Approved! {requesterName} has been notified.
        </Typography>
      </Box>
    </Dialog>
  );
};

export default ApprovalConfirmationModal;