import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface OutlineIconValueCircleProps {
  value: number | string;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  unit?: string;
  size?: number;
  thickness?: number;
}

const OutlineIconValueCircle: React.FC<OutlineIconValueCircleProps> = ({
  value,
  label,
  icon: Icon,
  iconColor,
  unit = '',
  size = 100,
  thickness = 4,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
        <CircularProgress
          variant="determinate"
          value={100} // Always 100 for an outline circle
          size={size}
          thickness={thickness}
          sx={{ color: '#e0e0e0' }} // Light grey for the outline
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
          <Icon sx={{ fontSize: 24, color: iconColor }} /> {/* Icon inside the circle */}
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