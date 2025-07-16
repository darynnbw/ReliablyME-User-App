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
      variant="outlined"
      onClick={onClick}
      sx={{
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
        borderColor: isSelected ? 'primary.main' : 'grey.300',
        backgroundColor: isSelected ? '#e3f2fd' : 'white',
        borderWidth: isSelected ? '2px' : '1px',
        transition: 'all 0.2s ease-in-out',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
          borderColor: 'primary.dark',
        },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: isSelected ? 'primary.dark' : 'text.primary' }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ color: isSelected ? 'primary.dark' : 'text.secondary' }}>
        {label}
      </Typography>
    </Paper>
  );
};

export default StatCard;