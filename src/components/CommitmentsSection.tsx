import React, { useState, useEffect, useRef } from 'react';
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
  alpha,
  SelectChangeEvent,
  SxProps,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import {
  Person,
  CalendarToday,
  Search,
  ArrowUpward,
  Check,
  Close,
} from '@mui/icons-material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import CommitmentListItem from './CommitmentListItem';
import CommitmentDetailsModal from './CommitmentDetailsModal';
import RequestBadgeModal from './RequestBadgeModal';
import BulkRequestBadgeModal from './BulkRequestBadgeModal';
import MyBadgeDetailsModal from './MyBadgeDetailsModal';
import AcceptRequestModal from './AcceptRequestModal';
import DeclineModal from './DeclineModal';
import BulkAcceptModal from './BulkAcceptModal';

dayjs.extend(isBetween);

interface Commitment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  selected?: boolean;
  committedDate?: string;
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
  const [filterBy, setFilterBy] = useState('soonest');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [requestBadgeModalOpen, setRequestBadgeModalOpen] = useState(false);
  const [bulkRequestModalOpen, setBulkRequestModalOpen] = useState(false);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [tempDateRange, setTempDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

  const [containerHeight, setContainerHeight] = useState<number | string>(360);
  const firstItemRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [badgeDetailsModalOpen, setBadgeDetailsModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Commitment | null>(null);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [commitmentToAccept, setCommitmentToAccept] = useState<Commitment | null>(null);
  const [commitmentForDetails, setCommitmentForDetails] = useState<Commitment | null>(null);
  const [bulkDeclineModalOpen, setBulkDeclineModalOpen] = useState(false);
  const [bulkAcceptModalOpen, setBulkAcceptModalOpen] = useState(false);

  useEffect(() => {
    setCommitments(tabs[activeTab].items.map(item => ({ ...item, selected: false })));
    setSelectAll(false);
    setCurrentPage(1);
  }, [activeTab, tabs]);

  const handleClarifyClick = () => {
    // Placeholder for future functionality
    console.log('Clarify button clicked');
  };

  const uniquePeople = [...new Set(tabs.flatMap(tab => tab.items.map(item => item.assignee)))];

  const currentItems = commitments.filter(item => {
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchTerm.toLowerCase());

    if (!searchMatch) return false;

    const personMatch = !personFilter || item.assignee === personFilter;
    if (!personMatch) return false;

    const itemDate = parseCommitmentDate(item.dueDate);
    let dateMatch = true;

    if (dateFilter === 'Custom Range' && dateRange[0] && dateRange[1] && itemDate) {
      dateMatch = !itemDate.isBefore(dateRange[0], 'day') && !itemDate.isAfter(dateRange[1], 'day');
    } else if (dateFilter === 'Today') {
      dateMatch = itemDate ? itemDate.isSame(dayjs(), 'day') : false;
    } else if (dateFilter === 'This Week') {
      dateMatch = itemDate ? itemDate.isBetween(dayjs().startOf('week'), dayjs().endOf('week'), null, '[]') : false;
    }
    
    if (!dateMatch) return false;

    if (filterBy === 'pastDue') {
      if (!itemDate) return false;
      return itemDate.isBefore(dayjs(), 'day');
    }

    return true;
  }).sort((a, b) => {
    const dateA = parseCommitmentDate(a.dueDate);
    const dateB = parseCommitmentDate(b.dueDate);
    if (!dateA || !dateB) return 0;

    if (filterBy === 'latest') {
      return dateB.valueOf() - dateA.valueOf();
    }
    // Default sort is 'soonest', which also works well for 'pastDue' items (oldest first)
    return dateA.valueOf() - dateB.valueOf();
  });

  useEffect(() => {
    if (title === 'My Commitments' && firstItemRef.current) {
      const cardHeight = firstItemRef.current.offsetHeight;
      const spacing = 8; // From <Stack spacing={1}>
      const calculatedHeight = (cardHeight * 2) + spacing;
      setContainerHeight(calculatedHeight);
    }
  }, [currentItems, title]);

  const handleViewCommitmentDetails = (item: Commitment) => {
    setCommitmentForDetails(item);
    setModalOpen(true);
  };

  const handleRequestBadge = () => setRequestBadgeModalOpen(true);
  
  const handleRequestBadgeFromDetails = () => {
    setModalOpen(false);
    setRequestBadgeModalOpen(true);
  };

  const handleViewBadgeDetails = (badge: Commitment) => {
    setSelectedBadge(badge);
    setBadgeDetailsModalOpen(true);
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
    if (!checked) setSelectAll(false);
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

  const handleAcceptClick = (item: Commitment) => {
    setCommitmentToAccept(item);
    setAcceptModalOpen(true);
  };

  const handleDeclineClick = (item: Commitment) => {
    console.log('Decline clicked for:', item.id);
  };

  const handleAcceptFromDetails = () => {
    setModalOpen(false);
    if (commitmentForDetails) {
      handleAcceptClick(commitmentForDetails);
    }
  };

  const handleDeclineFromDetails = () => {
    setModalOpen(false);
    if (commitmentForDetails) {
      handleDeclineClick(commitmentForDetails);
    }
  };

  const handleCommit = (date: Dayjs | null, time: Dayjs | null) => {
    console.log('Committed with date:', date?.format(), 'and time:', time?.format(), 'for commitment:', commitmentToAccept?.id);
    setAcceptModalOpen(false);
    setCommitmentToAccept(null);
  };

  const handleConfirmBulkDecline = () => {
    console.log('Bulk declining commitments:', selectedCommitments.map(c => c.id));
    // Here you would add the logic to actually decline them
    setBulkDeclineModalOpen(false);
    // Unselect all after action
    setCommitments(prev => prev.map(item => ({ ...item, selected: false })));
    setSelectAll(false);
  };

  const handleBulkAccept = () => {
    setBulkAcceptModalOpen(true);
  };

  const selectedCommitments = commitments.filter(item => item.selected);
  const selectedCount = selectedCommitments.length;
  const isBadgesTab = tabs[activeTab].label.includes('Badges');
  const isUnkeptTab = tabs[activeTab].label.includes('Unkept');
  const isOwedToMe = tabs[activeTab].label === 'Promises Owed to Me';
  const isMyCommitments = title === 'My Commitments';
  const isRequestsToCommitTab = tabs[activeTab].label === 'Requests to Commit';

  let itemColor = '#ff7043'; // Default for 'My Promises'
  let buttonText = 'Request Badge';
  let onButtonClick: () => void = handleRequestBadge;

  if (isOwedToMe) {
    itemColor = '#1976d2'; // Blue for 'Promises Owed to Me'
    buttonText = 'Clarify';
    onButtonClick = handleClarifyClick;
  } else if (isUnkeptTab) {
    itemColor = '#4F4F4F'; // Grey for unkept promises
  } else if (isRequestsToCommitTab) {
    itemColor = '#ff7043'; // Orange for requests to match 'My Promises'
  }

  const showActionButton = !isUnkeptTab && !isBadgesTab && !isRequestsToCommitTab;
  const showBulkRequest = selectedCount > 0 && (tabs[activeTab].label === 'My Promises' || tabs[activeTab].label === 'Promises Owed to Me');

  const itemsPerPage = 15;
  const paginatedItems = isBadgesTab ? currentItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : currentItems;
  const totalPages = isBadgesTab ? Math.ceil(currentItems.length / itemsPerPage) : 0;

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
                {uniquePeople.map(person => (
                  <MenuItem key={person} value={person}>{person}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Due Date</InputLabel>
              <Select
                value={dateFilter}
                onChange={handleDateFilterChange}
                label="Due Date"
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
                    px: 6,
                    fontWeight: 600,
                  }}
                >
                  Apply
                </Button>
              </Box>
            </Popover>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Filter By</InputLabel>
              <Select value={filterBy} onChange={(e) => setFilterBy(e.target.value as string)} label="Filter By" startAdornment={<InputAdornment position="start"><ArrowUpward fontSize="small" /></InputAdornment>}>
                <MenuItem value="soonest">Due Date (Soonest)</MenuItem>
                <MenuItem value="latest">Due Date (Latest)</MenuItem>
                <MenuItem value="pastDue">Past Due</MenuItem>
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

        {!isUnkeptTab && !isBadgesTab && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Checkbox size="small" sx={{ p: 0 }} checked={selectAll} onChange={handleToggleSelectAll} indeterminate={selectedCount > 0 && selectedCount < currentItems.length} />
              <Typography variant="body2" sx={{ color: '#666' }}>{selectedCount} commitment{selectedCount !== 1 ? 's' : ''} selected</Typography>
              {selectedCount > 0 && isRequestsToCommitTab && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Check />}
                    onClick={handleBulkAccept}
                    sx={{ 
                      bgcolor: '#E7F5E8',
                      color: '#4CAF50',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#d4edda' }
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Close />}
                    onClick={() => setBulkDeclineModalOpen(true)}
                    sx={{ 
                      bgcolor: '#FCE8E8',
                      color: '#F44336',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#f8d7da' }
                    }}
                  >
                    Decline
                  </Button>
                </Box>
              )}
            </Box>
            {showBulkRequest && (
              <Button
                variant="text"
                onClick={() => setBulkRequestModalOpen(true)}
                sx={{
                  color: 'primary.main',
                  fontWeight: 500,
                  textTransform: 'none',
                  p: 0,
                  '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' },
                }}
              >
                Bulk Request
              </Button>
            )}
          </Box>
        )}

        <Box sx={{ 
          flex: isMyCommitments ? undefined : 1, 
          height: isMyCommitments ? containerHeight : undefined, 
          minHeight: 0, 
          overflowY: 'scroll', 
          pr: 1 
        }}>
          <Stack spacing={1}>
            {paginatedItems.length > 0 ? (
              isBadgesTab ? (
                paginatedItems.map((item, index) => (
                  <CommitmentListItem
                    key={item.id}
                    {...item}
                    ref={index === 0 ? firstItemRef : null}
                    color="#4caf50"
                    showCheckbox={false}
                    showActionButton={false}
                    buttonText=""
                    onActionButtonClick={() => {}}
                    showBadgePlaceholder={true}
                    onViewDetails={() => handleViewBadgeDetails(item)}
                    onToggleSelect={() => {}}
                  />
                ))
              ) : (
                paginatedItems.map((item, index) => (
                  <CommitmentListItem
                    key={item.id}
                    {...item}
                    ref={index === 0 ? firstItemRef : null}
                    color={itemColor}
                    showCheckbox={!isUnkeptTab}
                    showActionButton={showActionButton}
                    buttonText={buttonText}
                    onViewDetails={() => handleViewCommitmentDetails(item)}
                    onActionButtonClick={onButtonClick}
                    onToggleSelect={handleToggleSelectItem}
                    showAcceptDeclineButtons={isRequestsToCommitTab}
                    onAccept={() => handleAcceptClick(item)}
                    onDecline={() => handleDeclineClick(item)}
                    isBulkSelecting={selectedCount > 0}
                    hideDueDate={isRequestsToCommitTab}
                  />
                ))
              )
            ) : (
              <Typography variant="body1" sx={{ color: '#666', textAlign: 'center', mt: 4 }}>No items found.</Typography>
            )}
          </Stack>
        </Box>
        
        {currentItems.length > 0 && isBadgesTab && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 2 }}>
            <Pagination count={totalPages} page={currentPage} onChange={(_, page) => setCurrentPage(page)} color="primary" />
          </Box>
        )}
      </Paper>

      <CommitmentDetailsModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        commitment={commitmentForDetails}
        isRequest={isRequestsToCommitTab}
        onAcceptRequestClick={handleAcceptFromDetails}
        onDeclineRequestClick={handleDeclineFromDetails}
        onRequestBadgeClick={handleRequestBadgeFromDetails} 
      />
      <RequestBadgeModal open={requestBadgeModalOpen} onClose={() => setRequestBadgeModalOpen(false)} />
      <BulkRequestBadgeModal
        open={bulkRequestModalOpen}
        onClose={() => setBulkRequestModalOpen(false)}
        commitments={selectedCommitments}
        isOwedToMe={isOwedToMe}
      />
      <MyBadgeDetailsModal
        open={badgeDetailsModalOpen}
        onClose={() => setBadgeDetailsModalOpen(false)}
        badge={selectedBadge ? {
          title: selectedBadge.title,
          approvalDate: selectedBadge.dueDate,
          commitment: selectedBadge.description,
          recipient: selectedBadge.assignee,
          committedDate: selectedBadge.committedDate,
        } : null}
      />
      <AcceptRequestModal
        open={acceptModalOpen}
        onClose={() => setAcceptModalOpen(false)}
        onCommit={handleCommit}
        commitmentDescription={commitmentToAccept?.description || ''}
      />
      <DeclineModal
        open={bulkDeclineModalOpen}
        onClose={() => setBulkDeclineModalOpen(false)}
        title="Decline Invitations"
        description={
          <Typography variant="body1" sx={{ mb: 4 }}>
            Are you sure you want to decline {selectedCount} selected invitation{selectedCount > 1 ? 's' : ''}? This action cannot be undone.
          </Typography>
        }
        onDecline={handleConfirmBulkDecline}
      />
      <BulkAcceptModal
        open={bulkAcceptModalOpen}
        onClose={() => setBulkAcceptModalOpen(false)}
        commitments={selectedCommitments}
      />
    </>
  );
};

export default CommitmentsSection;