import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import AnswerNudgeModal from './AnswerNudgeModal';
import NudgeDetailsModal from './NudgeDetailsModal';
import AcceptNudgeModal from './AcceptNudgeModal';
import RequestClarificationModal from './RequestClarificationModal';
import BulkClarifyModal from './BulkClarifyModal';
import ApprovalConfirmationModal from './ApprovalConfirmationModal';
import BadgeRequestDetailsModal from './BadgeRequestDetailsModal';
import ConfirmationModal from './ConfirmationModal';

dayjs.extend(isBetween);

interface Commitment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  selected?: boolean;
  committedDate?: string;
  type?: string;
  nudgesLeft?: number;
  totalNudges?: number;
  isExternal?: boolean;
  questions?: string[];
  explanation?: string;
}

interface CommitmentsSectionProps {
  title:string;
  tabs: { label: string; count: number; items: Commitment[] }[];
}

const parseCommitmentDate = (dateString: string): Dayjs | null => {
  try {
    if (dateString === 'Today') return dayjs().startOf('day');
    const cleanDateString = dateString.replace('Due ', '');
    // Attempt to parse different formats, like "MMM D, hh:mm A" or "MMM D, YYYY"
    const date = dayjs(cleanDateString, ['MMM D, hh:mm A', 'MMM D, YYYY', 'MMM D'], true);
    return date.isValid() ? date : null;
  } catch (error) {
    return null;
  }
};

