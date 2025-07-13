import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  iconColor: string;
  avatarBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, iconColor, avatarBgColor }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100%',
        p: 2,
      }}
    >
      <Avatar sx={{ width: 64, height: 64, bgcolor: avatarBgColor, mb: 2 }}>
        <Icon sx={{ color: iconColor, fontSize: 32 }} />
      </Avatar>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
        {label}
      </Typography>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        {value}
      </Typography>
    </Box>
  );
};

export default StatCard;