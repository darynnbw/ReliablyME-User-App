import React from 'react';
import { Box, Typography } from '@mui/material';
import { Shield } from '@mui/icons-material';

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
        p: 2,
        borderRadius: 2,
        bgcolor: 'grey.50',
        border: '1px solid',
        borderColor: 'grey.200',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          borderColor: 'primary.main',
        },
      }}
    >
      <Box
        sx={{
          width: 70,
          height: 70,
          mb: 2,
          bgcolor: 'primary.light',
          color: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          clipPath: 'polygon(50% 0%, 90% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%)', // Hexagon shape
        }}
      >
        <Shield sx={{ fontSize: 40 }} />
      </Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        ({count})
      </Typography>
    </Box>
  );
};

export default BadgeCard;