import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface MetricCardProps {
  value: number | string;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  ringColor: string; // Added ringColor back
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
  const circleThickness = 1.5; // Very thin ring

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1.5 }}> {/* Adjusted margin-bottom */}
        {/* Background circle (light grey ring) */}
        <CircularProgress
          variant="determinate"
          value={100} // Full circle
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
          <Icon sx={{ fontSize: 28, color: iconColor }} /> {/* Icon size */}
        </Box>
      </Box>
      <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#333', mb: 0.5 }}> {/* Adjusted font weight and variant */}
        {value}{unit}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', lineHeight: 1.4 }}> {/* Adjusted variant and color */}
        {label}
      </Typography>
    </Box>
  );
};

export default MetricCard;