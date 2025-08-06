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
  Stack,
  Popover,
  Button,
  alpha,
  SelectChangeEvent,
  SxProps,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Person, CalendarToday, Search, ArrowUpward } from '@mui/icons-material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Dayjs } from 'dayjs';
import CommitmentListItem from './CommitmentListItem';
import CommitmentsTable from './CommitmentsTable';
import { useCommitmentFilters } from '../hooks/useCommitmentFilters.ts';
import CommitmentModals from './CommitmentModals';

interface Commitment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  selected?: boolean;
  committedDate?: string;
  approvedDate?: string;
  type?: string;
  nudgesLeft?: number;
  totalNudges?: number;
  isExternal?: boolean;
  questions?: string[];
  explanation?: string;
  responses?: { date: string; answer: string }[];
  isOverdue?: boolean;
}

interface CommitmentsSectionProps {
  title: string;
  tabs: { label: string; count: number; items: Commitment[] }[];
  displayMode?: 'regular' | 'table';
  onToggleDisplayMode?: (mode: 'regular' | 'table') => void;
  showClearAllFilters?: boolean;
  isActionsPage?: boolean;
  isCommitmentPortfolioPage?: boolean;
}

const CommitmentsSection: React.FC<CommitmentsSectionProps> = ({ title, tabs, displayMode = 'regular', onToggleDisplayMode, showClearAllFilters = true, isActionsPage = false, isCommitmentPortfolioPage = false }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [personFilter, setPersonFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDateNewest');
  const [searchTerm, setSearchTerm] = useState('');
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [tempDateRange, setTempDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

  const [badgeTableFilter, setBadgeTableFilter] = useState('');
  const [commitmentTextTableFilter, setCommitmentTextTableFilter] = useState('');
  const [assigneeTableFilter, setAssigneeTableFilter] = useState('');
  const [dueDateTableFilter, setDueDateTableFilter] = useState<Dayjs | null>(null);
  const [committedDateTableFilter, setCommittedDateTableFilter] = useState<Dayjs | null>(null);
  const [approvedDateTableFilter, setApprovedDateTableFilter] = useState<Dayjs | null>(null);

  const [modalState, setModalState] = useState({
    details: { open: false, commitment: null as Commitment | null },
    requestBadge: { open: false },
    bulkRequestBadge: { open: false },
    badgeDetails: { open: false, badge: null as Commitment | null },
    badgeRequestDetails: { open: false, commitment: null as Commitment | null },
    accept: { open: false, commitment: null as Commitment | null },
    acceptNudge: { open: false, commitment: null as Commitment | null },
    bulkDecline: { open: false },
    individualDecline: { open: false, commitment: null as Commitment | null },
    revoke: { open: false, commitment: null as Commitment | null },
    clarify: { open: false, commitment: null as Commitment | null },
    bulkAccept: { open: false },
    answerNudge: { open: false, commitment: null as Commitment | null },
    nudgeDetails: { open: false, commitment: null as Commitment | null },
    bulkClarify: { open: false },
    bulkRevoke: { open: false },
    approvalSuccess: { open: false, requester: '' },
    rejectBadge: { open: false, commitment: null as Commitment | null },
    bulkApprove: { open: false },
    bulkReject: { open: false },
    bulkApprovalSuccess: { open: false },
    clarificationSuccess: { open: false },
    makePromise: { open: false, type: 'promise' as 'promise' | 'request' },
  });

  const [containerContentHeight, setContainerContentHeight] = useState<number | string>('auto');
  const firstItemRef = useRef<HTMLDivElement>(null);
  const [firstItemObservedHeight, setFirstItemObservedHeight] = useState<number | null>(null);

  const isActivePromisesTab = tabs[activeTab].label === 'Active Promises';
  const isMyPromisesTab = tabs[activeTab].label === 'My Promises';
  const isRequestsToCommitTab = tabs[activeTab].label === 'Requests to Commit';
  const isAwaitingResponseTab = tabs[activeTab].label === 'Awaiting Response';
  const isOwedToMe = tabs[activeTab].label === 'Promises Owed to Me';
  const isBadgeRequestsTab = tabs[activeTab].label === 'Badge Requests';
  const isMyBadgesTab = tabs[activeTab].label === 'My Badges';
  const isUnkeptTab = tabs[activeTab].label.includes('Unkept');
  const isBadgesIssuedTab = tabs[activeTab].label === 'Badges Issued';
  const isMyCommitmentsSection = title.trim() === 'My Commitments';
  const isTableView = displayMode === 'table';
  const disableAllFiltersExceptSort = isRequestsToCommitTab || isAwaitingResponseTab;
  const disableActivePromisesFiltersInTable = isCommitmentPortfolioPage && isMyCommitmentsSection && isTableView && isActivePromisesTab;

  const currentItems = useCommitmentFilters(
    commitments,
    {
      personFilter, dateFilter, searchTerm, dateRange, sortBy, displayMode,
      badgeTableFilter, commitmentTextTableFilter, assigneeTableFilter,
      dueDateTableFilter, committedDateTableFilter, approvedDateTableFilter
    },
    isUnkeptTab, isMyBadgesTab, isBadgesIssuedTab, disableActivePromisesFiltersInTable
  );

  useEffect(() => {
    setCommitments(tabs[activeTab].items.map(item => ({ ...item, selected: false })));
    setSelectAll(false);
    const currentTabLabel = tabs[activeTab].label;
    const disableFiltersForCurrentTab = ['Requests to Commit', 'Awaiting Response', 'Active Promises'].includes(currentTabLabel);

    if (disableFiltersForCurrentTab) {
      setDateFilter('All');
      setSortBy('dueDateNewest');
      setSearchTerm('');
      setDateRange([null, null]);
    }
    setSortBy((currentTabLabel === 'My Badges' || currentTabLabel === 'Badges Issued') ? 'approvedDateNewest' : 'dueDateNewest');
    
    setBadgeTableFilter('');
    setCommitmentTextTableFilter('');
    setAssigneeTableFilter('');
    setDueDateTableFilter(null);
    setCommittedDateTableFilter(null);
    setApprovedDateTableFilter(null);
  }, [activeTab, tabs]);

  useEffect(() => {
    if (firstItemRef.current) {
      const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          setFirstItemObservedHeight(entry.contentRect.height);
        }
      });
      observer.observe(firstItemRef.current);
      return () => observer.disconnect();
    }
  }, [currentItems.length, isTableView]);

  useEffect(() => {
    if (isTableView) {
      setContainerContentHeight('auto');
      return;
    }
    if (currentItems.length === 0) {
      setContainerContentHeight('250px');
    } else if (firstItemObservedHeight !== null) {
      const cardHeight = firstItemObservedHeight;
      const spacing = 8;
      setContainerContentHeight(currentItems.length === 1 ? cardHeight : (cardHeight * 2) + spacing);
    }
  }, [currentItems.length, isTableView, firstItemObservedHeight]);

  const openModal = (modalName: keyof typeof modalState, state: any) => {
    setModalState(prev => ({ ...prev, [modalName]: { ...prev[modalName], ...state, open: true } }));
  };

  const closeModal = (modalName: keyof typeof modalState) => {
    setModalState(prev => ({ ...prev, [modalName]: { ...prev[modalName], open: false } }));
  };

  const handleViewCommitmentDetails = (item: Commitment) => {
    if (isBadgeRequestsTab) openModal('badgeRequestDetails', { commitment: item });
    else if (item.type === 'nudge' && (isMyPromisesTab || isRequestsToCommitTab)) openModal('nudgeDetails', { commitment: item });
    else if (isMyBadgesTab || isBadgesIssuedTab) openModal('badgeDetails', { badge: item });
    else openModal('details', { commitment: item });
  };

  const handleRequestBadgeFromDetails = () => {
    closeModal('details');
    openModal('requestBadge', {});
  };

  const handleToggleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    setCommitments(prev => prev.map(item => {
      const isNudgeInMyPromises = isMyPromisesTab && item.type === 'nudge';
      const isItemInActivePromises = isActivePromisesTab;
      return { ...item, selected: (isNudgeInMyPromises || isItemInActivePromises) ? false : checked };
    }));
  };

  const handleToggleSelectItem = (id: number, checked: boolean) => {
    setCommitments(prev => prev.map(item => item.id === id ? { ...item, selected: checked } : item));
    if (!checked) setSelectAll(false);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    if (!newValue) return;
    const [start] = tempDateRange;
    if (!start || (start && tempDateRange[1])) {
      setTempDateRange([newValue, null]);
    } else {
      setTempDateRange(newValue.isBefore(start) ? [newValue, start] : [start, newValue]);
    }
  };

  const handleApplyDateRange = () => {
    setDateRange(tempDateRange);
    setPopoverAnchor(null);
  };

  const handleClearDateRange = () => {
    setTempDateRange([null, null]);
    setDateRange([null, null]);
    setPopoverAnchor(null);
  };

  const handleDateFilterChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setDateFilter(value);
    if (value !== 'Custom Range') setDateRange([null, null]);
  };

  const handleTableFilterChange = useCallback((filterName: string, value: any) => {
    const filterSetters: { [key: string]: React.Dispatch<any> } = {
      badge: setBadgeTableFilter,
      commitmentText: setCommitmentTextTableFilter,
      assignee: setAssigneeTableFilter,
      dueDate: setDueDateTableFilter,
      committedDate: setCommittedDateTableFilter,
      approvedDate: setApprovedDateTableFilter,
    };
    filterSetters[filterName]?.(value);
  }, []);

  const handleClearAllFilters = () => {
    setPersonFilter('');
    setDateFilter('All');
    setSortBy('dueDateNewest');
    setSearchTerm('');
    setDateRange([null, null]);
    setTempDateRange([null, null]);
    setBadgeTableFilter('');
    setCommitmentTextTableFilter('');
    setAssigneeTableFilter('');
    setDueDateTableFilter(null);
    setCommittedDateTableFilter(null);
    setApprovedDateTableFilter(null);
  };

  const allAssignees = tabs.flatMap(tab => tab.items.filter(item => !item.isExternal).map(item => item.assignee));
  const uniquePeople = [...new Set(allAssignees)].filter(name => name !== 'Dev Team Lead');
  const filterOptions = [...uniquePeople, 'Development team'];
  const hasExternal = tabs.some(tab => tab.items.some(item => item.isExternal));
  const selectedCommitments = commitments.filter(item => item.selected);
  const selectedCount = selectedCommitments.length;
  let itemColor = title.trim() === "Others' Commitments" ? '#1976d2' : '#ff7043';
  if (isUnkeptTab) itemColor = '#4F4F4F';
  const showBulkActionsSection = isActionsPage && currentItems.length > 0 && !isUnkeptTab && !isMyBadgesTab;
  const tableBadgeOptions = [...new Set(commitments.map(item => item.title))];
  const tableAssigneeOptions = [...new Set(commitments.map(item => item.assignee))];

  return (
    <>
      <Paper sx={{ p: 3, height: 'auto', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', border: '1px solid #e8eaed', mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: title.trim() === 'My Commitments' ? '#CC5500' : '#1976d2', fontSize: '1.25rem' }}>{title}</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }} disabled={isTableView || disableAllFiltersExceptSort}>
              <InputLabel>Person</InputLabel>
              <Select value={personFilter} onChange={(e) => setPersonFilter(e.target.value as string)} label="Person" startAdornment={<InputAdornment position="start"><Person fontSize="small" sx={{ color: (isTableView || disableAllFiltersExceptSort) ? 'action.disabled' : 'text.secondary' }} /></InputAdornment>}>
                <MenuItem value="">All</MenuItem>
                {filterOptions.map(person => <MenuItem key={person} value={person}>{person}</MenuItem>)}
                {hasExternal && <MenuItem value="External">External</MenuItem>}
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }} disabled={isTableView || disableAllFiltersExceptSort}>
              <InputLabel>Due Date</InputLabel>
              <Select value={dateFilter} onChange={handleDateFilterChange} label="Due Date" startAdornment={<InputAdornment position="start"><CalendarToday fontSize="small" sx={{ color: (isTableView || disableAllFiltersExceptSort) ? 'action.disabled' : 'text.secondary' }} /></InputAdornment>}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="This Week">This Week</MenuItem>
                <MenuItem value="Custom Range">Custom Range</MenuItem>
              </Select>
            </FormControl>
            {dateFilter === 'Custom Range' && <TextField variant="outlined" size="small" value={dateRange[0] && dateRange[1] ? `${dateRange[0].format('MMM D')} - ${dateRange[1].format('MMM D, YYYY')}` : 'Select Range'} onClick={(e) => { setTempDateRange(dateRange); setPopoverAnchor(e.currentTarget); }} InputProps={{ readOnly: true }} sx={{ minWidth: 180, cursor: 'pointer' }} disabled={isTableView || disableAllFiltersExceptSort} />}
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as string)} label="Sort By" startAdornment={<InputAdornment position="start"><ArrowUpward fontSize="small" sx={{ color: 'text.secondary' }} /></InputAdornment>}>
                {(isMyBadgesTab || isBadgesIssuedTab) ? [<MenuItem key="approvedDateNewest" value="approvedDateNewest">Approved Date (Newest First)</MenuItem>, <MenuItem key="approvedDateOldest" value="approvedDateOldest">Approved Date (Oldest First)</MenuItem>, <MenuItem key="committedDateNewest" value="committedDateNewest">Committed Date (Newest First)</MenuItem>, <MenuItem key="committedDateOldest" value="committedDateOldest">Committed Date (Oldest First)</MenuItem>] : [<MenuItem key="dueDateNewest" value="dueDateNewest">Due Date (Newest First)</MenuItem>, <MenuItem key="dueDateOldest" value="dueDateOldest">Due Date (Oldest First)</MenuItem>, <MenuItem key="committedDateNewest" value="committedDateNewest">Committed Date (Newest First)</MenuItem>, <MenuItem key="committedDateOldest" value="committedDateOldest">Committed Date (Oldest First)</MenuItem>]}
                {!isUnkeptTab && !isRequestsToCommitTab && !isAwaitingResponseTab && <MenuItem value="overdue">Overdue</MenuItem>}
              </Select>
            </FormControl>
            <TextField variant="outlined" size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} disabled={isTableView && isActivePromisesTab} />
          </Box>
        </Box>
        <Popover open={Boolean(popoverAnchor)} anchorEl={popoverAnchor} onClose={() => setPopoverAnchor(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <DateCalendar value={tempDateRange[0]} onChange={handleDateChange} slotProps={{ day: (ownerState) => { const { day, outsideCurrentMonth } = ownerState as any; const [start, end] = tempDateRange; const isStartDate = start?.isSame(day as Dayjs, 'day') ?? false; const isEndDate = end?.isSame(day as Dayjs, 'day') ?? false; const isInRange = start && end ? (day as Dayjs).isBetween(start, end, null, '()') : false; const isRangeBoundary = isStartDate || isEndDate; const sx: SxProps<Theme> = { borderRadius: '50%', ...(isRangeBoundary && !outsideCurrentMonth && { backgroundColor: 'primary.main', color: 'common.white', '&:hover, &:focus, &.Mui-selected': { backgroundColor: 'primary.main', color: 'common.white' } }), ...(isInRange && !outsideCurrentMonth && { backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.3), color: 'primary.dark', borderRadius: '50%' }) }; return { sx } as any; } }} sx={{ mb: -2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, px: 2, pb: 1.5, pt: 0 }}>
            <Button onClick={handleClearDateRange} variant="text" sx={{ py: 0.75, px: 2, color: 'text.secondary' }}>Clear</Button>
            <Button onClick={handleApplyDateRange} variant="contained" color="primary" sx={{ py: 0.75, px: 6, fontWeight: 600 }}>Apply</Button>
          </Box>
        </Popover>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: 1, borderColor: 'divider', mb: 1 }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 }, '& .Mui-selected': { color: 'primary.main' } }}>
            {tabs.map((tab, i) => <Tab key={i} label={`${tab.label} (${tab.count})`} />)}
          </Tabs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            {onToggleDisplayMode && <FormControlLabel control={<Switch checked={displayMode === 'table'} onChange={() => onToggleDisplayMode(displayMode === 'table' ? 'regular' : 'table')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#1976d2' }, '& .MuiSwitch-switchBase': { color: '#ff7043' } }} />} label={displayMode === 'table' ? 'Table Mode' : 'Regular Mode'} labelPlacement="start" sx={{ m: 0 }} />}
            {showClearAllFilters && <Button onClick={handleClearAllFilters} sx={{ textTransform: 'capitalize', color: 'grey.600', textDecoration: 'underline', p: 0, '&:hover': { textDecoration: 'underline', bgcolor: 'transparent', color: 'grey.800' } }}>Clear All Filters</Button>}
          </Box>
        </Box>
        {showBulkActionsSection && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2, mb: 1, flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Checkbox size="small" sx={{ p: 0 }} checked={selectAll} onChange={handleToggleSelectAll} indeterminate={selectedCount > 0 && selectedCount < currentItems.filter((i: Commitment) => !(isMyPromisesTab && i.type === 'nudge') && !isActivePromisesTab).length} />
              <Typography variant="body2" sx={{ color: '#666' }}>{selectedCount} commitment{selectedCount !== 1 ? 's' : ''} selected</Typography>
              {isActionsPage && selectedCount > 0 && isMyPromisesTab && <Button variant="contained" size="small" onClick={() => openModal('bulkRequestBadge', {})} sx={{ bgcolor: '#ff7043', color: 'white', textTransform: 'none', fontWeight: 'bold', '&:hover': { bgcolor: '#f4511e' } }}>Bulk Request</Button>}
              {isActionsPage && selectedCount > 0 && isOwedToMe && <Button variant="contained" size="small" onClick={() => openModal('bulkClarify', {})} sx={{ bgcolor: '#1976d2', color: 'white', textTransform: 'none', fontWeight: 'bold', px: 3, '&:hover': { bgcolor: '#1565c0' } }}>Clarify</Button>}
              {isActionsPage && selectedCount > 0 && isAwaitingResponseTab && <Button variant="contained" size="small" onClick={() => openModal('bulkRevoke', {})} sx={{ bgcolor: '#F44336', color: 'white', textTransform: 'none', fontWeight: 'bold', '&:hover': { bgcolor: '#d32f2f' } }}>Revoke</Button>}
              {selectedCount > 0 && isRequestsToCommitTab && <Box sx={{ display: 'flex', gap: 1 }}><Button variant="contained" size="small" onClick={() => openModal('bulkAccept', {})} sx={{ bgcolor: '#4CAF50', color: 'white', textTransform: 'none', '&:hover': { bgcolor: '#388e3c' } }}>Accept</Button><Button variant="contained" size="small" onClick={() => openModal('bulkDecline', {})} sx={{ bgcolor: '#F44336', color: 'white', textTransform: 'none', '&:hover': { bgcolor: '#d32f2f' } }}>Decline</Button></Box>}
              {selectedCount > 0 && isBadgeRequestsTab && <Box sx={{ display: 'flex', gap: 1 }}><Button variant="contained" size="small" onClick={() => openModal('bulkApprove', {})} sx={{ bgcolor: '#4CAF50', color: 'white', textTransform: 'none', '&:hover': { bgcolor: '#388e3c' } }}>Approve</Button><Button variant="contained" size="small" onClick={() => openModal('bulkReject', {})} sx={{ bgcolor: '#F44336', color: 'white', textTransform: 'none', '&:hover': { bgcolor: '#d32f2f' } }}>Reject</Button></Box>}
            </Box>
          </Box>
        )}
        <Box sx={{ height: containerContentHeight, minHeight: 0, pr: isTableView ? 0 : 1, overflowY: isTableView ? 'visible' : 'auto', display: 'flex', flexDirection: 'column', justifyContent: currentItems.length === 0 ? 'center' : 'flex-start', alignItems: currentItems.length === 0 ? 'center' : 'stretch' }}>
          {displayMode === 'table' ? (
            <Box sx={{ mt: 2 }}>
              <CommitmentsTable commitments={currentItems} filters={{ badge: badgeTableFilter, commitmentText: commitmentTextTableFilter, assignee: assigneeTableFilter, dueDate: dueDateTableFilter, committedDate: committedDateTableFilter, approvedDate: approvedDateTableFilter }} onFilterChange={handleTableFilterChange} badgeOptions={tableBadgeOptions} assigneeOptions={tableAssigneeOptions} isActivePromisesTab={isActivePromisesTab} isMyBadgesTab={isMyBadgesTab} isBadgesIssuedTab={isBadgesIssuedTab} />
            </Box>
          ) : (
            <Stack spacing={1} sx={{ width: '100%', mt: 1 }}>
              {currentItems.length > 0 ? (
                currentItems.map((item: Commitment, i: number) => (
                  <CommitmentListItem
                    key={item.id} {...item} ref={i === 0 ? firstItemRef : null} color={itemColor}
                    showCheckbox={isActionsPage && !isMyBadgesTab && !isUnkeptTab}
                    isCheckboxDisabled={isActionsPage ? (isMyPromisesTab && item.type === 'nudge') : isActivePromisesTab}
                    showActionButton={isActionsPage && ((item.type === 'nudge' && isMyPromisesTab) || (!isMyBadgesTab && !isUnkeptTab && !isRequestsToCommitTab && !isAwaitingResponseTab && !isBadgeRequestsTab)) && !(isCommitmentPortfolioPage && isActivePromisesTab)}
                    buttonText={item.type === 'nudge' && isMyPromisesTab ? 'Answer Nudge' : (isOwedToMe ? 'Clarify' : 'Request Badge')}
                    onActionButtonClick={item.type === 'nudge' && isMyPromisesTab ? () => openModal('answerNudge', { commitment: item }) : (isOwedToMe ? () => openModal('clarify', { commitment: item }) : () => openModal('requestBadge', {}))}
                    onViewDetails={() => handleViewCommitmentDetails(item)}
                    onToggleSelect={handleToggleSelectItem}
                    showAcceptDeclineButtons={isRequestsToCommitTab || isBadgeRequestsTab}
                    onAccept={isBadgeRequestsTab ? () => { setCommitments(prev => prev.filter(c => c.id !== item.id)); openModal('approvalSuccess', { requester: item.assignee }); } : () => openModal(item.type === 'nudge' ? 'acceptNudge' : 'accept', { commitment: item })}
                    onDecline={isBadgeRequestsTab ? () => { setCommitments(prev => prev.filter(c => c.id !== item.id)); openModal('rejectBadge', { commitment: item }); } : () => openModal('individualDecline', { commitment: item })}
                    acceptButtonText={isBadgeRequestsTab ? 'Approve' : undefined}
                    declineButtonText={isBadgeRequestsTab ? 'Reject' : undefined}
                    isBulkSelecting={selectedCount > 0}
                    hideDueDate={isRequestsToCommitTab || isAwaitingResponseTab || isBadgeRequestsTab}
                    isNudge={item.type === 'nudge'}
                    isMyPromisesTab={isMyPromisesTab}
                    isMyBadgesTab={isMyBadgesTab}
                    isBadgesIssuedTab={isBadgesIssuedTab}
                    isOverdue={item.isOverdue}
                    showRevokeButton={isAwaitingResponseTab}
                    onRevoke={() => openModal('revoke', { commitment: item })}
                    showFromLabel={isRequestsToCommitTab || isOwedToMe || isBadgeRequestsTab || isUnkeptTab}
                    showBadgePlaceholder={isMyBadgesTab || isActivePromisesTab || isBadgesIssuedTab || isOwedToMe}
                  />
                ))
              ) : (
                <Box sx={{ textAlign: 'center', color: 'text.secondary', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Nothing here yet.</Typography>
                  <Typography variant="body1" sx={{ mb: 3, maxWidth: '80%', mx: 'auto' }}>We couldn’t find any commitments that match your filters. Try changing them or create something new.</Typography>
                  <Button variant="contained" sx={{ bgcolor: title.trim() === "Others' Commitments" ? 'primary.main' : '#ff7043', color: 'white', textTransform: 'none', fontWeight: 'bold', px: 4, py: 1.5, borderRadius: 2, fontSize: '16px', '&:hover': { bgcolor: title.trim() === "Others' Commitments" ? 'primary.dark' : '#f4511e' } }} onClick={() => openModal('makePromise', { type: title.trim() === "Others' Commitments" ? 'request' : 'promise' })}>
                    {title.trim() === "Others' Commitments" ? 'Request a Commitment' : 'Make a Promise'}
                  </Button>
                </Box>
              )}
            </Stack>
          )}
        </Box>
      </Paper>
      <CommitmentModals
        modalState={modalState}
        closeModal={closeModal}
        setCommitments={setCommitments}
        selectedCommitments={selectedCommitments}
        onDetailsModalRequestBadge={handleRequestBadgeFromDetails}
        onDetailsModalAccept={handleViewCommitmentDetails}
        onDetailsModalDecline={handleViewCommitmentDetails}
        onDetailsModalRevoke={handleViewCommitmentDetails}
        onDetailsModalClarify={handleViewCommitmentDetails}
        isCommitmentPortfolioPage={isCommitmentPortfolioPage}
        isRequestsToCommitTab={isRequestsToCommitTab}
        isAwaitingResponseTab={isAwaitingResponseTab}
        isOwedToMe={isOwedToMe}
      />
    </>
  );
};

export default CommitmentsSection;