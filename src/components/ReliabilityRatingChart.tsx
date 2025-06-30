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
        alignItems: 'center', // Horizontally center all items in this flex container
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {/* Circular Chart */}
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}> {/* mb: 2 is 16px */}
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
          sx={{ color: 'secondary.main' }} // Uses theme's secondary color (orange)
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
            {`${value}%`}
          </Typography>
        </Box>
      </Box>

      {/* Label */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}> {/* mb: 1 is 8px */}
        Reliability Rating
      </Typography>

      {/* Description */}
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
        <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {`${value}%`}
        </Typography>
        {' after '}
        <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {commitments} commitments
        </Typography>
        {' in the past '}
        <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {days} days
        </Typography>
      </Typography>
    </Box>
  );
};

export default ReliabilityRatingChart;