import React from 'react';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import { Adjust, AccessTime, ShowChart } from '@mui/icons-material';

interface StatCircleProps {
  value: number;
  label: string;
  subLabel: string;
  color: string;
  textColor: string;
  size?: number;
  thickness?: number;
  unit?: string;
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
    <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', fontSize: '0.9rem', lineHeight: 1.4 }}>
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
        value={100}
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
    <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', fontSize: '0.9rem', lineHeight: 1.4 }}>
      {subLabel}
    </Typography>
  </Box>
);


const AccomplishmentsOverviewPanel: React.FC = () => {
  return (
    <Paper sx={{
      p: 4, // Increased overall padding
      height: { xs: 'auto', md: 500 }, // Adjusted height to better contain content
      minHeight: { xs: 400, md: 500 },
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#fafbfc', // Subtle background tint
      borderRadius: 3,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e8eaed',
    }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: '#1976d2',
          mb: 4, // Increased margin-bottom for title separation
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
        mb: 5, // Increased spacing between main chart and lower stats
        borderRadius: 2,
        bgcolor: '#f0f4f8', // Subtle flat background
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        flexGrow: 1,
      }}>
        <StatCircle
          value={85.7}
          label="Reliability Rating"
          subLabel="85.7% after 24 commitments in the past 90 days"
          color="#ff9800"
          textColor="#e65100"
          size={150}
          thickness={5}
        />
      </Box>

      {/* Other Stats Section (Bottom) */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 2,
        px: { xs: 0, sm: 2 },
        pb: { xs: 2, sm: 0 }
      }}>
        <NumberCircle
          value={1247}
          label="Total Commitments" // Updated label
          subLabel="1247 Total Commitments" // Updated subLabel
          icon={Adjust}
          iconColor="#2196f3"
          size={100}
          thickness={3}
        />
        <StatCircle
          value={92.3}
          label="Commitment Follow-Through Rate" // Updated label
          subLabel="94.4% Commitment Follow-Through Rate" // Updated subLabel
          color="#42a5f5"
          textColor="#1976d2"
          size={100}
          thickness={3}
        />
        <StatCircle
          value={2.3}
          label="Average Nudges Received" // Updated label
          subLabel="2.3 Average Nudges Received" // Updated subLabel
          color="#66bb6a"
          textColor="#388e3c"
          size={100}
          thickness={3}
          unit=""
        />
      </Box>
    </Paper>
  );
};

export default AccomplishmentsOverviewPanel;