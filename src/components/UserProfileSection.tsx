import React from 'react';
import { Box, Typography } from '@mui/material';
import { Phone } from '@mui/icons-material';

interface UserProfileSectionProps {
  name: string;
  phone: string;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ name, phone }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', mb: 0.5, fontSize: '2rem' }}>
        {name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Phone sx={{ fontSize: 18, color: '#666' }} />
        <Typography variant="body2" sx={{ color: '#666', fontSize: '1rem', fontWeight: 400 }}>
          {phone}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfileSection;