import React, { useState, useEffect } from 'react';
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
  Select,
  MenuItem,
  FormControl,
  Autocomplete,
  SelectChangeEvent,
  Chip,
  styled,
  keyframes,
} from '@mui/material';
import { Close, WarningAmber } from '@mui/icons-material';

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

interface MakePromiseModalProps {
  open: boolean;
  onClose: () => void;
}

const badgeOptions = [
  'Promise Kept General',
  'Attendance',
  'Teamwork',
  'Leadership',
];

const recipientOptions = [
  { name: 'Alex Johnson' },
  { name: 'Chris Parker' },
  { name: 'Riley Chen' },
];

const MakePromiseModal: React.FC<MakePromiseModalProps> = ({ open, onClose }) => {
  const [badge, setBadge] = useState('');
  const [promise, setPromise] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [hasExternalRecipient, setHasExternalRecipient] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid = !!(badge && promise.trim() && recipients.length > 0);

  const handleClose = () => {
    // Reset all states before closing
    setIsSubmitted(false);
    setBadge('');
    setPromise('');
    setRecipients([]);
    setHasExternalRecipient(false);
    onClose();
  };

  useEffect(() => {
    if (isSubmitted) {
      const timerId = setTimeout(() => {
        handleClose();
      }, 3000); // Auto-close after 3 seconds
      
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isSubmitted, handleClose]);

  const handleRecipientsChange = (_: any, newValue: string[]) => {
    setRecipients(newValue);
    const external = newValue.some(val => !recipientOptions.find(opt => opt.name === val));
    setHasExternalRecipient(external);
  };

  const handleSubmit = () => {
    console.log("Promise sent!", {
      badge,
      promise,
      recipients,
    });
    setIsSubmitted(true);
  };

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
          maxWidth: '700px',
          transition: 'height 0.3s ease-in-out',
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '24px', mb: 2 }}>
              Make a Promise
            </Typography>
            {!isSubmitted && (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Promise to do something & earn a badge when you follow through.
              </Typography>
            )}
          </Box>
          <IconButton onClick={handleClose} sx={{ color: '#666' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />

      <DialogContent sx={{ p: 0, minHeight: 450, display: 'flex', flexDirection: 'column' }}>
        {isSubmitted ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center' }}>
            <Box sx={{ width: 80, height: 80, mb: 3 }}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                <AnimatedCircle cx="65.1" cy="65.1" r="62.1" />
                <AnimatedCheck d="M100.2,40.2L51.5,88.8L29.8,67.5" />
              </svg>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              You're all set! Earn your badge by following through.
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>1. Badge you’ll earn</Typography>
                <FormControl fullWidth>
                  <Select
                    value={badge}
                    onChange={(e: SelectChangeEvent) => setBadge(e.target.value)}
                    displayEmpty
                    sx={{ borderRadius: 2, bgcolor: 'grey.50' }}
                    inputProps={{ 'aria-label': '1. Badge you’ll earn' }}
                  >
                    {badgeOptions.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>2. What do you promise to do?</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Write your promise..."
                  value={promise}
                  onChange={(e) => setPromise(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'grey.50',
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '2px solid #1976d2',
                      },
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>3. Recipient(s)</Typography>
                <Autocomplete
                  multiple
                  freeSolo
                  options={recipientOptions.map((option) => option.name)}
                  value={recipients}
                  onChange={handleRecipientsChange}
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => {
                      const isKnownUser = recipientOptions.some(user => user.name === option);
                      let label = option;

                      if (!isKnownUser) {
                        const isPhone = /^\+?[\d\s()-]+$/.test(option);
                        const isEmail = /\S+@\S+\.\S+/.test(option);
                        if (isPhone) {
                          label = `📱 Invite: ${option}`;
                        } else if (isEmail) {
                          label = `✉️ Invite: ${option}`;
                        }
                      }
                      
                      return (
                        <Chip
                          variant="outlined"
                          label={label}
                          {...getTagProps({ index })}
                        />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Type a name, email, or phone number"
                    />
                  )}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'grey.50',
                      p: 1,
                    },
                  }}
                />
                {hasExternalRecipient && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5, color: 'warning.dark' }}>
                    <WarningAmber sx={{ fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      This person isn’t in the system. They’ll receive your promise via text message.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            <Box sx={{ mt: 'auto', pt: 3 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!isFormValid}
                fullWidth
                sx={{
                  bgcolor: '#ff7043',
                  color: 'white',
                  textTransform: 'none',
                  height: '48px',
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '16px',
                  '&:hover': { bgcolor: '#f4511e' },
                  '&:disabled': {
                    bgcolor: '#e0e0e0',
                    color: '#9e9e9e',
                  },
                }}
              >
                Make Promise
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MakePromiseModal;