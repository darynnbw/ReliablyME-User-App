import React, { useEffect } from 'react';
import { Dialog, Box, Typography } from '@mui/material';
import ConfettiAnimation from './ConfettiAnimation';

interface ApprovalConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  requesterName?: string;
  count?: number;
}

const ApprovalConfirmationModal: React.FC<ApprovalConfirmationModalProps> = ({ open, onClose, requesterName, count }) => {
  useEffect(() => {
    if (open) {
      const timerId = setTimeout(onClose, 3500); // A bit longer to enjoy the confetti
      return () => clearTimeout(timerId);
    }
  }, [open, onClose]);

  if (!open) return null;

  const isBulk = count && count > 1;
  const title = isBulk ? 'Badges Approved!' : 'Badge Approved!';
  const message = isBulk
    ? `${count} badge requests have been approved.`
    : `${requesterName} has been notified.`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          p: 3,
          maxWidth: '500px',
          minHeight: '280px',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <ConfettiAnimation />
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {message}
        </Typography>
      </Box>
    </Dialog>
  );
};

export default ApprovalConfirmationModal;