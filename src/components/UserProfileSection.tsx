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
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#333', mb: 1, fontSize: '2.2rem' }}> {/* Increased font size */}
        {name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Phone sx={{ fontSize: 20, color: '#666' }} /> {/* Increased icon size */}
        <Typography variant="body1" sx={{ color: '#666', fontSize: '1.1rem' }}> {/* Increased font size */}
          {phone}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfileSection;