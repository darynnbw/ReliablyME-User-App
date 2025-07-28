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
import ConfettiAnimation from './ConfettiAnimation';

const presetTimes = [
  { label: '11:59 PM', value: dayjs().hour(23).minute(59) },
  { label: '9:00 PM', value: dayjs().hour(21).minute(0) },
  { label: '6:00 PM', value: dayjs().hour(18).minute(0) },
  { label: '12:00 PM', value: dayjs().hour(12).minute(0) },
];

interface AcceptRequestModalProps {
  open: boolean;
  onClose: () => void;
  onCommit: (date: Dayjs | null, time: Dayjs | null) => void;
  commitmentDescription: string;
}

const AcceptRequestModal: React.FC<AcceptRequestModalProps> = ({ open, onClose, onCommit, commitmentDescription }) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    setIsSubmitted(false);
    setDate(null);
    setTime(null);
    onClose();
  };

  useEffect(() => {
    if (isSubmitted) {
      const timerId = setTimeout(handleClose, 3500);
      return () => clearTimeout(timerId);
    }
  }, [isSubmitted]);

  const handleCommit = () => {
    onCommit(date, time);
    setIsSubmitted(true);
  };

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
      onClose={handleClose}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          transition: 'all 0.3s ease-in-out',
          ...(isSubmitted
            ? { p: 3, maxWidth: '450px', height: '250px', alignItems: 'center', justifyContent: 'center' }
            : { p: 3, maxWidth: '500px' }
          ),
        },
      }}
    >
      {!isSubmitted && (
        <>
          <DialogTitle sx={{ p: 0, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '24px' }}>
                Accept Request
              </Typography>
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
            <ConfettiAnimation />
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 1 }}>
              You’re all set!
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You'll find your new promise in the My Promises tab.
            </Typography>
          </Box>
        ) : (
          <>
            <Stack spacing={3}>
              <Box 
                sx={{ 
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

              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', fontSize: '18px', m: 0 }}>
                When do you plan to complete this?
              </Typography>

              <Stack spacing={1.5}>
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {presetDates.map(({ label, value }) => (
                    <Chip
                      key={label}
                      label={label}
                      onClick={() => setDate(value)}
                      clickable
                      sx={{
                        bgcolor: '#fff3e0',
                        color: '#ff7043',
                        fontWeight: 500,
                        '&:hover': {
                          bgcolor: '#ffe0b2',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Stack>

              <Stack spacing={1.5}>
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {presetTimes.map(({ label, value }) => (
                    <Chip
                      key={label}
                      label={label}
                      onClick={() => setTime(value)}
                      clickable
                      sx={{
                        bgcolor: '#e3f2fd',
                        color: '#1976d2',
                        fontWeight: 500,
                        '&:hover': {
                          bgcolor: '#bbdefb',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Stack>
            </Stack>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleCommit}
                disabled={!date || !time}
                sx={{
                  bgcolor: '#FF7F41',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600, // Consistent font weight
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
                Commit
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AcceptRequestModal;