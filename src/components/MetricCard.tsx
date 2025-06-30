import React from 'react';
import { Box, Typography } from '@mui/material';

interface MetricCardProps {
  value: number | string;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  unit?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  icon: Icon,
  iconColor,
  unit = '',
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: '1px solid #e0e0e0', // Light gray border
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1.5, // Spacing between icon circle and value
        }}
      >
        <Icon sx={{ fontSize: 28, color: iconColor }} /> {/* Icon in the center */}
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