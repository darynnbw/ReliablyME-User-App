import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Phone, Download } from '@mui/icons-material';

interface UserProfileSectionProps {
  name: string;
  phone: string;
  onExportClick: () => void; // New prop for opening the wizard
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  name,
  phone,
  onExportClick,
}) => {
  return (
    <Paper
      sx={{
        py: { xs: 2, sm: 3 }, // Keep vertical padding as is
        px: { xs: 2, sm: 4 }, // Increased horizontal padding for better alignment
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 0.5 } }}>
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

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={onExportClick} // Trigger the new wizard
          sx={{
            bgcolor: '#607d8b',
            textTransform: 'none',
            px: 3,
            py: 1,
            borderRadius: 1,
            '&:hover': { bgcolor: '#546e7a' },
          }}
        >
          Export
        </Button>
      </Box>
    </Paper>
  );
};

export default UserProfileSection;