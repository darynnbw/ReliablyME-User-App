import React from 'react';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import { Adjust, AccessTime, ShowChart } from '@mui/icons-material'; // Importing new icons

interface StatCircleProps {
  value: number;
  label: string;
  subLabel: string;
  color: string;
  textColor: string;
  size?: number;
  thickness?: number;
  unit?: string; // Optional unit for display
}

const StatCircle: React.FC<StatCircleProps> = ({ value, label, subLabel, color, textColor, size = 100, thickness = 4, unit = '%' }) => (
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
          {value}{unit}
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

interface NumberCircleProps {
  value: number;
  label: string;
  subLabel: string;
  icon: React.ElementType;
  iconColor: string;
  size?: number;
  thickness?: number;
}

const NumberCircle: React.FC<NumberCircleProps> = ({ value, label, subLabel, icon: Icon, iconColor, size = 100, thickness = 4 }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
    <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
      <CircularProgress
        variant="determinate"
        value={100} // Always 100 for a full circle background
        size={size}
        thickness={thickness}
        sx={{ color: '#e0e0e0' }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon sx={{ fontSize: 24, color: iconColor, mb: 0.5 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#333', fontSize: '1.2rem' }}>
          {value}
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
      height: { xs: 'auto', md: 450 }, // Adjusted height to accommodate new layout
      minHeight: { xs: 350, md: 450 },
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

      {/* Reliability Rating Section (Top) */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        mb: 4,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #e3f2fd 0%, #fff3e0 100%)', // Subtle gradient
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        flexGrow: 1, // Allow it to take available space
      }}>
        <StatCircle
          value={85.7}
          label="Reliability Rating"
          subLabel="85.7% after 24 commitments in the past 90 days"
          color="#ff7043"
          textColor="#ff7043"
          size={150} // Larger size for the main stat
          thickness={6}
        />
      </Box>

      {/* Other Stats Section (Bottom) */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <NumberCircle
          value={1247}
          label="Total Points"
          subLabel="1247 Total Points"
          icon={Adjust}
          iconColor="#1976d2"
          size={100}
          thickness={4}
        />
        <StatCircle
          value={92.3}
          label="Punctuality Record"
          subLabel="94.4% Punctuality Record"
          color="#1976d2"
          textColor="#1976d2"
          size={100}
          thickness={4}
        />
        <StatCircle
          value={2.3}
          label="Confidence Score"
          subLabel="2.3 Confidence Score"
          color="#4caf50"
          textColor="#4caf50"
          size={100}
          thickness={4}
          unit="" // No unit for confidence score
        />
      </Box>
    </Paper>
  );
};

export default AccomplishmentsOverviewPanel;