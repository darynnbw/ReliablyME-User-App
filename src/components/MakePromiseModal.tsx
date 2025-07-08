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
  Select,
  MenuItem,
  FormControl,
  Autocomplete,
  SelectChangeEvent,
} from '@mui/material';
import { Close } from '@mui/icons-material';

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

const promiseCardOptions = [
  'I will complete the code review for the new feature branch by end of day.',
  'I will join the all-hands meeting on time and prepared to discuss Q2 goals.',
  'I will review and provide approval for the proposed changes to our design system components',
];

const recipientOptions = [
  { name: 'Alex Johnson' },
  { name: 'Chris Parker' },
  { name: 'Riley Chen' },
];

const MakePromiseModal: React.FC<MakePromiseModalProps> = ({ open, onClose }) => {
  const [badge, setBadge] = useState('');
  const [promiseCard, setPromiseCard] = useState('');
  const [customPromise, setCustomPromise] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const isFormValid = !!(badge && (promiseCard || customPromise) && (recipients.length > 0 || phoneNumber));

  const handleSubmit = () => {
    console.log({
      badge,
      promise: customPromise || promiseCard,
      recipients,
      phoneNumber,
    });
    handleClose();
  };

  const handleClose = () => {
    // Reset state on close
    setBadge('');
    setPromiseCard('');
    setCustomPromise('');
    setRecipients([]);
    setPhoneNumber('');
    onClose();
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
          maxWidth: '550px',
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '24px' }}>
            Make a Promise
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: '#666' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>Choose a badge to earn</Typography>
            <FormControl fullWidth>
              <Select
                value={badge}
                onChange={(e: SelectChangeEvent) => setBadge(e.target.value)}
                displayEmpty
                sx={{ borderRadius: 2, bgcolor: 'grey.50' }}
              >
                <MenuItem value="" disabled>
                  <Typography sx={{color: 'text.secondary'}}>Select a badge</Typography>
                </MenuItem>
                {badgeOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>Choose or create a promise card</Typography>
            <FormControl fullWidth>
              <Select
                value={promiseCard}
                onChange={(e: SelectChangeEvent) => {
                  setPromiseCard(e.target.value);
                  if (e.target.value) setCustomPromise(''); // Clear custom if template is selected
                }}
                displayEmpty
                sx={{ borderRadius: 2, bgcolor: 'grey.50' }}
              >
                <MenuItem value="" disabled>
                  <Typography sx={{color: 'text.secondary'}}>Select a promise card</Typography>
                </MenuItem>
                {promiseCardOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              variant="standard"
              label="Or enter custom promise"
              value={customPromise}
              onChange={(e) => {
                setCustomPromise(e.target.value);
                if (e.target.value) setPromiseCard(''); // Clear template if custom is typed
              }}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>Select recipients</Typography>
            <Autocomplete
              multiple
              options={recipientOptions.map((option) => option.name)}
              value={recipients}
              onChange={(_, newValue) => {
                setRecipients(newValue);
              }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Select or enter recipients"
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
            <TextField
              fullWidth
              variant="standard"
              label="Or enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: '#e0e0e0' }} />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!isFormValid}
            sx={{
              bgcolor: '#ff7043',
              color: 'white',
              textTransform: 'none',
              width: '100%',
              maxWidth: '400px',
              minHeight: '48px',
              py: 1.5,
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
            Request Badge
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MakePromiseModal;