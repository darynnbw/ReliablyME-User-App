import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Phone } from '@mui/icons-material';

interface UserProfileSectionProps {
  name: string;
  phone: string;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ name, phone }) => {
  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        bgcolor: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e8eaed',
        mb: 4,
        gap: { xs: 1, sm: 2 },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '1.75rem' }}>
        {name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Phone sx={{ fontSize: 18, color: 'text.secondary' }} />
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1rem' }}>
          {phone}
        </Typography>
      </Box>
    </Paper>
  );
};

export default UserProfileSection;