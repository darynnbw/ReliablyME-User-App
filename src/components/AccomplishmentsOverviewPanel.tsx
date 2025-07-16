import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import { MyLocation, AccessTime, TrendingUp } from '@mui/icons-material';
import ReliabilityRatingChart from './ReliabilityRatingChart';
import MetricCard from './MetricCard';

const AccomplishmentsOverviewPanel: React.FC = () => {
  return (
    <Paper
      sx={{
        p: 4, // 32px padding on all sides
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
        }}
      >
        Accomplishments Overview
      </Typography>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ReliabilityRatingChart value={85.7} commitments={24} days={90} />
      </Box>

      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <MetricCard
            icon={MyLocation}
            value={1247}
            label="Total Points"
            iconColor="#1976d2"
            avatarBgColor="#e3f2fd"
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <MetricCard
            icon={AccessTime}
            value="94.4"
            unit="%"
            label="Punctuality Rate"
            iconColor="#1976d2"
            avatarBgColor="#e3f2fd"
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <MetricCard
            icon={TrendingUp}
            value={2.3}
            label="Confidence Score"
            iconColor="#2e7d32"
            avatarBgColor="#e8f5e9"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccomplishmentsOverviewPanel;