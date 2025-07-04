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
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  InputAdornment,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import BadgeCard from './BadgeCard';

const BadgesOverviewPanel: React.FC = () => {
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);

  const badges = [
    { id: 1, title: 'Promise Kept General', count: 9 },
    { id: 2, title: 'Attendance', count: 56 },
    { id: 3, title: 'Teamwork', count: 45 },
    { id: 4, title: 'Slack Promise Kept General', count: 124 },
    { id: 5, title: 'On Track. Mid-Week Progress.', count: 18 },
    { id: 6, title: 'On Track (Daily)', count: 23 },
    { id: 7, title: 'Leadership', count: 12 },
  ];

  const handleFilterChange = (event: SelectChangeEvent<typeof selectedBadges>) => {
    const {
      target: { value },
    } = event;
    setSelectedBadges(typeof value === 'string' ? value.split(',') : value);
  };

  const filteredBadges = selectedBadges.length === 0
    ? badges
    : badges.filter(badge => selectedBadges.includes(badge.title));

  // Calculate the total count based on the *filtered* badges.
  const totalBadgeCount = filteredBadges.reduce((sum, badge) => sum + badge.count, 0);

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
          Badges Overview ({totalBadgeCount})
        </Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 240, flexShrink: 0 }}>
          <InputLabel id="badge-filter-label">Badge Type</InputLabel>
          <Select
            labelId="badge-filter-label"
            multiple
            value={selectedBadges}
            onChange={handleFilterChange}
            input={
              <OutlinedInput 
                label="Badge Type" 
                startAdornment={
                  <InputAdornment position="start">
                    <FilterList />
                  </InputAdornment>
                }
              />
            }
            renderValue={(selected) => (selected as string[]).join(', ')}
            sx={{ borderRadius: 2 }}
          >
            {badges.map((badge) => (
              <MenuItem key={badge.id} value={badge.title}>
                <Checkbox checked={selectedBadges.indexOf(badge.title) > -1} />
                <ListItemText primary={badge.title} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Badges Grid */}
      <Grid container spacing={3}>
        {filteredBadges.map((badge) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={badge.id}>
            <BadgeCard title={badge.title} count={badge.count} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default BadgesOverviewPanel;