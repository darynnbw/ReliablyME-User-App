import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import { MyLocation, AccessTime, ShowChart } from '@mui/icons-material'; // Icons for metric cards
import ReliabilityRatingChart from './ReliabilityRatingChart';
import MetricCard from './MetricCard';

const AccomplishmentsOverviewPanel: React.FC = () => {
  return (
    <Paper
      sx={{
        p: 3,
        height: 'auto',
        minHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fafbfc', // Light background for the whole panel
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e8eaed',
        mb: 4, // Margin bottom for separation from other sections
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: '#333', // Darker color for section title
          fontSize: '1.5rem',
          mb: 3,
        }}
      >
        Accomplishments Overview
      </Typography>

      {/* A. Reliability Rating Chart */}
      <ReliabilityRatingChart value={85.7} commitments={24} days={90} />

      {/* B. Three Circular Metric Cards */}
      <Grid container spacing={3} justifyContent="center" alignItems="flex-start" sx={{ mt: 4 }}> {/* Added top margin */}
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <MetricCard
            icon={MyLocation}
            value={1247}
            label="Total Points"
            iconColor="#1976d2" // Blue icon
            ringColor="#e0e0e0" // Light grey ring
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <MetricCard
            icon={AccessTime}
            value={94.4}
            unit="%"
            label="Punctuality Record"
            iconColor="#1976d2" // Blue icon
            ringColor="#e0e0e0" // Light grey ring
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <MetricCard
            icon={ShowChart}
            value={2.3}
            label="Confidence Score"
            iconColor="#4caf50" // Green icon
            ringColor="#e0e0e0" // Light grey ring
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccomplishmentsOverviewPanel;