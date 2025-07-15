import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from '@mui/material';
import ReliabilityRatingChart from './ReliabilityRatingChart';
import StatCard from './StatCard';

// Data for the stats
const stats = {
  reliability: { label: 'Reliability Record', value: '85.7%', chartValue: 85.7, legend: 'Your reliability score over the last 90 days.' },
  points: { label: 'Total Points', value: 1247, chartValue: 100, legend: 'Total points earned from all activities.' },
  punctuality: { label: 'Punctuality Record', value: '94.4%', chartValue: 94.4, legend: 'Your punctuality rate for commitments.' },
  confidence: { label: 'Confidence Score', value: 2.3, chartValue: 100, legend: 'Your average confidence score for commitments.' },
};

const defaultDisplay = {
  title: 'Commitments Made',
  value: 24,
  chartValue: 75, // Default visual fill for the chart
  legend: 'Number of commitments made in the past 90 days.',
};

const AccomplishmentsOverviewPanel: React.FC = () => {
  const [selectedStatKey, setSelectedStatKey] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState('90');

  const selectedStat = selectedStatKey ? stats[selectedStatKey as keyof typeof stats] : null;
  
  const displayData = selectedStat ? {
    title: selectedStat.label,
    value: selectedStat.value,
    chartValue: selectedStat.chartValue,
    legend: selectedStat.legend,
  } : {
    title: defaultDisplay.title,
    value: defaultDisplay.value,
    chartValue: defaultDisplay.chartValue,
    legend: defaultDisplay.legend,
  };

  const handleStatClick = (key: string) => {
    setSelectedStatKey(prevKey => (prevKey === key ? null : key));
  };

  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e8eaed',
      }}
    >
      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
        <Grid item>
          <TextField
            label="Date Range"
            variant="outlined"
            size="small"
            value="Last 90 Days"
            InputProps={{ readOnly: true }}
            sx={{ width: 180 }}
          />
        </Grid>
        <Grid item>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>By</InputLabel>
            <Select
              value={timeFilter}
              onChange={(e: SelectChangeEvent) => setTimeFilter(e.target.value)}
              label="By"
            >
              <MenuItem value="30">30 days</MenuItem>
              <MenuItem value="60">60 days</MenuItem>
              <MenuItem value="90">90 days</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Main Graph */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ReliabilityRatingChart
          value={displayData.chartValue}
          displayValue={displayData.value}
          title={displayData.title}
        />
      </Box>

      {/* Legend */}
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mt: -1, mb: 3, minHeight: '2.5em' }}>
        {displayData.legend}
      </Typography>

      {/* 2x2 Stat Cards */}
      <Grid container spacing={2}>
        {Object.entries(stats).map(([key, stat]) => (
          <Grid item xs={12} sm={6} key={key}>
            <StatCard
              label={stat.label}
              value={stat.value}
              isSelected={selectedStatKey === key}
              onClick={() => handleStatClick(key)}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default AccomplishmentsOverviewPanel;