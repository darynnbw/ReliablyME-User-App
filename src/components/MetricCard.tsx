import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface MetricCardProps {
  value: number | string;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  ringColor: string;
  unit?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  icon: Icon,
  iconColor,
  ringColor,
  unit = '',
}) => {
  const circleSize = 80;
  const circleThickness = 2; // Thinner ring

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
        {/* Background circle (light grey ring) */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={circleSize}
          thickness={circleThickness}
          sx={{ color: ringColor, position: 'absolute', left: 0, top: 0 }}
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
          {/* Icon in the center */}
          <Icon sx={{ fontSize: 24, color: iconColor }} /> {/* Adjusted icon size */}
        </Box>
      </Box>
      <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#333', fontSize: '1.5rem', mb: 0.5 }}>
        {value}{unit}
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', fontSize: '0.9rem', lineHeight: 1.4 }}>
        {label}
      </Typography>
    </Box>
  );
};

export default MetricCard;