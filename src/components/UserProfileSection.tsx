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
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
        {name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Phone sx={{ fontSize: 18, color: '#666' }} />
        <Typography variant="body1" sx={{ color: '#666' }}>
          {phone}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfileSection;