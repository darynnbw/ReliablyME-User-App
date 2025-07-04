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
} from '@mui/material';
import {
  Person,
  CalendarToday,
  Search,
  ArrowUpward,
} from '@mui/icons-material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import CommitmentListItem from './CommitmentListItem';
import CommitmentDetailsModal from './CommitmentDetailsModal';
import RequestBadgeModal from './RequestBadgeModal';
import MyBadgeListItem from './MyBadgeListItem';

dayjs.extend(isBetween);

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
  const [allFilter, setAllFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('soonest');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [requestBadgeModalOpen, setRequestBadgeModalOpen] = useState(false);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

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
    
    if (allFilter === 'Today') {
      return itemDate ? itemDate.isSame(dayjs(), 'day') : false;
    }
    if (allFilter === 'This Week') {
      if (!itemDate) return false;
      const startOfWeek = dayjs().startOf('week');
      const endOfWeek = dayjs().endOf('week');
      return itemDate.isBetween(startOfWeek, endOfWeek, null, '[]');
    }
    if (allFilter === 'Custom Range' && dateRange[0] && dateRange[1] && itemDate) {
      if (dateRange[0]!.isAfter(dateRange[1]!)) return false;
      return !itemDate.isBefore(dateRange[0], 'day') && !itemDate.isAfter(dateRange[1], 'day');
    }

    return true;
  }).sort((a, b) => {
    const dateA = parseCommitmentDate(a.dueDate);
    const dateB = parseCommitmentDate(b.dueDate);
    if (!dateA || !dateB) return 0;
    return sortOrder === 'soonest' ? dateA.valueOf() - dateB.valueOf() : dateB.valueOf() - dateA.valueOf();
  });

  const handleViewDetails = () => {
    setModalOpen(true);
  };

  const handleRequestBadge = () => {
    setRequestBadgeModalOpen(true);
  };

  const handleToggleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    setCommitments(prev => prev.map(item => ({ ...item, selected: checked })));
  };

  const handleToggleSelectItem = (id: number, checked: boolean) => {
    setCommitments(prev => prev.map(item =>
      item.id === id ? { ...item, selected: checked } : item
    ));
    if (!checked) {
      setSelectAll(false);
    }
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
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#1976d2',
              fontSize: '1.25rem',
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="person-filter-label" sx={{ fontSize: '0.875rem' }}>Person</InputLabel>
              <Select
                labelId="person-filter-label"
                value={personFilter}
                onChange={(e) => setPersonFilter(e.target.value as string)}
                label="Person"
                startAdornment={<InputAdornment position="start" sx={{ mr: 0.5 }}><Person fontSize="small" sx={{ color: '#666' }} /></InputAdornment>}
                sx={{ borderRadius: 1, '& .MuiSelect-select': { py: '8.5px', pl: 1, pr: 2, fontSize: '0.875rem' } }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Alex Todd">Alex Todd</MenuItem>
                <MenuItem value="Riley Chen">Riley Chen</MenuItem>
                <MenuItem value="Jamie Smith">Jamie Smith</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 100 }}>
              <InputLabel id="all-filter-label" sx={{ fontSize: '0.875rem' }}>All</InputLabel>
              <Select
                labelId="all-filter-label"
                value={allFilter}
                onChange={(e) => setAllFilter(e.target.value as string)}
                label="All"
                startAdornment={<InputAdornment position="start" sx={{ mr: 0.5 }}><CalendarToday fontSize="small" sx={{ color: '#666' }} /></InputAdornment>}
                sx={{ borderRadius: 1, '& .MuiSelect-select': { py: '8.5px', pl: 1, pr: 2, fontSize: '0.875rem' } }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="This Week">This Week</MenuItem>
                <MenuItem value="Custom Range">Custom Range</MenuItem>
              </Select>
            </FormControl>

            {allFilter === 'Custom Range' && (
              <DateRangePicker
                localeText={{ start: 'From', end: 'To' }}
                value={dateRange}
                onChange={(newValue) => setDateRange(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: { minWidth: 240, '& .MuiInputBase-root': { borderRadius: 1, fontSize: '0.875rem' } }
                  }
                }}
              />
            )}

            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel id="sort-order-label" sx={{ fontSize: '0.875rem' }}>Due Date (Soonest)</InputLabel>
              <Select
                labelId="sort-order-label"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as string)}
                label="Due Date (Soonest)"
                startAdornment={<InputAdornment position="start" sx={{ mr: 0.5 }}><ArrowUpward fontSize="small" sx={{ color: '#666' }} /></InputAdornment>}
                sx={{ borderRadius: 1, '& .MuiSelect-select': { py: '8.5px', pl: 1, pr: 2, fontSize: '0.875rem' } }}
              >
                <MenuItem value="soonest">Due Date (Soonest)</MenuItem>
                <MenuItem value="latest">Due Date (Latest)</MenuItem>
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              size="small"
              placeholder="Search commitments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" sx={{ color: '#666' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 1, py: '2.5px', px: 1, fontSize: '0.875rem' }
              }}
              sx={{ minWidth: 200 }}
            />
          </Box>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={activeTab}
            onChange={(_: React.SyntheticEvent, newValue: number) => setActiveTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                color: '#666',
                '&.Mui-selected': {
                  color: '#1976d2',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#1976d2',
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={`${tab.label} (${tab.count})`} />
            ))}
          </Tabs>
        </Box>

        {!isUnkeptTab && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                size="small"
                sx={{ p: 0, mr: 1 }}
                checked={selectAll}
                onChange={handleToggleSelectAll}
                indeterminate={selectedCount > 0 && selectedCount < currentItems.length}
              />
              <Typography variant="body2" sx={{ color: '#666' }}>
                {selectedCount} {isBadgesTab ? 'badges' : 'commitments'} selected
              </Typography>
            </Box>
            {showBulkRequest && (
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.main',
                  fontWeight: 500,
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Bulk Request
              </Typography>
            )}
          </Box>
        )}

        <Box sx={{
          flex: isMyCommitments ? undefined : 1,
          height: isMyCommitments ? 336 : undefined, // Accommodates two taller cards + spacing + buffer
          minHeight: 0,
          overflowY: 'auto',
          pr: 1,
          scrollbarWidth: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0',
          },
        }}>
          <Stack spacing={1}>
            {currentItems.length > 0 ? (
              isBadgesTab ? (
                currentItems.map((item) => (
                  <MyBadgeListItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    approvalDate={item.dueDate}
                    commitment={item.description}
                    recipient={item.assignee}
                    selected={item.selected}
                    onToggleSelect={handleToggleSelectItem}
                    onViewDetails={() => handleViewDetails()}
                  />
                ))
              ) : (
                currentItems.map((item) => (
                  <CommitmentListItem
                    key={item.id}
                    {...item}
                    color={itemColor}
                    showCheckbox={!isUnkeptTab}
                    showRequestBadgeButton={!isUnkeptTab}
                    onViewDetails={() => handleViewDetails()}
                    onRequestBadge={() => handleRequestBadge()}
                    onToggleSelect={handleToggleSelectItem}
                  />
                ))
              )
            ) : (
              <Typography variant="body1" sx={{ color: '#666', textAlign: 'center', mt: 4 }}>
                No items found.
              </Typography>
            )}
          </Stack>
        </Box>
        
        {currentItems.length > 0 && isBadgesTab && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 2 }}>
            <Pagination count={10} page={1} color="primary" />
          </Box>
        )}
      </Paper>

      <CommitmentDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <RequestBadgeModal
        open={requestBadgeModalOpen}
        onClose={() => setRequestBadgeModalOpen(false)}
      />
    </>
  );
};

export default CommitmentsSection;