const CommitmentsSection: React.FC<CommitmentsSectionProps> = ({ title, tabs }) => {
  console.log('CommitmentsSection title received:', `"${title}"`, 'Length:', title.length);
  console.log('Comparison result (title.trim() === "My Commitments"):', title.trim() === 'My Commitments');

  const [activeTab, setActiveTab] = useState(0);
  const [personFilter, setPersonFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('All');
  const [filterBy, setFilterBy] = useState('soonest');
  const [searchTerm, setSearchTerm] = useState('');
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [tempDateRange, setTempDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

  const [containerHeight, setContainerHeight] = useState<number | string>(360);
  const firstItemRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [commitmentForDetails, setCommitmentForDetails] = useState<Commitment | null>(null);
  const [commitmentToAccept, setCommitmentToAccept] = useState<Commitment | null>(null);
  const [commitmentToDecline, setCommitmentToDecline] = useState<Commitment | null>(null);
  const [commitmentToRevoke, setCommitmentToRevoke] = useState<Commitment | null>(null);
  const [commitmentToClarify, setCommitmentToClarify] = useState<Commitment | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<Commitment | null>(null);
  const [commitmentForNudgeDetails, setCommitmentForNudgeDetails] = useState<Commitment | null>(null);
  const [commitmentForAnswerNudge, setCommitmentForAnswerNudge] = useState<Commitment | null>(null);
  const [commitmentToReject, setCommitmentToReject] = useState<Commitment | null>(null);
  const [commitmentForBadgeRequest, setCommitmentForBadgeRequest] = useState<Commitment | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseDetailsModal = useCallback(() => setModalOpen(false), []);

  const [requestBadgeModalOpen, setRequestBadgeModalOpen] = useState(false);
  const handleCloseRequestBadgeModal = useCallback(() => setRequestBadgeModalOpen(false), []);

  const [bulkRequestModalOpen, setBulkRequestModalOpen] = useState(false);
  const handleCloseBulkRequestModal = useCallback(() => setBulkRequestModalOpen(false), []);

  const [badgeDetailsModalOpen, setBadgeDetailsModalOpen] = useState(false);
  const handleCloseBadgeDetailsModal = useCallback(() => setBadgeDetailsModalOpen(false), []);

  const [badgeRequestDetailsModalOpen, setBadgeRequestDetailsModalOpen] = useState(false);
  const handleCloseBadgeRequestDetailsModal = useCallback(() => setBadgeRequestDetailsModalOpen(false), []);

  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const handleCloseAcceptModal = useCallback(() => setAcceptModalOpen(false), []);

  const [acceptNudgeModalOpen, setAcceptNudgeModalOpen] = useState(false);
  const handleCloseAcceptNudgeModal = useCallback(() => setAcceptNudgeModalOpen(false), []);

  const [bulkDeclineModalOpen, setBulkDeclineModalOpen] = useState(false);
  const handleCloseBulkDeclineModal = useCallback(() => setBulkDeclineModalOpen(false), []);

  const [individualDeclineModalOpen, setIndividualDeclineModalOpen] = useState(false);
  const handleCloseIndividualDeclineModal = useCallback(() => setIndividualDeclineModalOpen(false), []);

  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const handleCloseRevokeModal = useCallback(() => setRevokeModalOpen(false), []);

  const [clarifyModalOpen, setClarifyModalOpen] = useState(false);
  const handleCloseClarifyModal = useCallback(() => setClarifyModalOpen(false), []);

  const [bulkAcceptModalOpen, setBulkAcceptModalOpen] = useState(false);
  const handleCloseBulkAcceptModal = useCallback(() => setBulkAcceptModalOpen(false), []);

  const [answerNudgeModalOpen, setAnswerNudgeModalOpen] = useState(false);
  const handleCloseAnswerNudgeModal = useCallback(() => setAnswerNudgeModalOpen(false), []);

  const [nudgeDetailsModalOpen, setNudgeDetailsModalOpen] = useState(false);
  const handleCloseNudgeDetailsModal = useCallback(() => setNudgeDetailsModalOpen(false), []);

  const [bulkClarifyModalOpen, setBulkClarifyModalOpen] = useState(false);
  const handleCloseBulkClarifyModal = useCallback(() => setBulkClarifyModalOpen(false), []);

  const [bulkRevokeModalOpen, setBulkRevokeModalOpen] = useState(false);
  const handleCloseBulkRevokeModal = useCallback(() => setBulkRevokeModalOpen(false), []);

  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [requesterForApproval, setRequesterForApproval] = useState('');
  const [rejectBadgeModalOpen, setRejectBadgeModalOpen] = useState(false);

  const [bulkApproveModalOpen, setBulkApproveModalOpen] = useState(false);
  const [bulkRejectModalOpen, setBulkRejectModalOpen] = useState(false);
  const [bulkApprovalSuccessOpen, setBulkApprovalSuccessOpen] = useState(false);

  const handleCloseApprovalModal = useCallback(() => {
    setApprovalModalOpen(false);
    setRequesterForApproval('');
  }, []);

  const handleCloseRejectBadgeModal = useCallback(() => {
    setRejectBadgeModalOpen(false);
    setCommitmentToReject(null);
  }, []);

  const handleApproveBadgeRequest = (item: Commitment) => {
    setRequesterForApproval(item.assignee);
    setCommitments(prev => prev.filter(c => c.id !== item.id));
    setApprovalModalOpen(true);
  };

  const handleRejectBadgeRequest = (item: Commitment) => {
    setCommitmentToReject(item);
    setRejectBadgeModalOpen(true);
  };

  const handleConfirmRejectBadge = () => {
    if (commitmentToReject) {
      console.log('Rejecting badge for:', commitmentToReject.id);
      setCommitments(prev => prev.filter(c => c.id !== commitmentToReject.id));
      handleCloseRejectBadgeModal();
    }
  };

  const isMyPromisesTab = tabs[activeTab].label === 'My Promises';
  const isRequestsToCommitTab = tabs[activeTab].label === 'Requests to Commit';
  const isAwaitingResponseTab = tabs[activeTab].label === 'Awaiting Response';
  const isOwedToMe = tabs[activeTab].label === 'Promises Owed to Me';
  const isBadgeRequestsTab = tabs[activeTab].label === 'Badge Requests';

  useEffect(() => {
    setCommitments(tabs[activeTab].items.map(item => ({ ...item, selected: false })));
    setSelectAll(false);
    setCurrentPage(1);
  }, [activeTab, tabs]);

  const uniquePeople = [...new Set(tabs.flatMap(tab => tab.items.filter(item => !item.isExternal).map(item => item.assignee)))];
  const hasExternal = tabs.some(tab => tab.items.some(item => item.isExternal));

  const currentItems = commitments.filter(item => {
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchTerm.toLowerCase());

    if (!searchMatch) return false;

    const personMatch = (() => {
      if (!personFilter) return true; // 'All' is selected
      if (personFilter === 'External') return item.isExternal === true;
      return item.assignee === personFilter;
    })();
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
    // The height calculation is based on showing 2 items.
    // This logic is now applied to both commitment sections.
    if (firstItemRef.current) {
      const cardHeight = firstItemRef.current.offsetHeight;
      const spacing = 8; // From <Stack spacing={1}>
      const calculatedHeight = (cardHeight * 2) + spacing;
      setContainerHeight(calculatedHeight);
    }
  }, [currentItems]);

  const handleViewCommitmentDetails = (item: Commitment) => {
    if (isBadgeRequestsTab) {
      setCommitmentForBadgeRequest(item);
      setBadgeRequestDetailsModalOpen(true);
    } else if (item.type === 'nudge' && (isMyPromisesTab || isRequestsToCommitTab)) {
      setCommitmentForNudgeDetails(item);
      setNudgeDetailsModalOpen(true);
    } else {
      setCommitmentForDetails(item);
      setModalOpen(true);
    }
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
    setCommitments(prev => prev.map(item => {
      const isNudgeInMyPromises = isMyPromisesTab && item.type === 'nudge';
      return { ...item, selected: isNudgeInMyPromises ? false : checked };
    }));
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
    if (item.type === 'nudge') {
      setAcceptNudgeModalOpen(true);
    } else {
      setAcceptModalOpen(true);
    }
  };

  const handleDeclineClick = (item: Commitment) => {
    setCommitmentToDecline(item);
    setIndividualDeclineModalOpen(true);
  };

  const handleConfirmIndividualDecline = () => {
    console.log('Declining commitment:', commitmentToDecline?.id);
    // In a real app, you would add the logic to actually decline the commitment here
    setIndividualDeclineModalOpen(false);
    setCommitmentToDecline(null);
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
    // The modal will close itself after the success animation.
    // We just need to clear the commitment state here.
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

  const handleAnswerNudge = (item: Commitment) => {
    setCommitmentForAnswerNudge(item);
    setAnswerNudgeModalOpen(true);
  };

  const handleAnswerNudgeFromDetails = () => {
    setNudgeDetailsModalOpen(false);
    if (commitmentForNudgeDetails) {
      handleAnswerNudge(commitmentForNudgeDetails);
    }
  };

  const handleAcceptNudgeFromDetails = () => {
    setNudgeDetailsModalOpen(false);
    if (commitmentForNudgeDetails) {
      handleAcceptClick(commitmentForNudgeDetails);
    }
  };

  const handleDeclineNudgeFromDetails = () => {
    setNudgeDetailsModalOpen(false);
    if (commitmentForNudgeDetails) {
      handleDeclineClick(commitmentForNudgeDetails);
    }
  };

  const handleRevokeClick = (item: Commitment) => {
    setCommitmentToRevoke(item);
    setRevokeModalOpen(true);
  };

  const handleConfirmRevoke = () => {
    console.log('Revoking commitment:', commitmentToRevoke?.id);
    setRevokeModalOpen(false);
    setCommitmentToRevoke(null);
  };

  const handleClarifyClick = (item: Commitment) => {
    setCommitmentToClarify(item);
    setClarifyModalOpen(true);
  };

  const handleSendClarification = (message: string) => {
    console.log(`Clarification request for ${commitmentToClarify?.id}: ${message}`);
    setClarifyModalOpen(false);
    setCommitmentToClarify(null);
  };

  const handleRevokeFromDetails = () => {
    setModalOpen(false);
    if (commitmentForDetails) {
      handleRevokeClick(commitmentForDetails);
    }
  };

  const handleClarifyFromDetails = () => {
    setModalOpen(false);
    if (commitmentForDetails) {
      handleClarifyClick(commitmentForDetails);
    }
  };

  const handleConfirmBulkRevoke = () => {
    console.log('Bulk revoking commitments:', selectedCommitments.map(c => c.id));
    setBulkRevokeModalOpen(false);
    setCommitments(prev => prev.map(item => ({ ...item, selected: false })));
    setSelectAll(false);
  };

  const handleConfirmBulkApprove = () => {
    const selectedIds = selectedCommitments.map(c => c.id);
    console.log('Bulk approving commitments:', selectedIds);
    setCommitments(prev => prev.filter(c => !selectedIds.includes(c.id)));
    setBulkApproveModalOpen(false);
    setBulkApprovalSuccessOpen(true);
    setSelectAll(false);
  };
  
  const handleConfirmBulkReject = () => {
    console.log('Bulk rejecting commitments:', selectedCommitments.map(c => c.id));
    const selectedIds = selectedCommitments.map(c => c.id);
    setCommitments(prev => prev.filter(c => !selectedIds.includes(c.id)));
    setBulkRejectModalOpen(false);
    setSelectAll(false);
  };

  const selectedCommitments = commitments.filter(item => item.selected);
  const selectedCount = selectedCommitments.length;
  const isMyBadgesTab = tabs[activeTab].label === 'My Badges';
  const isUnkeptTab = tabs[activeTab].label.includes('Unkept');

  let itemColor = '#ff7043'; // Default orange
  if (isOwedToMe || isBadgeRequestsTab || (isAwaitingResponseTab && title !== 'My Commitments')) {
    itemColor = '#1976d2'; // Blue
  } else if (isUnkeptTab) {
    itemColor = '#4F4F4F'; // Grey
  }

  const showBulkRequest = selectedCount > 0 && isMyPromisesTab;
  const showBulkClarify = selectedCount > 0 && isOwedToMe;
  const showBulkRevoke = selectedCount > 0 && isAwaitingResponseTab;

  const itemsPerPage = 15;
  const paginatedItems = isMyBadgesTab ? currentItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : currentItems;
  const totalPages = isMyBadgesTab ? Math.ceil(currentItems.length / itemsPerPage) : 0;

  return (
    <>
      <Paper sx={{
        p: 3,
        height: 'auto',
        minHeight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e8eaed',
        mb: 4,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: title.trim() === 'My Commitments' ? '#CC5500' : '#1976d2', fontSize: '1.25rem' }}>
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
                {hasExternal && <MenuItem value="External">External</MenuItem>}
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
                <MenuItem value="pastDue">Overdue</MenuItem>
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

        {!isUnkeptTab && !isMyBadgesTab && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Checkbox
                size="small"
                sx={{ p: 0 }}
                checked={selectAll}
                onChange={handleToggleSelectAll}
                indeterminate={selectedCount > 0 && selectedCount < currentItems.filter(i => !(isMyPromisesTab && i.type === 'nudge')).length}
              />
              <Typography variant="body2" sx={{ color: '#666' }}>{selectedCount} commitment{selectedCount !== 1 ? 's' : ''} selected</Typography>
              
              {showBulkRequest && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setBulkRequestModalOpen(true)}
                  sx={{
                    bgcolor: '#ff7043',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#f4511e' },
                  }}
                >
                  Bulk Request
                </Button>
              )}

              {showBulkClarify && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setBulkClarifyModalOpen(true)}
                  sx={{
                    bgcolor: '#1976d2',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 3,
                    '&:hover': { bgcolor: '#1565c0' },
                  }}
                >
                  Clarify
                </Button>
              )}

              {showBulkRevoke && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setBulkRevokeModalOpen(true)}
                  sx={{
                    bgcolor: '#F44336',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#d32f2f' },
                  }}
                >
                  Revoke
                </Button>
              )}

              {selectedCount > 0 && isRequestsToCommitTab && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Check />}
                    onClick={handleBulkAccept}
                    sx={{ 
                      bgcolor: '#4CAF50',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#388e3c' }
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
                      bgcolor: '#F44336',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#d32f2f' }
                    }}
                  >
                    Decline
                  </Button>
                </Box>
              )}

              {selectedCount > 0 && isBadgeRequestsTab && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Check />}
                    onClick={() => setBulkApproveModalOpen(true)}
                    sx={{ 
                      bgcolor: '#4CAF50',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#388e3c' }
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Close />}
                    onClick={() => setBulkRejectModalOpen(true)}
                    sx={{ 
                      bgcolor: '#F44336',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#d32f2f' }
                    }}
                  >
                    Reject
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        )}

        <Box sx={{ 
          height: containerHeight, 
          minHeight: 0, 
          overflowY: 'scroll', 
          pr: 1,
          display: 'flex', // Make this a flex container
          flexDirection: 'column', // Arrange children in a column
          justifyContent: paginatedItems.length === 0 ? 'center' : 'flex-start', // Center vertically only when empty
          alignItems: paginatedItems.length === 0 ? 'center' : 'stretch', // Center horizontally only when empty
        }}>
          {paginatedItems.length > 0 ? (
            <Stack spacing={1} sx={{ width: '100%' }}> {/* Ensure Stack takes full width */}
              {isMyBadgesTab ? (
                paginatedItems.map((item, index) => (
                  <CommitmentListItem
                    key={item.id}
                    {...item}
                    ref={index === 0 ? firstItemRef : null}
                    color="#4caf50"
                    showCheckbox={false}
                    isCheckboxDisabled={true}
                    showActionButton={false}
                    buttonText=""
                    onActionButtonClick={() => {}}
                    showBadgePlaceholder={true}
                    onViewDetails={() => handleViewBadgeDetails(item)}
                    onToggleSelect={() => {}}
                  />
                ))
              ) : (
                paginatedItems.map((item, index) => {
                  const isNudgeItem = item.type === 'nudge';
                  const showCheckboxes = !isUnkeptTab && !isMyBadgesTab;
                  const isCheckboxDisabled = isMyPromisesTab && isNudgeItem;
                  const itemDate = parseCommitmentDate(item.dueDate);
                  const isOverdue = itemDate ? itemDate.isBefore(dayjs(), 'day') : false;
                  const hideDueDate = isRequestsToCommitTab || isAwaitingResponseTab || isBadgeRequestsTab;
                  const showRevokeButton = isAwaitingResponseTab;
                  const showActionButton = !isUnkeptTab && !isMyBadgesTab && !isRequestsToCommitTab && !isAwaitingResponseTab && !isBadgeRequestsTab;
                  const showFromLabel = isRequestsToCommitTab || isOwedToMe || isAwaitingResponseTab || isBadgeRequestsTab;

                  return (
                    <CommitmentListItem
                      key={item.id}
                      {...item}
                      ref={index === 0 ? firstItemRef : null}
                      color={itemColor}
                      showCheckbox={showCheckboxes}
                      isCheckboxDisabled={isCheckboxDisabled}
                      showActionButton={showActionButton || (isNudgeItem && isMyPromisesTab)}
                      buttonText={isNudgeItem && isMyPromisesTab ? 'Answer Nudge' : (isOwedToMe ? 'Clarify' : 'Request Badge')}
                      onActionButtonClick={isNudgeItem && isMyPromisesTab ? () => handleAnswerNudge(item) : (isOwedToMe ? () => handleClarifyClick(item) : handleRequestBadge)}
                      onViewDetails={() => handleViewCommitmentDetails(item)}
                      onToggleSelect={handleToggleSelectItem}
                      showAcceptDeclineButtons={isRequestsToCommitTab || isBadgeRequestsTab}
                      onAccept={isBadgeRequestsTab ? () => handleApproveBadgeRequest(item) : () => handleAcceptClick(item)}
                      onDecline={isBadgeRequestsTab ? () => handleRejectBadgeRequest(item) : () => handleDeclineClick(item)}
                      acceptButtonText={isBadgeRequestsTab ? 'Approve' : undefined}
                      declineButtonText={isBadgeRequestsTab ? 'Reject' : undefined}
                      isBulkSelecting={selectedCount > 0}
                      hideDueDate={hideDueDate}
                      isNudge={isNudgeItem}
                      nudgesLeft={item.nudgesLeft}
                      isMyPromisesTab={isMyPromisesTab}
                      isExternal={item.isExternal}
                      isOverdue={isOverdue}
                      showRevokeButton={showRevokeButton}
                      onRevoke={() => handleRevokeClick(item)}
                      showFromLabel={showFromLabel}
                      explanation={item.explanation}
                    />
                  );
                })
              )
            ) : (
              <Box sx={{ 
                textAlign: 'center', 
                color: 'text.secondary', 
                maxWidth: '80%', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%', 
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Nothing here yet.</Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>We couldn’t find any commitments that match your filters. Try changing your filters, or create something new.</Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#ff7043',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '16px',
                    '&:hover': { bgcolor: '#f4511e' },
                  }}
                  onClick={() => console.log('Make a Promise button clicked from empty state')}
                >
                  Make a Promise
                </Button>
              </Box>
            )}
          </Stack>
        </Box>
        
        {currentItems.length > 0 && isMyBadgesTab && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 2 }}>
            <Pagination count={totalPages} page={currentPage} onChange={(_, page) => setCurrentPage(page)} color="primary" />
          </Box>
        )}
      </Paper>

      <CommitmentDetailsModal 
        open={modalOpen} 
        onClose={handleCloseDetailsModal} 
        commitment={commitmentForDetails}
        isRequest={isRequestsToCommitTab}
        onAcceptRequestClick={handleAcceptFromDetails}
        onDeclineRequestClick={handleDeclineFromDetails}
        onRequestBadgeClick={handleRequestBadgeFromDetails}
        isAwaitingResponse={isAwaitingResponseTab}
        isOwedToMe={isOwedToMe}
        onRevokeClick={handleRevokeFromDetails}
        onClarifyClick={handleClarifyFromDetails}
      />
      <NudgeDetailsModal
        open={nudgeDetailsModalOpen}
        onClose={handleCloseNudgeDetailsModal}
        commitment={commitmentForNudgeDetails}
        onAnswerNudgeClick={handleAnswerNudgeFromDetails}
        isRequest={isRequestsToCommitTab}
        onAcceptClick={handleAcceptNudgeFromDetails}
        onDeclineClick={handleDeclineNudgeFromDetails}
      />
      <BadgeRequestDetailsModal
        open={badgeRequestDetailsModalOpen}
        onClose={handleCloseBadgeRequestDetailsModal}
        commitment={commitmentForBadgeRequest}
        onApprove={() => {
          if (commitmentForBadgeRequest) handleApproveBadgeRequest(commitmentForBadgeRequest);
          handleCloseBadgeRequestDetailsModal();
        }}
        onReject={() => {
          if (commitmentForBadgeRequest) handleRejectBadgeRequest(commitmentForBadgeRequest);
          handleCloseBadgeRequestDetailsModal();
        }}
      />
      <RequestBadgeModal open={requestBadgeModalOpen} onClose={handleCloseRequestBadgeModal} />
      <BulkRequestBadgeModal
        open={bulkRequestModalOpen}
        onClose={handleCloseBulkRequestModal}
        commitments={selectedCommitments}
        isOwedToMe={isOwedToMe}
      />
      <MyBadgeDetailsModal
        open={badgeDetailsModalOpen}
        onClose={handleCloseBadgeDetailsModal}
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
        onClose={handleCloseAcceptModal}
        onCommit={handleCommit}
        commitmentDescription={commitmentToAccept?.description || ''}
      />
      <AcceptNudgeModal
        open={acceptNudgeModalOpen}
        onClose={handleCloseAcceptNudgeModal}
        onCommit={handleCommit}
        commitmentDescription={commitmentToAccept?.description || ''}
      />
      <DeclineModal
        open={bulkDeclineModalOpen}
        onClose={handleCloseBulkDeclineModal}
        title="Decline Invitations"
        description={
          <Typography variant="body1" sx={{ mb: 4 }}>
            Are you sure you want to decline {selectedCount} selected invitation{selectedCount > 1 ? 's' : ''}? This action cannot be undone.
          </Typography>
        }
        onDecline={handleConfirmBulkDecline}
      />
      <DeclineModal
        open={individualDeclineModalOpen}
        onClose={handleCloseIndividualDeclineModal}
        title="Decline Invitation"
        description={
          <Typography variant="body1" sx={{ mb: 4 }}>
            Are you sure you want to decline this invitation? This action cannot be undone.
          </Typography>
        }
        onDecline={handleConfirmIndividualDecline}
      />
      <DeclineModal
        open={revokeModalOpen}
        onClose={handleCloseRevokeModal}
        title="Revoke Request"
        description={
          <Typography variant="body1" sx={{ mb: 4 }}>
            Are you sure you want to revoke this commitment request? This action cannot be undone.
          </Typography>
        }
        onDecline={handleConfirmRevoke}
        declineText="Revoke"
      />
      <DeclineModal
        open={bulkRevokeModalOpen}
        onClose={handleCloseBulkRevokeModal}
        title="Bulk Revoke"
        description={
          <Typography variant="body1" sx={{ mb: 4 }}>
            Are you sure you want to revoke {selectedCount} selected request{selectedCount > 1 ? 's' : ''}? This action cannot be undone.
          </Typography>
        }
        onDecline={handleConfirmBulkRevoke}
        declineText="Revoke"
      />
      <RequestClarificationModal
        open={clarifyModalOpen}
        onClose={handleCloseClarifyModal}
        notification={commitmentToClarify}
        onSend={handleSendClarification}
      />
      <BulkClarifyModal
        open={bulkClarifyModalOpen}
        onClose={handleCloseBulkClarifyModal}
        commitments={selectedCommitments}
      />
      <BulkAcceptModal
        open={bulkAcceptModalOpen}
        onClose={handleCloseBulkAcceptModal}
        commitments={selectedCommitments}
      />
      <AnswerNudgeModal
        open={answerNudgeModalOpen}
        onClose={handleCloseAnswerNudgeModal}
        commitment={commitmentForAnswerNudge}
      />
      <ApprovalConfirmationModal
        open={approvalModalOpen}
        onClose={handleCloseApprovalModal}
        requesterName={requesterForApproval}
      />
      <ApprovalConfirmationModal
        open={bulkApprovalSuccessOpen}
        onClose={() => setBulkApprovalSuccessOpen(false)}
        count={selectedCount}
      />
      <DeclineModal
        open={rejectBadgeModalOpen}
        onClose={handleCloseRejectBadgeModal}
        title="Reject Badge Request"
        description={
          <Typography variant="body1" sx={{ mb: 4 }}>
            Are you sure you want to reject this badge request? The sender will be notified.
          </Typography>
        }
        onDecline={handleConfirmRejectBadge}
      />
      <ConfirmationModal
        open={bulkApproveModalOpen}
        onClose={() => setBulkApproveModalOpen(false)}
        title="Bulk Approve Requests"
        description={
          <Typography variant="body1" sx={{ mb: 4, color: '#333', fontSize: '16px', lineHeight: 1.6 }}>
            Are you sure you want to approve {selectedCount} selected badge request{selectedCount > 1 ? 's' : ''}?
          </Typography>
        }
        onConfirm={handleConfirmBulkApprove}
        confirmText="Approve"
        confirmColor="success"
      />
      <ConfirmationModal
        open={bulkRejectModalOpen}
        onClose={() => setBulkRejectModalOpen(false)}
        title="Bulk Reject Requests"
        description={
          <Typography variant="body1" sx={{ mb: 4, color: '#333', fontSize: '16px', lineHeight: 1.6 }}>
            Are you sure you want to reject {selectedCount} selected badge request{selectedCount > 1 ? 's' : ''}?
          </Typography>
        }
        onConfirm={handleConfirmBulkReject}
        confirmText="Reject"
        confirmColor="error"
      />
    </>
  );
};

export default CommitmentsSection;