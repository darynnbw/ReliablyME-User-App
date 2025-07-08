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
  Chip,
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

const recipientOptions = [
  { name: 'Alex Johnson' },
  { name: 'Chris Parker' },
  { name: 'Riley Chen' },
];

const MakePromiseModal: React.FC<MakePromiseModalProps> = ({ open, onClose }) => {
  const [badge, setBadge] = useState('');
  const [promise, setPromise] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  
  const isFormValid = !!(badge && promise.trim() && recipients.length > 0);

  const handleSubmit = () => {
    console.log({
      badge,
      promise,
      recipients,
    });
    // In a real app, a success toast would be shown here.
    handleClose();
  };

  const handleClose = () => {
    // Reset state on close
    setBadge('');
    setPromise('');
    setRecipients([]);
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '24px' }}>
              Make a Promise
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You're about to promise to do something for someone
            </Typography>
          </Box>
          <IconButton onClick={handleClose} sx={{ color: '#666' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>1. Badge you’ll earn</Typography>
            <FormControl fullWidth>
              <Select
                value={badge}
                onChange={(e: SelectChangeEvent) => setBadge(e.target.value)}
                displayEmpty
                sx={{ borderRadius: 2, bgcolor: 'grey.50' }}
                inputProps={{ 'aria-label': 'Badge you’ll earn' }}
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
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>2. What do you promise to do?</Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Write your promise"
              placeholder="e.g. I'll finish the report"
              value={promise}
              onChange={(e) => setPromise(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'grey.50',
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
              onChange={(_, newValue) => {
                setRecipients(newValue);
              }}
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
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
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: '#e0e0e0' }} />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!isFormValid}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              textTransform: 'none',
              width: '100%',
              maxWidth: '400px',
              minHeight: '48px',
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '16px',
              '&:hover': { bgcolor: 'primary.dark' },
              '&:disabled': {
                bgcolor: '#e0e0e0',
                color: '#9e9e9e',
              },
            }}
          >
            Make Promise
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MakePromiseModal;