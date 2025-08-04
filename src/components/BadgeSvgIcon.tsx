import React from 'react';
import { Box } from '@mui/material';

interface BadgeSvgIconProps {
  size?: number;
  color?: string;
}

const BadgeSvgIcon: React.FC<BadgeSvgIconProps> = ({ size = 18, color = '#ff7043' }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size * 1.1, // Approximating aspect ratio
        bgcolor: color,
        clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 70%, 50% 100%, 0% 70%, 0% 20%)',
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  );
};

export default BadgeSvgIcon;