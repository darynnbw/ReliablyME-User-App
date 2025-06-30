import React from 'react';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';

interface StatCircleProps {
  value: number;
  label: string;
  subLabel: string;
  color: string;
  textColor: string;
  size?: number;
  thickness?: number;
}

const StatCircle: React.FC<StatCircleProps> = ({ value, label, subLabel, color, textColor, size = 100, thickness = 4 }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
    <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={thickness}
        sx={{ color: '#e0e0e0', position: 'absolute', left: 0, top: 0 }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={thickness}
        sx={{ color: color }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: textColor, fontSize: '1.2rem' }}>
          {value}%
        </Typography>
      </Box>
    </Box>
    <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', textAlign: 'center', mb: 0.5 }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', fontSize: '0.85rem' }}>
      {subLabel}
    </Typography>
  </Box>
);

const AccomplishmentsOverviewPanel: React.FC = () => {
  return (
    <Paper sx={{
      p: 3,
      height: { xs: 'auto', md: 300 },
      minHeight: { xs: 250, md: 300 },
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#fafbfc',
      borderRadius: 3,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e8eaed',
    }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: '#1976d2',
          mb: 3,
          fontSize: '1.25rem',
        }}
      >
        Accomplishments Overview
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 2, flex: 1 }}>
        <StatCircle
          value={85.7}
          label="Reliability Rating"
          subLabel="85.7% after 24 commitments in the past 90 days"
          color="#ff7043"
          textColor="#ff7043"
          size={120}
          thickness={5}
        />
        <StatCircle
          value={92.3}
          label="Punctuality Record"
          subLabel="94.4% Punctuality Record"
          color="#1976d2"
          textColor="#1976d2"
          size={120}
          thickness={5}
        />
        <StatCircle
          value={2.3}
          label="Confidence Score"
          subLabel="2.3 Confidence Score"
          color="#4caf50"
          textColor="#4caf50"
          size={120}
          thickness={5}
        />
      </Box>
    </Paper>
  );
};

export default AccomplishmentsOverviewPanel;