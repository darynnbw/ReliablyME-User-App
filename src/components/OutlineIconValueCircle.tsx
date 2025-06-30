import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface OutlineIconValueCircleProps {
  value: number | string;
  label: string;
  icon: React.ElementType;
  iconColor: string; // Color for the icon and fill (if applicable)
  unit?: string;
  size?: number;
  thickness?: number;
  isFilledProgress?: boolean; // New prop to indicate if it should be a filled progress circle
}

const OutlineIconValueCircle: React.FC<OutlineIconValueCircleProps> = ({
  value,
  label,
  icon: Icon,
  iconColor,
  unit = '',
  size = 100,
  thickness = 4,
  isFilledProgress = false, // Default to outline
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
        {/* Background circle (always 100% for outline or full background) */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={size}
          thickness={thickness}
          sx={{ color: '#e0e0e0', position: 'absolute', left: 0, top: 0 }}
        />
        {/* Foreground circle (for filled progress) */}
        {isFilledProgress && typeof value === 'number' && (
          <CircularProgress
            variant="determinate"
            value={value} // Use the actual value for the fill percentage
            size={size}
            thickness={thickness}
            sx={{ color: iconColor }} // Use iconColor for the fill
          />
        )}
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
          <Icon sx={{ fontSize: 24, color: isFilledProgress ? 'white' : iconColor }} /> 
          {/* If filled, icon should be white for contrast, otherwise use iconColor */}
        </Box>
      </Box>
      <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#333', fontSize: '1.2rem', mb: 0.5 }}>
        {value}{unit}
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', fontSize: '0.9rem', lineHeight: 1.4 }}>
        {label}
      </Typography>
    </Box>
  );
};

export default OutlineIconValueCircle;