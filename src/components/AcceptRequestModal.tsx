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
  Stack,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';

interface AcceptRequestModalProps {
  open: boolean;
  onClose: () => void;
  onCommit: (date: Dayjs | null, time: Dayjs | null) => void;
  commitmentDescription: string;
}

const AcceptRequestModal: React.FC<AcceptRequestModalProps> = ({ open, onClose, onCommit, commitmentDescription }) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);

  const handleCommit = () => {
    onCommit(date, time);
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
          maxWidth: '500px',
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '24px' }}>
            Accept Request
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#666' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />

      <DialogContent sx={{ p: 0 }}>
        <Box 
          sx={{ 
            mb: 3,
            bgcolor: '#f8f9fa',
            p: 2,
            borderRadius: 2,
            border: '1px solid #e9ecef'
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#333', fontSize: '16px', fontWeight: 400 }}>
            {commitmentDescription}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333', fontSize: '18px' }}>
          When do you plan to complete this?
        </Typography>

        <Stack spacing={2.5} sx={{ mb: 4 }}>
          <DatePicker
            label="Completion Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            sx={{ width: '100%' }}
          />
          <TimePicker
            label="Completion Time"
            value={time}
            onChange={(newTime) => setTime(newTime)}
            sx={{ width: '100%' }}
          />
        </Stack>

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
            onClick={handleCommit}
            disabled={!date || !time}
            sx={{
              bgcolor: '#ff7043',
              color: 'white',
              textTransform: 'none',
              flex: 1,
              height: '40px',
              borderRadius: 1,
              fontWeight: 600,
              fontSize: '14px',
              '&:hover': { 
                bgcolor: '#f4511e'
              },
              '&:disabled': { 
                bgcolor: '#e0e0e0',
                color: '#9e9e9e'
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

export default AcceptRequestModal;