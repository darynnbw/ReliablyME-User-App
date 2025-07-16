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
  SelectChangeEvent,
  TextField,
  Popover,
  Button,
  alpha,
  SxProps,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import StatCard from './StatCard';
import StatisticsChart from './StatisticsChart';

type StatKey = 'commitments' | 'points' | 'punctuality' | 'confidence';

const statsData = {
  commitments: {
    value: 24,
    label: '24',
    chartValue: 70, // arbitrary for visual effect
    legend: 'Number of commitments made',
  },
  points: {
    value: 1234,
    label: '1234',
    chartValue: 85,
    legend: 'Total points earned',
  },
  punctuality: {
    value: '94.4%',
    label: '94.4%',
    chartValue: 94.4,
    legend: 'Punctuality rate',
  },
  confidence: {
    value: 7.9,
    label: '7.9',
    chartValue: 79,
    legend: 'Average confidence score',
  },
};

const YourStatisticsPanel: React.FC = () => {
  const [selectedStat, setSelectedStat] = useState<StatKey>('commitments');
  const [daysFilter, setDaysFilter] = useState('90');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [tempDateRange, setTempDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

  const handleStatClick = (stat: StatKey) => {
    setSelectedStat(prev => (prev === stat ? 'commitments' : stat));
  };

  const handleDaysFilterChange = (event: SelectChangeEvent) => {
    setDaysFilter(event.target.value as string);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    if (!newValue) return;
    const [start] = tempDateRange;
    if (!start || (start && tempDateRange[1])) {
      setTempDateRange([newValue, null]);
    } else {
      if (newValue.isBefore(start)) {
        setTempDateRange([newValue, start]);
      } else {
        setTempDateRange([start, newValue]);
      }
    }
  };

  const handleCustomRangeClick = (event: React.MouseEvent<HTMLElement>) => {
    setTempDateRange(dateRange);
    setPopoverAnchor(event.currentTarget);
  };

  const handleClosePopover = () => setPopoverAnchor(null);

  const handleApplyDateRange = () => {
    setDateRange(tempDateRange);
    handleClosePopover();
  };

  const currentStat = statsData[selectedStat];

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
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: 'primary.main',
          fontSize: '1.25rem',
          mb: 2,
        }}
      >
        Your Statistics
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          label="Date Range"
          value={
            dateRange[0] && dateRange[1]
              ? `${dateRange[0].format('MMM D')} - ${dateRange[1].format('MMM D, YYYY')}`
              : 'All Time'
          }
          onClick={handleCustomRangeClick}
          InputProps={{ readOnly: true }}
          sx={{ flex: 1, cursor: 'pointer' }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>By</InputLabel>
          <Select value={daysFilter} label="By" onChange={handleDaysFilterChange}>
            <MenuItem value="30">Last 30 days</MenuItem>
            <MenuItem value="60">Last 60 days</MenuItem>
            <MenuItem value="90">Last 90 days</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Popover
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <DateCalendar
          value={tempDateRange[0]}
          onChange={handleDateChange}
          slotProps={{
            day: (ownerState) => {
              const { day, outsideCurrentMonth } = ownerState as any;
              const [start, end] = tempDateRange;
              const isStartDate = start?.isSame(day as Dayjs, 'day') ?? false;
              const isEndDate = end?.isSame(day as Dayjs, 'day') ?? false;
              const isInRange = start && end ? (day as Dayjs).isBetween(start, end, null, '()') : false;
              const isRangeBoundary = isStartDate || isEndDate;
              const sx: SxProps<Theme> = {
                borderRadius: '50%',
                ...(isRangeBoundary && !outsideCurrentMonth && {
                  backgroundColor: 'primary.main',
                  color: 'common.white',
                  '&:hover, &:focus, &.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'common.white',
                  },
                }),
                ...(isInRange && !outsideCurrentMonth && {
                  backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.3),
                  color: 'primary.dark',
                  borderRadius: '50%',
                }),
              };
              return { sx } as any;
            },
          }}
          sx={{ mb: -2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, p: 2, pt: 0 }}>
          <Button onClick={handleClosePopover}>Cancel</Button>
          <Button onClick={handleApplyDateRange} variant="contained">Apply</Button>
        </Box>
      </Popover>

      {/* Chart */}
      <StatisticsChart
        value={currentStat.chartValue}
        label={currentStat.label}
        legend={currentStat.legend}
      />

      {/* Stat Cards */}
      <Grid container spacing={2} sx={{ mt: 'auto', pt: 2 }}>
        <Grid item xs={6}>
          <StatCard
            label="Total Points"
            value={statsData.points.value}
            isSelected={selectedStat === 'points'}
            onClick={() => handleStatClick('points')}
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard
            label="Punctuality"
            value={statsData.punctuality.value}
            isSelected={selectedStat === 'punctuality'}
            onClick={() => handleStatClick('punctuality')}
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard
            label="Confidence Score"
            value={statsData.confidence.value}
            isSelected={selectedStat === 'confidence'}
            onClick={() => handleStatClick('confidence')}
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard
            label="Commitments Made"
            value={statsData.commitments.value}
            isSelected={selectedStat === 'commitments'}
            onClick={() => handleStatClick('commitments')}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default YourStatisticsPanel;