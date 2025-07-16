import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface StatisticsChartProps {
  value: number;
  label: string;
  legend: string;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ value, label, legend }) => {
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
      <Box sx={{ position: 'relative', display: 'inline-flex', width: circleSize, height: circleSize, mb: 2 }}>
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
          sx={{ 
            color: 'primary.main',
            transition: 'transform 0.5s ease-in-out, stroke-dashoffset 0.5s ease-in-out',
          }}
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
            {label}
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
        {legend}
      </Typography>
    </Box>
  );
};

export default StatisticsChart;