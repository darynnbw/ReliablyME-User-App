import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { MyLocation, AccessTime, TrendingUp } from '@mui/icons-material';
import ReliabilityRatingChart from './ReliabilityRatingChart';
import MetricCard from './MetricCard';

const AccomplishmentsOverviewPanel: React.FC = () => {
  return (
    <Paper
      sx={{
        p: 3, // Consistent padding
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e8eaed',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: 'primary.main',
          fontSize: '1.25rem',
          mb: 1,
        }}
      >
        Accomplishments Overview
      </Typography>

      <ReliabilityRatingChart value={85.7} commitments={24} days={90} />

      <Grid container spacing={{ xs: 3, sm: 4 }} justifyContent="center" alignItems="flex-start">
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <MetricCard
            icon={MyLocation}
            value={1247}
            label="Total Points"
            iconColor="#1976d2" // Blue icon
            avatarBgColor="#e3f2fd" // Light blue background
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <MetricCard
            icon={AccessTime}
            value="94.4"
            unit="%"
            label="Punctuality Rate"
            iconColor="#1976d2" // Blue icon
            avatarBgColor="#e3f2fd" // Light blue background
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <MetricCard
            icon={TrendingUp}
            value={2.3}
            label="Confidence Score"
            iconColor="#2e7d32" // Green icon
            avatarBgColor="#e8f5e9" // Light green background
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccomplishmentsOverviewPanel;