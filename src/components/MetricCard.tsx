import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface MetricCardProps {
  value: number | string;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  avatarBgColor: string;
  unit?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  icon: Icon,
  iconColor,
  avatarBgColor,
  unit = '',
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <Avatar sx={{ width: 56, height: 56, bgcolor: avatarBgColor, mb: 1.5 }}>
        <Icon sx={{ color: iconColor, fontSize: 28 }} />
      </Avatar>
      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        {value}{unit}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
        {label}
      </Typography>
    </Box>
  );
};

export default MetricCard;