import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface ReliabilityRatingChartProps {
  value: number;
  displayValue: string | number;
  title: string;
}

const ReliabilityRatingChart: React.FC<ReliabilityRatingChartProps> = ({ value, displayValue, title }) => {
  const circleSize = 140;
  const circleThickness = 5;

  return (
    <Box
      sx={{
        pt: 2,
        pb: 1,
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
          sx={{ color: 'secondary.main', transition: 'transform 0.4s ease' }}
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
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            {displayValue}
          </Typography>
        </Box>
      </Box>

      {/* Label */}
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>
        {title}
      </Typography>
    </Box>
  );
};

export default ReliabilityRatingChart;