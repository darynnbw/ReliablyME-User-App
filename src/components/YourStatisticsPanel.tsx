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
import { Dayjs } from 'dayjs';
import StatCard from './StatCard';
import LineGraph from './LineGraph';

type StatKey = 'commitments' | 'points' | 'reliability' | 'punctuality' | 'confidence';

const generateMockData = (min: number, max: number) => {
  const data = [];
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  for (let i = 0; i < labels.length; i++) {
    data.push({
      name: labels[i],
      value: Math.floor(Math.random() * (max - min + 1)) + min,
    });
  }
  return data;
};

const statsData = {
  commitments: {
    title: 'Number of Commitments Made',
    displayValue: '24',
    color: '#607d8b', // A neutral color for the default state
    data: generateMockData(15, 30),
  },
  points: {
    title: 'Total Points',
    displayValue: '1234',
    color: '#4caf50',
    data: generateMockData(800, 1500),
  },
  reliability: {
    title: 'Reliability Record (%)',
    displayValue: '88.9%',
    color: '#1976d2',
    data: generateMockData(80, 99),
  },
  punctuality: {
    title: 'Punctuality Record (%)',
    displayValue: '94.4%',
    color: '#ff7043',
    data: generateMockData(85, 98),
  },
  confidence: {
    title: 'Confidence Score',
    displayValue: '7.9',
    color: '#f44336',
    data: generateMockData(6, 9),
  },
};

const YourStatisticsPanel: React.FC = () => {
  const [selectedStat, setSelectedStat] = useState<StatKey>('commitments');
  const [daysFilter, setDaysFilter] = useState('90');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [tempDateRange, setTempDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

  const handleStatClick = (stat: StatKey) => {
    // If clicking the active stat, revert to default, otherwise set to new stat
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
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
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
            <MenuItem value="7">1 week</MenuItem>
            <MenuItem value="14">2 weeks</MenuItem>
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
      <Box sx={{ flex: 1, minHeight: 250, mb: 2 }}>
        <LineGraph
          title={currentStat.title}
          data={currentStat.data}
          color={currentStat.color}
        />
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StatCard
            label="Total Points"
            value={statsData.points.displayValue}
            isSelected={selectedStat === 'points'}
            onClick={() => handleStatClick('points')}
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard
            label="Reliability Record (%)"
            value={statsData.reliability.displayValue}
            isSelected={selectedStat === 'reliability'}
            onClick={() => handleStatClick('reliability')}
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard
            label="Punctuality Record (%)"
            value={statsData.punctuality.displayValue}
            isSelected={selectedStat === 'punctuality'}
            onClick={() => handleStatClick('punctuality')}
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard
            label="Confidence Score"
            value={statsData.confidence.displayValue}
            isSelected={selectedStat === 'confidence'}
            onClick={() => handleStatClick('confidence')}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default YourStatisticsPanel;