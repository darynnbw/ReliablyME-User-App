import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { Phone } from '@mui/icons-material';

interface UserProfileSectionProps {
  name: string;
  phone: string;
}

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ name, phone }) => {
  return (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e8eaed',
        mb: 4,
      }}
    >
      <Avatar 
        variant="rounded"
        sx={{ 
          bgcolor: 'primary.main', 
          width: 56, 
          height: 56, 
          mr: 2,
          borderRadius: '12px'
        }}
      >
        <Typography sx={{ fontWeight: 'bold', color: 'white', fontSize: '1.5rem' }}>
          {getInitials(name)}
        </Typography>
      </Avatar>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '1.75rem' }}>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Phone sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1rem' }}>
            {phone}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserProfileSection;