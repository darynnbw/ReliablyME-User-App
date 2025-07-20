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

interface CommitmentActionModalProps {
  open: boolean;
  onClose: () => void;
  type: 'promise' | 'request';
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

const groupOptions = [
  'Development team',
  'Customer facing team',
  'Official co-op',
  'Part-timers',
];

const CommitmentActionModal: React.FC<CommitmentActionModalProps> = ({ open, onClose, type }) => {
  const [badge, setBadge] = useState('');
  const [promise, setPromise] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [group, setGroup] = useState('');
  const [hasExternalRecipient, setHasExternalRecipient] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid = !!(badge && promise.trim() && recipients.length > 0);

  const handleClose = () => {
    setIsSubmitted(false);
    setBadge('');
    setPromise('');
    setRecipients([]);
    setGroup('');
    setHasExternalRecipient(false);
    onClose();
  };

  useEffect(() => {
    if (isSubmitted) {
      const timerId = setTimeout(handleClose, 3000);
      return () => clearTimeout(timerId);
    }
  }, [isSubmitted]);

  const handleRecipientsChange = (_: any, newValue: string[]) => {
    setRecipients(newValue);
    const external = newValue.some(val => !recipientOptions.find(opt => opt.name === val));
    setHasExternalRecipient(external);
  };

  const handleSubmit = () => {
    console.log(`${type} sent!`, { badge, promise, recipients, group });
    setIsSubmitted(true);
  };

  const modalTexts = {
    promise: {
      title: 'Make a Promise',
      subtitle: 'Promise to do something & earn a badge when you follow through.',
      promiseLabel: 'What do you promise to do?',
      promisePlaceholder: 'Write your promise...',
      buttonText: 'Make Promise',
      confirmationText: "You're all set! Earn your badge by following through.",
    },
    request: {
      title: 'Request a Commitment',
      subtitle: 'Ask someone to do something—and reward them with a badge.',
      promiseLabel: 'What will they need to do?',
      promisePlaceholder: 'Write your request...',
      buttonText: 'Send Request',
      confirmationText: "Your request is on its way! They’ll earn a badge once it’s done.",
    },
  };
  const currentTexts = modalTexts[type];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          transition: 'all 0.3s ease-in-out',
          ...(isSubmitted
            ? { p: 3, maxWidth: '450px', height: '250px', alignItems: 'center', justifyContent: 'center' }
            : { p: 3, maxWidth: '700px' }
          ),
        },
      }}
    >
      {!isSubmitted && (
        <>
          <DialogTitle sx={{ p: 0, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '24px', mb: 2 }}>
                  {currentTexts.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {currentTexts.subtitle}
                </Typography>
              </Box>
              <IconButton onClick={handleClose} sx={{ color: '#666' }}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />
        </>
      )}

      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {isSubmitted ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center' }}>
            <Box sx={{ width: 80, height: 80, mb: 3 }}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                <AnimatedCircle cx="65.1" cy="65.1" r="62.1" />
                <AnimatedCheck d="M100.2,40.2L51.5,88.8L29.8,67.5" />
              </svg>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
              {currentTexts.confirmationText}
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, flex: 1 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>Badge they'll earn</Typography>
                <FormControl fullWidth>
                  <Select value={badge} onChange={(e: SelectChangeEvent) => setBadge(e.target.value)} displayEmpty sx={{ borderRadius: 2, bgcolor: 'grey.50' }}>
                    {badgeOptions.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>{currentTexts.promiseLabel}</Typography>
                <TextField fullWidth multiline rows={2} placeholder={currentTexts.promisePlaceholder} value={promise} onChange={(e) => setPromise(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'grey.50', '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px solid #1976d2' } } }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>Recipient(s)</Typography>
                <Autocomplete
                  multiple
                  freeSolo
                  options={recipientOptions.map((option) => option.name)}
                  value={recipients}
                  onChange={handleRecipientsChange}
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip
                        variant="outlined"
                        label={!recipientOptions.some(user => user.name === option) ? `📱 Invite: ${option}` : option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Type a name or phone number"
                    />
                  )}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'grey.50', p: 1 } }}
                />
                {hasExternalRecipient && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5, color: 'warning.dark' }}><WarningAmber sx={{ fontSize: 18 }} /><Typography variant="body2" sx={{ fontStyle: 'italic' }}>This person isn’t in the system. They’ll receive your promise via text message.</Typography></Box>}
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>Select Group</Typography>
                <FormControl fullWidth>
                  <Select
                    value={group}
                    onChange={(e: SelectChangeEvent) => setGroup(e.target.value)}
                    sx={{ borderRadius: 2, bgcolor: 'grey.50' }}
                  >
                    {groupOptions.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ mt: 'auto', pt: 3 }}>
              <Button variant="contained" onClick={handleSubmit} disabled={!isFormValid} fullWidth sx={{ bgcolor: '#ff7043', color: 'white', textTransform: 'none', height: '48px', borderRadius: 2, fontWeight: 600, fontSize: '16px', '&:hover': { bgcolor: '#f4511e' }, '&:disabled': { bgcolor: '#e0e0e0', color: '#9e9e9e' } }}>
                {currentTexts.buttonText}
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommitmentActionModal;