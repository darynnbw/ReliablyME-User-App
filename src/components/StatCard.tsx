import React from 'react';
import { Paper, Typography, alpha } from '@mui/material';

interface StatCardProps {
  label: string;
  value: string | number;
  onClick: () => void;
  isSelected: boolean;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, onClick, isSelected, color }) => {
  return (
    <Paper
      variant="outlined"
      onClick={onClick}
      sx={{
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
        borderColor: isSelected ? color : 'grey.300',
        backgroundColor: isSelected ? alpha(color, 0.1) : 'white',
        borderWidth: isSelected ? '2px' : '1px',
        transition: 'all 0.2s ease-in-out',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
          borderColor: color,
        },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: isSelected ? color : 'text.primary' }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ color: isSelected ? color : 'text.secondary' }}>
        {label}
      </Typography>
    </Paper>
  );
};

export default StatCard;