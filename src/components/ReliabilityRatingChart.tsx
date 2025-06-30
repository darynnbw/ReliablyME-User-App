import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface ReliabilityRatingChartProps {
  value: number;
  commitments: number;
  days: number;
}

const ReliabilityRatingChart: React.FC<ReliabilityRatingChartProps> = ({ value, commitments, days }) => {
  const circleSize = 150;
  const circleThickness = 8;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={circleSize}
          thickness={circleThickness}
          sx={{ color: '#e0e0e0', position: 'absolute', left: 0, top: 0 }}
        />
        <CircularProgress
          variant="determinate"
          value={value}
          size={circleSize}
          thickness={circleThickness}
          sx={{ color: 'secondary.main' }}
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
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '2rem' }}>
            {value}%
          </Typography>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
        Reliability Rating
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
        <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {value}%
        </Typography>{' '}
        after{' '}
        <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {commitments} commitments
        </Typography>{' '}
        in the past{' '}
        <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {days} days
        </Typography>
      </Typography>
    </Box>
  );
};

export default ReliabilityRatingChart;