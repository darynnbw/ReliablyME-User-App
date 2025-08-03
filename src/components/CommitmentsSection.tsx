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
import SuccessConfirmationModal from './SuccessConfirmationModal';
import BadgeRequestDetailsModal from './BadgeRequestDetailsModal';
import ConfirmationModal from './ConfirmationModal';
import CommitmentActionModal from './CommitmentActionModal';
import CommitmentsTable from './CommitmentsTable'; // Import the new table component

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
  displayMode?: 'regular' | 'table'; // New prop for display mode
  showClearAllFilters?: boolean; // New prop to control visibility of Clear All Filters button
  isActionsPage?: boolean; // New prop to differentiate between Actions and Commitment Portfolio
  isCommitmentPortfolioPage?: boolean; // New prop to indicate if on Commitment Portfolio page
}

const parseCommitmentDate = (dateString: string): Dayjs | null => {
  try {
    if (dateString === 'Today') return dayjs().startOf('day');
    // Handle "Completed Jul 18, 8:00 PM" or "Pending"
    let cleanDateString = dateString;
    if (dateString.startsWith('Completed ')) {
      cleanDateString = dateString.substring('Completed '.length);
    } else if (dateString === 'Pending') {
      return null; // Or handle as a future/indefinite date
    }
    
    // Attempt to parse different formats, like "MMM D, hh:mm A" or "MMM D, YYYY"
    const date = dayjs(cleanDateString, ['MMM D, hh:mm A', 'MMM D, YYYY, hh:mm A', 'MMM D', 'MMM D, YYYY'], true);
    return date.isValid() ? date : null;
  } catch (error) {
    return null;
  }
};

const parseCommittedDate = (dateString?: string): Dayjs | null => {
  if (!dateString) return null;
  try {
    let cleanDateString = dateString;
    if (dateString.startsWith('Requested on ')) {
      cleanDateString = dateString.substring('Requested on '.length);
    }
    const date = dayjs(cleanDateString, ['MMM D, hh:mm A', 'MMM D, YYYY, hh:mm A', 'MMM D, YYYY'], true);
    return date.isValid() ? date : null;
  }
  catch (error) {
    return null;
  }
};

// Define group members for filtering
const groupMembers: { [key: string]: string[] } = {
  'Development team': ['Alex Johnson', 'Chris Parker'],
  'Customer facing team': ['Riley Chen'],
  'Official co-op': ['Alex Johnson', 'Chris Parker', 'Riley Chen'],
  'Part-timers': ['Chris Parker'],
};

