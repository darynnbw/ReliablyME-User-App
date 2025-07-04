import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
  Checkbox,
  Pagination,
  Stack,
  Popover,
  Button,
  styled,
  alpha,
  SelectChangeEvent,
} from '@mui/material';
import {
  Person,
  CalendarToday,
  Search,
  ArrowUpward,
} from '@mui/icons-material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import CommitmentListItem from './CommitmentListItem';
import CommitmentDetailsModal from './CommitmentDetailsModal';
import RequestBadgeModal from './RequestBadgeModal';
import MyBadgeListItem from './MyBadgeListItem';

dayjs.extend(isBetween);

// Custom styled component for rendering days in the calendar
interface CustomPickerDayProps extends PickersDayProps {
  isStartDate: boolean;
  isEndDate: boolean;
  isInRange: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'isStartDate' && prop !== 'isEndDate' && prop !== 'isInRange',
})<CustomPickerDayProps>(({ theme, isStartDate, isEndDate, isInRange, outsideCurrentMonth }) => {
  const isRangeBoundary = isStartDate || isEndDate;

  return {
    borderRadius: '50%',
    // In-between days are light blue circles
    ...(isInRange && !isRangeBoundary && !outsideCurrentMonth && {
      backgroundColor: alpha(theme.palette.primary.light, 0.3),
      color: theme.palette.primary.dark,
    }),
    // Start and end dates are darker blue circles
    ...(isRangeBoundary && !outsideCurrentMonth && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
      // Ensure selected state doesn't override our style
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    }),
  };
});


interface Commitment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  selected?: boolean;
}

interface CommitmentsSectionProps {
  title:string;
  tabs: { label: string; count: number; items: Commitment[] }[];
}

const parseCommitmentDate = (dateString: string): Dayjs | null => {
  try {
    const cleanDateString = dateString.replace('Due ', '');
    const fullDateString = `${cleanDateString} ${new Date().getFullYear()}`;
    const date = dayjs(fullDateString);
    return date.isValid() ? date : null;
  } catch (error) {
    return null;
  }
};

