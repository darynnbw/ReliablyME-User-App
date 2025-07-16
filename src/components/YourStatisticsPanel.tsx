import React, { useState, useEffect } from 'react';
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
type GroupByOption = 'day' | 'week' | 'month';

const generateMockData = (min: number, max: number, groupBy: GroupByOption) => {
  const data = [];
  let labels: string[] = [];
  let count = 0;

  switch (groupBy) {
    case 'day':
      count = 7;
      labels = Array.from({ length: count }, (_, i) => `Day ${i + 1}`);
      break;
    case 'week':
      count = 4;
      labels = Array.from({ length: count }, (_, i) => `Week ${i + 1}`);
      break;
    case 'month':
    default:
      count = 6;
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      break;
  }

  for (let i = 0; i < count; i++) {
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
    color: '#607d8b',
    min: 15,
    max: 30,
  },
  points: {
    title: 'Total Points',
    displayValue: '1234',
    color: '#4caf50',
    min: 800,
    max: 1500,
  },
  reliability: {
    title: 'Reliability Record (%)',
    displayValue: '88.9%',
    color: '#1976d2',
    min: 80,
    max: 99,
  },
  punctuality: {
    title: 'Punctuality Record (%)',
    displayValue: '94.4%',
    color: '#ff7043',
    min: 85,
    max: 98,
  },
  confidence: {
    title: 'Confidence Score',
    displayValue: '7.9',
    color: '#f44336',
    min: 6,
    max: 9,
  },
};

const YourStatisticsPanel: React.FC = () => {
  const [selectedStat, setSelectedStat] = useState<StatKey>('commitments');
  const [groupBy, setGroupBy] = useState<GroupByOption>('week');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [tempDateRange, setTempDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const diffInDays = dateRange[1].diff(dateRange[0], 'day');
      if (diffInDays <= 31) {
        setGroupBy('day');
      } else if (diffInDays <= 90) {
        setGroupBy('week');
      } else {
        setGroupBy('month');
      }
    } else {
      // Default when no range is selected
      setGroupBy('week');
    }
  }, [dateRange]);

  useEffect(() => {
    const currentStatInfo = statsData[selectedStat];
    const newData = generateMockData(currentStatInfo.min, currentStatInfo.max, groupBy);
    setChartData(newData);
  }, [selectedStat, groupBy, dateRange]);

  const handleStatClick = (stat: StatKey) => {
    setSelectedStat(prev => (prev === stat ? 'commitments' : stat));
  };

  const handleGroupByChange = (event: SelectChangeEvent) => {
    setGroupBy(event.target.value as GroupByOption);
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
          <InputLabel>Group By</InputLabel>
          <Select value={groupBy} label="Group By" onChange={handleGroupByChange}>
            <MenuItem value="day">Day</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="month">Month</MenuItem>
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
          data={chartData}
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