const CommitmentsSection: React.FC<CommitmentsSectionProps> = ({ title, tabs, displayMode = 'regular', showClearAllFilters = true, isActionsPage = false, isCommitmentPortfolioPage = false }) => {
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

  // New state for table-specific filters
  const [badgeTableFilter, setBadgeTableFilter] = useState('');
  const [commitmentTextTableFilter, setCommitmentTextTableFilter] = useState('');
  const [assigneeTableFilter, setAssigneeTableFilter] = useState('');
  const [dueDateTableFilter, setDueDateTableFilter] = useState<Dayjs | null>(null);
  const [committedDateTableFilter, setCommittedDateTableFilter] = useState<Dayjs | null>(null);

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

  // New state for clarification success modal
  const [showClarificationSuccessModal, setShowClarificationSuccessModal] = useState(false);

  // State for "Make a Promise" modal from empty state
  const [makePromiseModalOpen, setMakePromiseModalOpen] = useState(false);
  const [makePromiseModalType, setMakePromiseModalType] = useState<'promise' | 'request'>('promise');

  const handleOpenMakePromiseModal = (type: 'promise' | 'request') => {
    setMakePromiseModalType(type);
    setMakePromiseModalOpen(true);
  };

  const handleCloseMakePromiseModal = useCallback(() => {
    setMakePromiseModalOpen(false);
  }, []);

  const handleCloseApprovalModal = useCallback(() => {
    setApprovalModalOpen(false);
    setRequesterForApproval('');
  }, []);

  const handleCloseRejectBadgeModal = useCallback(() => {
    setRejectBadgeModalOpen(false);
    setCommitmentToReject(null);
  }, []);

  const handleCloseClarificationSuccessModal = useCallback(() => {
    setShowClarificationSuccessModal(false);
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

  useEffect(() => {
    setCommitments(tabs[activeTab].items.map(item => ({ ...item, selected: false })));
    setSelectAll(false);
    setCurrentPage(1);
    // Reset filters when tab changes to a disabled filter tab, but keep personFilter
    if (disableFilters) {
      setDateFilter('All');
      setSortBy('dueDateNewest');
      setSearchTerm('');
      setDateRange([null, null]);
      setTempDateRange([null, null]);
    }
    // Reset table-specific filters when tab changes
    setBadgeTableFilter('');
    setCommitmentTextTableFilter('');
    setAssigneeTableFilter('');
    setDueDateTableFilter(null);
    setCommittedDateTableFilter(null);
  }, [activeTab, tabs]); // Removed disableFilters from dependency array as it's derived from activeTab

  // Define these boolean flags after activeTab is set in useEffect or directly from activeTab
  const isMyPromisesTab = tabs[activeTab].label === 'My Promises';
  const isRequestsToCommitTab = tabs[activeTab].label === 'Requests to Commit';
  const isAwaitingResponseTab = tabs[activeTab].label === 'Awaiting Response';
  const isOwedToMe = tabs[activeTab].label === 'Promises Owed to Me';
  const isBadgeRequestsTab = tabs[activeTab].label === 'Badge Requests';
  const isMyBadgesTab = tabs[activeTab].label === 'My Badges';
  const isUnkeptTab = tabs[activeTab].label.includes('Unkept');

  // Determine if filters should be disabled
  const disableFilters = isRequestsToCommitTab || isAwaitingResponseTab;

  // Generate unique people and add group options
  const allAssignees = tabs.flatMap(tab => tab.items.filter(item => !item.isExternal).map(item => item.assignee));
  const uniquePeople = [...new Set(allAssignees)].filter(name => name !== 'Dev Team Lead'); // Filter out 'Dev Team Lead'
  const filterOptions = [...uniquePeople, 'Development team']; // Add 'Development team' as an option
  const hasExternal = tabs.some(tab => tab.items.some(item => item.isExternal));

  const currentItems = commitments.filter(item => {
    // Global filters
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchTerm.toLowerCase());

    if (!searchMatch) return false;

    const personMatch = (() => {
      if (!personFilter) return true; // 'All' is selected
      if (personFilter === 'External') return item.isExternal === true;
      if (personFilter === 'Development team') {
        return groupMembers['Development team'].includes(item.assignee);
      }
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

    // Table-specific filters (only apply if displayMode is 'table' and it's 'My Commitments' section)
    if (displayMode === 'table' && title.trim() === 'My Commitments') {
      if (badgeTableFilter && item.title !== badgeTableFilter) return false;
      if (commitmentTextTableFilter && !item.description.toLowerCase().includes(commitmentTextTableFilter.toLowerCase())) return false;
      if (assigneeTableFilter && item.assignee !== assigneeTableFilter) return false;
      
      const itemDueDate = parseCommitmentDate(item.dueDate);
      if (dueDateTableFilter && itemDueDate && !itemDueDate.isSame(dueDateTableFilter, 'day')) return false;

      const itemCommittedDate = item.committedDate ? parseCommitmentDate(item.committedDate) : null;
      if (committedDateTableFilter && itemCommittedDate && !itemCommittedDate.isSame(committedDateTableFilter, 'day')) return false;
    }

    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'dueDateNewest': {
        const dateA = parseCommitmentDate(a.dueDate);
        const dateB = parseCommitmentDate(b.dueDate);
        if (!dateA) return 1;
        if (!dateB) return -1;
        return dateB.valueOf() - dateA.valueOf();
      }
      case 'dueDateOldest': {
        const dateA = parseCommitmentDate(a.dueDate);
        const dateB = parseCommitmentDate(b.dueDate);
        if (!dateA) return 1;
        if (!dateB) return -1;
        return dateA.valueOf() - dateB.valueOf();
      }
      case 'committedDateNewest': {
        const dateA = parseCommittedDate(a.committedDate);
        const dateB = parseCommittedDate(b.committedDate);
        if (!dateA) return 1;
        if (!dateB) return -1;
        return dateB.valueOf() - dateA.valueOf();
      }
      case 'committedDateOldest': {
        const dateA = parseCommittedDate(a.committedDate);
        const dateB = parseCommittedDate(b.committedDate);
        if (!dateA) return 1;
        if (!dateB) return -1;
        return dateA.valueOf() - dateB.valueOf();
      }
      case 'badgeNameAZ': {
        return a.title.localeCompare(b.title);
      }
      default:
        return 0;
    }
  });

  const itemsPerPage = 15;
  const paginatedItems = isMyBadgesTab ? currentItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : currentItems;
  const totalPages = isMyBadgesTab ? Math.ceil(currentItems.length / itemsPerPage) : 0;

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
      // Nudges in My Promises tab should never be selectable for bulk actions
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
    setShowClarificationSuccessModal(true); // Trigger success modal here
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
  
  let itemColor = '#ff7043'; // Default orange
  if (isOwedToMe || isBadgeRequestsTab || (isAwaitingResponseTab && title !== 'My Commitments')) {
    itemColor = '#1976d2'; // Blue
  } else if (isUnkeptTab) {
    itemColor = '#4F4F4F'; // Grey
  }

  // Determine if the current section is "My Commitments"
  const isMyCommitmentsSection = title.trim() === 'My Commitments';
  const isTableView = displayMode === 'table' && isMyCommitmentsSection;

  // Bulk actions section should only show if it's the Actions page and not for Unkept/MyBadges tabs
  const showBulkActionsSection = isActionsPage && paginatedItems.length > 0 && !isUnkeptTab && !isMyBadgesTab;

  const showBulkRequest = isActionsPage && selectedCount > 0 && isMyPromisesTab;
  const showBulkClarify = isActionsPage && selectedCount > 0 && isOwedToMe;
  const showBulkRevoke = isActionsPage && selectedCount > 0 && isAwaitingResponseTab;

  const isOthersCommitmentsSection = title.trim() === "Others' Commitments";

  // Handlers for table-specific filters
  const handleTableFilterChange = useCallback((filterName: string, value: any) => {
    setCurrentPage(1); // Reset pagination on filter change
    switch (filterName) {
      case 'badge':
        setBadgeTableFilter(value);
        break;
      case 'commitmentText':
        setCommitmentTextTableFilter(value);
        break;
      case 'assignee':
        setAssigneeTableFilter(value);
        break;
      case 'dueDate':
        setDueDateTableFilter(value);
        break;
      case 'committedDate':
        setCommittedDateTableFilter(value);
        break;
      default:
        break;
    }
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
    setCurrentPage(1);
  };

  // Options for table filters
  const tableBadgeOptions = [...new Set(commitments.map(item => item.title))];
  const tableAssigneeOptions = [...new Set(commitments.map(item => item.assignee))];

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
            {/* Filters for My Commitments section (including My Promises) */}
            {isMyCommitmentsSection && (
              <>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Person</InputLabel>
                  <Select value={personFilter} onChange={(e) => setPersonFilter(e.target.value as string)} label="Person" startAdornment={<InputAdornment position="start"><Person fontSize="small" /></InputAdornment>}>
                    <MenuItem value="">All</MenuItem>
                    {filterOptions.map(person => (
                      <MenuItem key={person} value={person}>{person}</MenuItem>
                    ))}
                    {hasExternal && <MenuItem value="External">External</MenuItem>}
                  </Select>
                </FormControl>

                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }} disabled={disableFilters}>
                  <InputLabel>Due Date</InputLabel>
                  <Select
                    value={dateFilter}
                    onChange={handleDateFilterChange}
                    label="Due Date"
                    startAdornment={
                      <InputAdornment position="start">
                        <CalendarToday fontSize="small" sx={{ color: disableFilters ? 'action.disabled' : 'text.secondary' }} />
                      </InputAdornment>
                    }
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
                    disabled={disableFilters}
                  />
                )}
              </>
            )}
            {/* Filters for Others' Commitments section */}
            {!isMyCommitmentsSection && (
              <>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Person</InputLabel>
                  <Select value={personFilter} onChange={(e) => setPersonFilter(e.target.value as string)} label="Person" startAdornment={<InputAdornment position="start"><Person fontSize="small" /></InputAdornment>}>
                    <MenuItem value="">All</MenuItem>
                    {filterOptions.map(person => (
                      <MenuItem key={person} value={person}>{person}</MenuItem>
                    ))}
                    {hasExternal && <MenuItem value="External">External</MenuItem>}
                  </Select>
                </FormControl>

                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }} disabled={disableFilters}>
                  <InputLabel>Due Date</InputLabel>
                  <Select
                    value={dateFilter}
                    onChange={handleDateFilterChange}
                    label="Due Date"
                    startAdornment={
                      <InputAdornment position="start">
                        <CalendarToday fontSize="small" sx={{ color: disableFilters ? 'action.disabled' : 'text.secondary' }} />
                      </InputAdornment>
                    }
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
                    disabled={disableFilters}
                  />
                )}
              </>
            )}

            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }} disabled={disableFilters}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as string)} label="Sort By" startAdornment={
                <InputAdornment position="start">
                  <ArrowUpward fontSize="small" sx={{ color: disableFilters ? 'action.disabled' : 'text.secondary' }} />
                </InputAdornment>
              }>
                <MenuItem value="dueDateNewest">Due Date (Newest First)</MenuItem>
                <MenuItem value="dueDateOldest">Due Date (Oldest First)</MenuItem>
                <MenuItem value="committedDateNewest">Committed Date (Newest First)</MenuItem>
                <MenuItem value="committedDateOldest">Committed Date (Oldest First)</MenuItem>
                {isMyCommitmentsSection && <MenuItem value="badgeNameAZ">Badge Name (A–Z)</MenuItem>}
              </Select>
            </FormControl>

            <TextField variant="outlined" size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} />
          </Box>
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

        {/* New container for Tabs and Clear All Filters button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: 1, borderColor: 'divider', mb: 1 }}> {/* Adjusted mb to 1 */}
          <Tabs value={activeTab} onChange={(_: React.SyntheticEvent, newValue: number) => setActiveTab(newValue)} sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 }, '& .Mui-selected': { color: 'primary.main' } }}>
            {tabs.map((tab, index) => <Tab key={index} label={`${tab.label} (${tab.count})`} />)}
          </Tabs>
          {showClearAllFilters && (
            <Button
              onClick={handleClearAllFilters}
              sx={{
                textTransform: 'none',
                color: 'grey.600',
                textDecoration: 'underline',
                p: 0,
                mb: 1, // Adjust this to align with tab text baseline
                '&:hover': {
                  textDecoration: 'underline',
                  bgcolor: 'transparent',
                  color: 'grey.800',
                },
              }}
            >
              Clear all filters
            </Button>
          )}
        </Box>

        {/* Bulk actions section - now conditional on isActionsPage */}
        {showBulkActionsSection && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2, mb: 1, flexWrap: 'wrap', gap: 2 }}>
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
          height: isTableView ? 'auto' : containerHeight, 
          minHeight: 0, 
          pr: isTableView ? 0 : 1,
          // Conditional styles for centering when empty
          ...(paginatedItems.length === 0 && {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflowY: 'hidden', // Hide scrollbar when empty and centered
          }),
          // Default scroll behavior when not empty
          ...(paginatedItems.length > 0 && {
            overflowY: isTableView ? 'visible' : 'scroll',
          }),
        }}>
          {displayMode === 'table' && isMyCommitmentsSection ? (
            <Box sx={{ mt: 2 }}>
              <CommitmentsTable
                commitments={currentItems}
                filters={{
                  badge: badgeTableFilter,
                  commitmentText: commitmentTextTableFilter,
                  assignee: assigneeTableFilter,
                  dueDate: dueDateTableFilter,
                  committedDate: committedDateTableFilter,
                }}
                onFilterChange={handleTableFilterChange}
                badgeOptions={tableBadgeOptions}
                assigneeOptions={tableAssigneeOptions}
              />
            </Box>
          ) : (
            <Stack spacing={1} sx={{ width: '100%', mt: 1 }}> {/* Adjusted mt to 1 */}
              {paginatedItems.length > 0 ? (
                isMyBadgesTab ? (
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
                    // Checkboxes are shown only on Actions page and not for MyBadges/Unkept tabs
                    const showCheckboxes = isActionsPage && !isMyBadgesTab && !isUnkeptTab;
                    // Nudges in My Promises tab on Actions page are disabled for bulk select
                    const isCheckboxDisabled = isActionsPage && isMyPromisesTab && isNudgeItem; 
                    
                    const itemDate = parseCommitmentDate(item.dueDate);
                    // All unkept promises are overdue by default
                    const isOverdue = isUnkeptTab || (itemDate ? itemDate.isBefore(dayjs(), 'day') : false);
                    const hideDueDate = isRequestsToCommitTab || isAwaitingResponseTab || isBadgeRequestsTab;
                    const showRevokeButton = isAwaitingResponseTab;
                    
                    // Action button logic:
                    // Show if on Actions page AND (
                    //   (it's a Nudge in My Promises tab) OR
                    //   (it's NOT MyBadges, NOT Unkept, NOT RequestsToCommit, NOT AwaitingResponse, NOT BadgeRequests)
                    // )
                    const showActionButton = isActionsPage && (
                      (isNudgeItem && isMyPromisesTab) || 
                      (!isMyBadgesTab && !isUnkeptTab && !isRequestsToCommitTab && !isAwaitingResponseTab && !isBadgeRequestsTab)
                    );
                    const showFromLabel = isRequestsToCommitTab || isOwedToMe || isBadgeRequestsTab;

                    return (
                      <CommitmentListItem
                        key={item.id}
                        {...item}
                        ref={index === 0 ? firstItemRef : null}
                        color={itemColor}
                        showCheckbox={showCheckboxes}
                        isCheckboxDisabled={isCheckboxDisabled}
                        showActionButton={showActionButton}
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
                  width: '100%',
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Nothing here yet.</Typography>
                  <Typography variant="body1" sx={{ mb: 3, maxWidth: '80%', mx: 'auto' }}>We couldn’t find any commitments that match your filters. Try changing them or create something new.</Typography>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: isOthersCommitmentsSection ? 'primary.main' : '#ff7043',
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: '16px',
                      '&:hover': { 
                        bgcolor: isOthersCommitmentsSection ? 'primary.dark' : '#f4511e',
                      },
                    }}
                    onClick={() => handleOpenMakePromiseModal(isOthersCommitmentsSection ? 'request' : 'promise')}
                  >
                    {isOthersCommitmentsSection ? 'Request a Commitment' : 'Make a Promise'}
                  </Button>
                </Box>
              )}
            </Stack>
          )}
        </Box>
        
        {currentItems.length > 0 && isMyBadgesTab && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 2 }}>
            <Pagination count={totalPages} page={currentPage} onChange={(_, page) => setCurrentPage(page)} color="primary" />
          </Box>
        )}

        {/* Removed the second Clear All Filters button */}
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
        isCommitmentPortfolioPage={isCommitmentPortfolioPage}
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
      <SuccessConfirmationModal
        open={approvalModalOpen}
        onClose={handleCloseApprovalModal}
        title="Badge Approved!"
        message={requesterForApproval ? `${requesterForApproval} has been notified.` : 'The user has been notified.'}
      />
      <SuccessConfirmationModal
        open={bulkApprovalSuccessOpen}
        onClose={() => setBulkApprovalSuccessOpen(false)}
        title="Badges Approved!"
        message={`${selectedCount} ${selectedCount === 1 ? 'person has' : 'people have'} been notified.`}
      />
      <SuccessConfirmationModal
        open={showClarificationSuccessModal} // Controlled by new state
        onClose={handleCloseClarificationSuccessModal}
        title="Request Sent!"
        message="The clarification request has been sent."
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

      {/* CommitmentActionModal for "Make a Promise" from empty state */}
      <CommitmentActionModal
        open={makePromiseModalOpen}
        onClose={handleCloseMakePromiseModal}
        type={makePromiseModalType}
      />
    </>
  );
};

export default CommitmentsSection;