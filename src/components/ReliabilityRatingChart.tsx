import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface ReliabilityRatingChartProps {
  value: number;
  commitments: number;
  days: number;
}

const ReliabilityRatingChart: React.FC<ReliabilityRatingChartProps> = ({ value, commitments, days }) => {
  const circleSize = 140;
  const circleThickness = 5;

  return (
    <Box
      sx={{
        pt: 3, // 24px space above chart
        pb: 3, // Reduced to 24px to better connect sections
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {/* Circular Chart */}
      <Box sx={{ position: 'relative', display: 'inline-flex', width: circleSize, height: circleSize }}>
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
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {`${value}%`}
          </Typography>
        </Box>
      </Box>

      {/* Label */}
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 3 }}> {/* 24px space below chart */}
        Reliability Rating
      </Typography>

      {/* Description */}
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', px: 2, mt: 1, fontSize: '0.875rem' }}> {/* 8px space between title and description */}
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