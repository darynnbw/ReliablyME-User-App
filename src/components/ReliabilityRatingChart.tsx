import React from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';

interface ReliabilityRatingChartProps {
  value: number;
  commitments: number;
  days: number;
}

const ReliabilityRatingChart: React.FC<ReliabilityRatingChartProps> = ({ value, commitments, days }) => {
  const circleSize = 150;
  const circleThickness = 8;

  return (
    <Paper
      sx={{
        p: 4,
        background: 'linear-gradient(135deg, #f7fafd 0%, #fff3e0 100%)', // Subtle blue to light orange gradient
        borderRadius: 3,
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 4, // Margin bottom to separate from metric cards
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
        {/* Background circle (for full ring) */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={circleSize}
          thickness={circleThickness}
          sx={{ color: '#e0e0e0', position: 'absolute', left: 0, top: 0 }}
        />
        {/* Foreground progress ring */}
        <CircularProgress
          variant="determinate"
          value={value}
          size={circleSize}
          thickness={circleThickness}
          sx={{ color: '#ff7043' }} // Orange ring color
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#333', fontSize: '2rem' }}>
            {value}%
          </Typography>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
        Reliability Rating
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', lineHeight: 1.4 }}>
        <Typography component="span" sx={{ fontWeight: 700, color: '#333' }}>
          {value}%
        </Typography>{' '}
        after{' '}
        <Typography component="span" sx={{ fontWeight: 700, color: '#333' }}>
          {commitments} commitments
        </Typography>{' '}
        in the past{' '}
        <Typography component="span" sx={{ fontWeight: 700, color: '#333' }}>
          {days} days
        </Typography>
      </Typography>
    </Paper>
  );
};

export default ReliabilityRatingChart;