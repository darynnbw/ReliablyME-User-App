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
  Stack,
  Chip,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';

const presetTimes = [
  { label: '11:59 PM', value: dayjs().hour(23).minute(59) },
  { label: '9:00 PM', value: dayjs().hour(21).minute(0) },
  { label: '6:00 PM', value: dayjs().hour(18).minute(0) },
  { label: '12:00 PM', value: dayjs().hour(12).minute(0) },
];

interface Commitment {
  id: number;
  title: string;
  description: string;
}

interface BulkAcceptModalProps {
  open: boolean;
  onClose: () => void;
  commitments: Commitment[];
}

const BulkAcceptModal: React.FC<BulkAcceptModalProps> = ({ open, onClose, commitments }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
      setDate(null);
      setTime(null);
    }
  }, [open, commitments]);

  if (!open || commitments.length === 0) {
    return null;
  }

  const handleNext = () => {
    console.log(`Accepted commitment ID ${commitments[currentIndex].id} with date: ${date?.format()} and time: ${time?.format()}`);
    
    const isLast = currentIndex === commitments.length - 1;
    if (isLast) {
      onClose();
    } else {
      setCurrentIndex(prev => prev + 1);
      setDate(null);
      setTime(null);
    }
  };

  const currentCommitment = commitments[currentIndex];
  const isLastItem = currentIndex === commitments.length - 1;

  const today = dayjs();
  const tomorrow = today.add(1, 'day');
  let thisFriday = today.day(5);
  if (thisFriday.isBefore(today, 'day')) {
    thisFriday = thisFriday.add(7, 'day');
  }
  const inOneWeek = today.add(1, 'week');

  const presetDates = [
    { label: `Today (${today.format('MMM D')})`, value: today },
    { label: `Tomorrow (${tomorrow.format('MMM D')})`, value: tomorrow },
    { label: `This Friday (${thisFriday.format('MMM D')})`, value: thisFriday },
    { label: `In 1 week (${inOneWeek.format('MMM D')})`, value: inOneWeek },
  ];

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
            Bulk Accept ({currentIndex + 1} of {commitments.length})
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
            {currentCommitment.description}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333', fontSize: '18px' }}>
          When do you plan to complete this?
        </Typography>

        <Stack spacing={2}>
          <Box>
            <DatePicker
              label="Completion Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              sx={{ width: '100%' }}
              slotProps={{
                popper: {
                  placement: 'bottom',
                },
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pt: 1 }}>
              {presetDates.map(({ label, value }) => (
                <Chip
                  key={label}
                  label={label}
                  onClick={() => setDate(value)}
                  variant="outlined"
                  clickable
                />
              ))}
            </Box>
          </Box>
          <Box>
            <TimePicker
              label="Completion Time"
              value={time}
              onChange={(newTime) => setTime(newTime)}
              sx={{ width: '100%' }}
              slotProps={{
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pt: 1 }}>
              {presetTimes.map(({ label, value }) => (
                <Chip
                  key={label}
                  label={label}
                  onClick={() => setTime(value)}
                  variant="outlined"
                  clickable
                />
              ))}
            </Box>
          </Box>
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!date || !time}
            sx={{
              bgcolor: '#FF7F41',
              color: 'white',
              textTransform: 'none',
              fontWeight: 'bold',
              width: '100%',
              py: 1.5,
              borderRadius: 2,
              fontSize: '16px',
              '&:hover': { bgcolor: '#F4611A' },
              '&:disabled': { 
                bgcolor: '#e0e0e0',
                color: '#9e9e9e'
              },
            }}
          >
            {isLastItem ? 'Commit' : 'Next Commitment'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BulkAcceptModal;