import React from 'react';
import { Paper, Typography } from '@mui/material';

interface StatCardProps {
  label: string;
  value: string | number;
  onClick: () => void;
  isSelected: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, onClick, isSelected }) => {
  return (
    <Paper
      onClick={onClick}
      sx={{
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        border: '1px solid',
        borderColor: isSelected ? 'primary.main' : 'transparent',
        boxShadow: isSelected ? 4 : 1,
        bgcolor: isSelected ? 'primary.light' : 'background.paper',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  );
};

export default StatCard;