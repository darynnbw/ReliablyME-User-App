import React from 'react';
import { Box, Typography } from '@mui/material';
import BadgeContent from './BadgeContent'; // Import the BadgeContent component

interface BadgeCardProps {
  title: string;
  count: number;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ title, count }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 2.5, // Increased padding
        borderRadius: 2,
        bgcolor: 'grey.50',
        border: '1px solid',
        borderColor: 'grey.200',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        },
      }}
    >
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Removed fixed width/height and clipPath as BadgeContent handles its own sizing and shape
        }}
      >
        <BadgeContent badgeType={title} size="list-item-large" /> {/* Use BadgeContent with the appropriate size */}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '1.1rem' }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
          ({count})
        </Typography>
      </Box>
    </Box>
  );
};

export default BadgeCard;