const CommitmentsSection: React.FC<CommitmentsSectionProps> = ({ title, tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [personFilter, setPersonFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('soonest');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [requestBadgeModalOpen, setRequestBadgeModalOpen] = useState(false);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [tempDateRange, setTempDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setCommitments(tabs[activeTab].items.map(item => ({ ...item, selected: false })));
    setSelectAll(false);
  }, [activeTab, tabs]);

  const currentItems = commitments.filter(item => {
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchTerm.toLowerCase());

    if (!searchMatch) return false;

    const itemDate = parseCommitmentDate(item.dueDate);
    let dateMatch = true;

    if (dateFilter === 'Custom Range' && dateRange[0] && dateRange[1] && itemDate) {
      dateMatch = !itemDate.isBefore(dateRange[0], 'day') && !itemDate.isAfter(dateRange[1], 'day');
    } else if (dateFilter === 'Today') {
      dateMatch = itemDate ? itemDate.isSame(dayjs(), 'day') : false;
    } else if (dateFilter === 'This Week') {
      dateMatch = itemDate ? itemDate.isBetween(dayjs().startOf('week'), dayjs().endOf('week'), null, '[]') : false;
    }
    
    return dateMatch;
  }).sort((a, b) => {
    const dateA = parseCommitmentDate(a.dueDate);
    const dateB = parseCommitmentDate(b.dueDate);
    if (!dateA || !dateB) return 0;
    return sortOrder === 'soonest' ? dateA.valueOf() - dateB.valueOf() : dateB.valueOf() - dateA.valueOf();
  });

  const handleViewDetails = () => setModalOpen(true);
  const handleRequestBadge = () => setRequestBadgeModalOpen(true);

  const handleToggleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    setCommitments(prev => prev.map(item => ({ ...item, selected: checked })));
  };

  const handleToggleSelectItem = (id: number, checked: boolean) => {
    setCommitments(prev => prev.map(item =>
      item.id === id ? { ...item, selected: checked } : item
    ));
    if (!checked) setSelectAll(false);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    if (!newValue) return;
    const [start] = tempDateRange;
    if (!start || (start && tempDateRange[1])) {
      setTempDateRange([newValue, null]);
    } else {
      if (newValue.isBefore(start)) {
        setTempDateRange([newValue, null]);
      } else {
        setTempDateRange([start, newValue]);
      }
    }
  };

  const CustomDay = (props: PickersDayProps) => {
    const { day } = props;
    const [start, end] = tempDateRange;

    const isStartDate = start?.isSame(day as Dayjs, 'day') ?? false;
    const isEndDate = end?.isSame(day as Dayjs, 'day') ?? false;
    const isInRange = start && end ? (day as Dayjs).isBetween(start, end, null, '()') : false;
  
    return (
      <CustomPickersDay
        {...props}
        isStartDate={isStartDate}
        isEndDate={isEndDate}
        isInRange={isInRange}
      />
    );
  };

  const handleClosePopover = () => setPopoverAnchor(null);
  
  const handleApplyDateRange = () => {
    setDateRange(tempDateRange);
    handleClosePopover();
  };

  const handleClearDateRange = () => {
    setTempDateRange([null, null]);
    setDateRange([null, null]);
    handleClosePopover();
  };

  const handleDateFilterChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setDateFilter(value);
    if (value !== 'Custom Range') {
      setDateRange([null, null]);
    }
  };

  const handleCustomRangeClick = (event: React.MouseEvent<HTMLElement>) => {
    setTempDateRange(dateRange);
    setPopoverAnchor(event.currentTarget);
  };

  const selectedCount = commitments.filter(item => item.selected).length;
  const isBadgesTab = tabs[activeTab].label.includes('Badges');
  const isUnkeptTab = tabs[activeTab].label.includes('Unkept');
  const itemColor = isUnkeptTab ? '#4F4F4F' : '#ff7043';
  const showBulkRequest = selectedCount > 0 && (tabs[activeTab].label === 'My Promises' || tabs[activeTab].label === 'Promises Owed to Me');
  const isMyCommitments = title === 'My Commitments';

  return (
    <>
      <Paper sx={{
        p: 3,
        height: 'auto',
        minHeight: isMyCommitments ? 'auto' : 500,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fafbfc',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e8eaed',
        mb: 4,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', fontSize: '1.25rem' }}>
            {title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Person</InputLabel>
              <Select value={personFilter} onChange={(e) => setPersonFilter(e.target.value as string)} label="Person" startAdornment={<InputAdornment position="start"><Person fontSize="small" /></InputAdornment>}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Alex Todd">Alex Todd</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Date</InputLabel>
              <Select
                value={dateFilter}
                onChange={handleDateFilterChange}
                label="Date"
                startAdornment={<InputAdornment position="start"><CalendarToday fontSize="small" /></InputAdornment>}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="This Week">This Week</MenuItem>
                <MenuItem value="Custom Range">Custom Range</MenuItem>
              </Select>
            </FormControl>

            {dateFilter === 'Custom Range' && (
              <TextField
                variant="outlined"
                size="small"
                value={
                  dateRange[0] && dateRange[1]
                    ? `${dateRange[0].format('MMM D')} - ${dateRange[1].format('MMM D, YYYY')}`
                    : 'Select Range'
                }
                onClick={handleCustomRangeClick}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ minWidth: 180, cursor: 'pointer' }}
              />
            )}

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
                slots={{ day: CustomDay }}
                sx={{ mb: -2 }}
              />
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: 1,
                px: 2,
                pb: 1.5,
                pt: 0,
              }}>
                <Button 
                  onClick={handleClearDateRange} 
                  variant="text" 
                  sx={{ 
                    py: 0.75, 
                    px: 2,
                    color: 'text.secondary' 
                  }}
                >
                  Clear
                </Button>
                <Button 
                  onClick={handleApplyDateRange} 
                  variant="contained" 
                  color="primary"
                  sx={{
                    py: 0.75,
                    px: 4,
                    fontWeight: 600,
                  }}
                >
                  Apply
                </Button>
              </Box>
            </Popover>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Due Date (Soonest)</InputLabel>
              <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as string)} label="Due Date (Soonest)" startAdornment={<InputAdornment position="start"><ArrowUpward fontSize="small" /></InputAdornment>}>
                <MenuItem value="soonest">Due Date (Soonest)</MenuItem>
                <MenuItem value="latest">Due Date (Latest)</MenuItem>
              </Select>
            </FormControl>

            <TextField variant="outlined" size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} />
          </Box>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={(_: React.SyntheticEvent, newValue: number) => setActiveTab(newValue)} sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 }, '& .Mui-selected': { color: 'primary.main' } }}>
            {tabs.map((tab, index) => <Tab key={index} label={`${tab.label} (${tab.count})`} />)}
          </Tabs>
        </Box>

        {!isUnkeptTab && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox size="small" sx={{ p: 0, mr: 1 }} checked={selectAll} onChange={handleToggleSelectAll} indeterminate={selectedCount > 0 && selectedCount < currentItems.length} />
              <Typography variant="body2" sx={{ color: '#666' }}>{selectedCount} {isBadgesTab ? 'badges' : 'commitments'} selected</Typography>
            </Box>
            {showBulkRequest && <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Bulk Request</Typography>}
          </Box>
        )}

        <Box sx={{ flex: isMyCommitments ? undefined : 1, height: isMyCommitments ? 336 : undefined, minHeight: 0, overflowY: 'auto', pr: 1 }}>
          <Stack spacing={1}>
            {currentItems.length > 0 ? (
              isBadgesTab ? (
                currentItems.map((item) => <MyBadgeListItem key={item.id} {...item} selected={item.selected} onToggleSelect={handleToggleSelectItem} onViewDetails={handleViewDetails} approvalDate={item.dueDate} commitment={item.description} recipient={item.assignee} />)
              ) : (
                currentItems.map((item) => <CommitmentListItem key={item.id} {...item} color={itemColor} showCheckbox={!isUnkeptTab} showRequestBadgeButton={!isUnkeptTab} onViewDetails={handleViewDetails} onRequestBadge={handleRequestBadge} onToggleSelect={handleToggleSelectItem} />)
              )
            ) : (
              <Typography variant="body1" sx={{ color: '#666', textAlign: 'center', mt: 4 }}>No items found.</Typography>
            )}
          </Stack>
        </Box>
        
        {currentItems.length > 0 && isBadgesTab && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 2 }}>
            <Pagination count={10} page={1} color="primary" />
          </Box>
        )}
      </Paper>

      <CommitmentDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <RequestBadgeModal open={requestBadgeModalOpen} onClose={() => setRequestBadgeModalOpen(false)} />
    </>
  );
};

export default CommitmentsSection;