import React, { useEffect } from 'react';
import { Dialog, Box, Typography, keyframes, styled } from '@mui/material';

// Keyframes for the SVG animation
const drawCircle = keyframes`
  to { stroke-dashoffset: 0; }
`;

const drawCheck = keyframes`
  to { stroke-dashoffset: 0; }
`;

// Styled components for the animated SVG parts
const AnimatedCircle = styled('circle')(({ theme }) => ({
  fill: 'none',
  stroke: theme.palette.success.main,
  strokeWidth: 6,
  strokeMiterlimit: 10,
  strokeDasharray: 390,
  strokeDashoffset: 390,
  animation: `${drawCircle} 0.6s ease-out forwards`,
}));

const AnimatedCheck = styled('path')(({ theme }) => ({
  fill: 'none',
  stroke: theme.palette.success.main,
  strokeWidth: 6,
  strokeLinecap: 'round',
  strokeMiterlimit: 10,
  strokeDasharray: 100,
  strokeDashoffset: 100,
  animation: `${drawCheck} 0.4s 0.4s ease-out forwards`,
}));

interface ApprovalConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  requesterName: string;
}

const ApprovalConfirmationModal: React.FC<ApprovalConfirmationModalProps> = ({ open, onClose, requesterName }) => {
  useEffect(() => {
    if (open) {
      const timerId = setTimeout(onClose, 3000);
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center' }}>
        <Box sx={{ width: 80, height: 80, mb: 3 }}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <AnimatedCircle cx="65.1" cy="65.1" r="62.1" />
            <AnimatedCheck d="M100.2,40.2L51.5,88.8L29.8,67.5" />
          </svg>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
          Badge Approved! {requesterName} has been notified.
        </Typography>
      </Box>
    </Dialog>
  );
};

export default ApprovalConfirmationModal;