import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import BadgeCard from './BadgeCard';

const BadgesOverviewPanel: React.FC = () => {
  const [badgeFilter, setBadgeFilter] = useState('');

  const badges = [
    { id: 1, title: 'Slack Promise Kept', count: 124 },
    { id: 2, title: 'Teamwork', count: 45 },
    { id: 3, title: 'Attendance', count: 56 },
    { id: 4, title: 'Promise Kept General', count: 9 },
    { id: 5, title: 'Punctuality', count: 88 },
    { id: 6, title: 'Leadership', count: 12 },
    { id: 7, title: 'Innovation', count: 23 },
    { id: 8, title: 'Mentorship', count: 7 },
  ];

  return (
    <Paper sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#ffffff',
      borderRadius: 3,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e8eaed',
    }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'primary.main',
            fontSize: '1.25rem',
          }}
        >
          Badges Overview (389)
        </Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 220, flexShrink: 0 }}>
          <InputLabel id="badge-filter-label">Filter by Badge Type</InputLabel>
          <Select
            labelId="badge-filter-label"
            value={badgeFilter}
            onChange={(e) => setBadgeFilter(e.target.value as string)}
            label="Filter by Badge Type"
            input={
              <OutlinedInput
                label="Filter by Badge Type"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterList fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                }
              />
            }
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">All Badges</MenuItem>
            <MenuItem value="Promise Kept General">Promise Kept General</MenuItem>
            <MenuItem value="Slack Promise Kept">Slack Promise Kept</MenuItem>
            <MenuItem value="Attendance">Attendance</MenuItem>
            <MenuItem value="Teamwork">Teamwork</MenuItem>
            <MenuItem value="Punctuality">Punctuality</MenuItem>
            <MenuItem value="Leadership">Leadership</MenuItem>
            <MenuItem value="Innovation">Innovation</MenuItem>
            <MenuItem value="Mentorship">Mentorship</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Badges Grid */}
      <Grid container spacing={3}>
        {badges.map((badge) => (
          <Grid item xs={6} sm={4} md={3} key={badge.id}>
            <BadgeCard title={badge.title} count={badge.count} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default BadgesOverviewPanel;