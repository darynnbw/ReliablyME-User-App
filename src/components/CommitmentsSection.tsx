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
import { Switch, FormControlLabel } from '@mui/material'; // Import Switch and FormControlLabel

dayjs.extend(isBetween);

interface Commitment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  selected?: boolean;
  committedDate?: string;
  approvedDate?: string; // Added approvedDate
  type?: string;
  nudgesLeft?: number;
  totalNudges?: number;
  isExternal?: boolean;
  questions?: string[];
  explanation?: string;
  responses?: { date: string; answer: string; questions?: string[] }[]; // Added questions to responses
  isOverdue?: boolean; // Added isOverdue to Commitment interface
}

interface CommitmentsSectionProps {
  title:string;
  tabs: { label: string; count: number; items: Commitment[] }[];
  displayMode?: 'regular' | 'table'; // New prop for display mode
  onToggleDisplayMode?: (mode: 'regular' | 'table') => void; // New prop for toggle handler
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

  // New state for table-specific filters
  const [badgeTableFilter, setBadgeTableFilter] = useState('');
  const [commitmentTextTableFilter, setCommitmentTextTableFilter] = useState('');
  const [assigneeTableFilter, setAssigneeTableFilter] = useState('');
  const [dueDateTableFilter, setDueDateTableFilter] = useState<Dayjs | null>(null);
  const [committedDateTableFilter, setCommittedDateTableFilter] = useState<Dayjs | null>(null);
  const [approvedDateTableFilter, setApprovedDateTableFilter] = useState<Dayjs | null>(null);

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

  // State for dynamic container height
  const [containerContentHeight, setContainerContentHeight] = useState<number | string>('auto');

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

  // New functions for badge approval/rejection
  const handleApproveBadgeRequest = (commitment: Commitment) => {
    console.log('Approving badge request:', commitment.id);
    // Logic to remove the approved badge request from the list
    setCommitments(prev => prev.filter(c => c.id !== commitment.id));
    setApprovalModalOpen(true);
    setRequesterForApproval(commitment.assignee); // Assuming assignee is the requester
  };

  const handleRejectBadgeRequest = (commitment: Commitment) => {
    console.log('Rejecting badge request:', commitment.id);
    // Logic to remove the rejected badge request from the list
    setCommitments(prev => prev.filter(c => c.id !== commitment.id));
    setCommitmentToReject(commitment); // Set the commitment for the reject modal
    setRejectBadgeModalOpen(true);
  };

  const handleConfirmRejectBadge = () => {
    console.log('Confirming rejection of badge request:', commitmentToReject?.id);
    // Logic to handle the rejection confirmation
    setRejectBadgeModalOpen(false);
    setCommitmentToReject(null);
  };

  useEffect(() => {
    setCommitments(tabs[activeTab].items.map(item => ({ ...item, selected: false })));
    setSelectAll(false);
    // Reset filters when tab changes to a disabled filter tab, but keep personFilter
    // Determine if filters should be disabled for the current tab
    const currentTabLabel = tabs[activeTab].label;
    const disableFiltersForCurrentTab = currentTabLabel === 'Requests to Commit' || currentTabLabel === 'Awaiting Response' || currentTabLabel === 'Active Promises';

    if (disableFiltersForCurrentTab) {
      setDateFilter('All');
      setSortBy('dueDateNewest');
      setSearchTerm('');
      setDateRange([null, null]);
      setTempDateRange([null, null]);
    }

    // Set default sortBy for 'My Badges' and 'Badges Issued' tabs
    if (currentTabLabel === 'My Badges' || currentTabLabel === 'Badges Issued') {
      setSortBy('approvedDateNewest');
    } else {
      setSortBy('dueDateNewest'); // Default for other tabs
    }

    // Reset table-specific filters when tab changes
    setBadgeTableFilter('');
    setCommitmentTextTableFilter('');
    setAssigneeTableFilter('');
    setDueDateTableFilter(null);
    setCommittedDateTableFilter(null);
    setApprovedDateTableFilter(null);
  }, [activeTab, tabs]);

  // Define these boolean flags after activeTab is set in useEffect or directly from activeTab
  const isActivePromisesTab = tabs[activeTab].label === 'Active Promises'; // New tab
  const isMyPromisesTab = tabs[activeTab].label === 'My Promises'; // This is the old 'My Promises' (now 'My Badges' in Portfolio)
  const isRequestsToCommitTab = tabs[activeTab].label === 'Requests to Commit';
  const isAwaitingResponseTab = tabs[activeTab].label === 'Awaiting Response';
  const isOwedToMe = tabs[activeTab].label === 'Promises Owed to Me';
  const isBadgeRequestsTab = tabs[activeTab].label === 'Badge Requests';
  const isMyBadgesTab = tabs[activeTab].label === 'My Badges'; // This is the new 'My Badges'
  const isUnkeptTab = tabs[activeTab].label.includes('Unkept');
  const isBadgesIssuedTab = tabs[activeTab].label === 'Badges Issued'; // New flag for Badges Issued tab

  // Determine if the current section is "My Commitments"
  const isMyCommitmentsSection = title.trim() === 'My Commitments';
  const isTableView = displayMode === 'table'; // Simplified: displayMode is now global

  // Determine if all filters (except sort by) should be disabled
  const disableAllFiltersExceptSort = isRequestsToCommitTab || isAwaitingResponseTab;
  // Determine if filters should be disabled for Active Promises in table mode
  const disableActivePromisesFiltersInTable = isCommitmentPortfolioPage && isMyCommitmentsSection && isTableView && isActivePromisesTab;

  // Generate unique people and add group options
  const allAssignees = tabs.flatMap(tab => tab.items.filter(item => !item.isExternal).map(item => item.assignee));
  const uniquePeople = [...new Set(allAssignees)].filter(name => name !== 'Dev Team Lead'); // Filter out 'Dev Team Lead'
  const filterOptions = [...uniquePeople, 'Development team']; // Add 'Development team' as an option
  const hasExternal = tabs.some(tab => tab.items.some(item => item.isExternal));

  // Pre-process commitments to add a calculated isOverdue flag for sorting
  const processedCommitments = commitments.map(item => ({
    ...item,
    isOverdue: item.isOverdue || (!isUnkeptTab && !isMyBadgesTab && !isBadgesIssuedTab && (parseCommitmentDate(item.dueDate) ? parseCommitmentDate(item.dueDate)!.isBefore(dayjs(), 'day') : false))
  }));

  const currentItems = processedCommitments.filter(item => {
    // Global filters
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchTerm.toLowerCase());

    if (!searchMatch && !disableActivePromisesFiltersInTable) return false; // Only apply search if not disabled

    const personMatch = (() => {
      if (!personFilter) return true; // 'All' is selected
      if (personFilter === 'External') return item.isExternal === true;
      if (personFilter === 'Development team') {
        return groupMembers['Development team'].includes(item.assignee);
      }
      return item.assignee === personFilter;
    })();
    if (!personMatch && !disableActivePromisesFiltersInTable) return false; // Only apply person filter if not disabled

    const itemDate = parseCommitmentDate(item.dueDate);
    let dateMatch = true;

    if (dateFilter === 'Custom Range' && dateRange[0] && dateRange[1] && itemDate) {
      dateMatch = !itemDate.isBefore(dateRange[0], 'day') && !itemDate.isAfter(dateRange[1], 'day');
    } else if (dateFilter === 'Today') {
      dateMatch = itemDate ? itemDate.isSame(dayjs(), 'day') : false;
    } else if (dateFilter === 'This Week') {
      dateMatch = itemDate ? itemDate.isBetween(dayjs().startOf('week'), dayjs().endOf('week'), null, '[]') : false;
    }
    
    if (!dateMatch && !disableActivePromisesFiltersInTable) return false; // Only apply date filter if not disabled

    // Table-specific filters (only apply if displayMode is 'table')
    if (displayMode === 'table') {
      if (badgeTableFilter && item.title !== badgeTableFilter) return false;
      if (commitmentTextTableFilter && !item.description.toLowerCase().includes(commitmentTextTableFilter.toLowerCase())) return false;
      if (assigneeTableFilter && item.assignee !== assigneeTableFilter) return false;
      
      const itemDueDate = parseCommitmentDate(item.dueDate);
      if (dueDateTableFilter && itemDueDate && !itemDueDate.isSame(dueDateTableFilter, 'day')) return false;

      const itemCommittedDate = item.committedDate ? parseCommitmentDate(item.committedDate) : null;
      if (committedDateTableFilter && itemCommittedDate && !itemCommittedDate.isSame(committedDateTableFilter, 'day')) return false;

      const itemApprovedDate = item.approvedDate ? dayjs(item.approvedDate, 'MMM D, YYYY, hh:mm A') : null;
      if (approvedDateTableFilter && itemApprovedDate && !itemApprovedDate.isSame(approvedDateTableFilter, 'day')) return false;
    }

    return true;
  }).sort((a, b) => {
    let dateA, dateB;

    switch (sortBy) {
      case 'dueDateNewest':
      case 'dueDateOldest':
        dateA = parseCommitmentDate(a.dueDate);
        dateB = parseCommitmentDate(b.dueDate);
        break;
      case 'committedDateNewest':
      case 'committedDateOldest':
        dateA = parseCommittedDate(a.committedDate);
        dateB = parseCommittedDate(b.committedDate);
        break;
      case 'approvedDateNewest':
      case 'approvedDateOldest':
        dateA = a.approvedDate ? dayjs(a.approvedDate, 'MMM D, YYYY, hh:mm A') : null;
        dateB = b.approvedDate ? dayjs(b.approvedDate, 'MMM D, YYYY, hh:mm A') : null;
        break;
      case 'overdue':
        // This will sort true (overdue) values before false (not overdue) values.
        return (b.isOverdue ? 1 : 0) - (a.isOverdue ? 1 : 0);
      default:
        return 0;
    }

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1; // Treat null/invalid dates as later for 'newest' or earlier for 'oldest'
    if (!dateB) return -1;

    if (sortBy.includes('Newest')) {
      return dateB.valueOf() - dateA.valueOf(); // Newest first
    } else if (sortBy.includes('Oldest')) {
      return dateA.valueOf() - dateB.valueOf(); // Oldest first
    }
    return 0; // Should not be reached
  });

  // No pagination for My Badges tab
  const paginatedItems = currentItems;
  // const totalPages = isMyBadgesTab ? Math.ceil(currentItems.length / itemsPerPage) : 0; // Removed

  // Effect to observe the height of the first item
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
  }, [paginatedItems.length, isTableView]); // Re-observe if items change or view mode changes

  const firstItemRef = useRef<HTMLDivElement>(null); // Ref to get the height of a single list item
  const [firstItemObservedHeight, setFirstItemObservedHeight] = useState<number | null>(null); // State to store observed height

  // Effect to dynamically adjust the height of the content area
  useEffect(() => {
    if (isTableView) {
      setContainerContentHeight('auto'); // Table view handles its own height
      return;
    }

    if (paginatedItems.length === 0) {
      // When there are no items, set a fixed height for the empty state message
      setContainerContentHeight('250px'); // This value might need fine-tuning
    } else if (firstItemObservedHeight !== null) { // Use observed height
      const cardHeight = firstItemObservedHeight;
      const spacing = 8; // From <Stack spacing={1}>

      if (paginatedItems.length === 1) {
        setContainerContentHeight(cardHeight);
      } else {
        // For 2 or more items, show 2 items and enable scrolling
        setContainerContentHeight((cardHeight * 2) + spacing);
      }
    }
  }, [paginatedItems.length, isTableView, firstItemObservedHeight]); // Add observed height as dependency

  const handleViewCommitmentDetails = (item: Commitment) => {
    if (isBadgeRequestsTab) {
      setCommitmentForBadgeRequest(item);
      setBadgeRequestDetailsModalOpen(true);
    } else if (item.type === 'nudge' && (isMyPromisesTab || isRequestsToCommitTab)) {
      setCommitmentForNudgeDetails(item);
      setNudgeDetailsModalOpen(true);
    } else if (isMyBadgesTab || isBadgesIssuedTab) { // Handle My Badges tab and Badges Issued tab specifically
      handleViewBadgeDetails(item);
    }
    else {
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
      // Also, items in 'Active Promises' tab should not be selectable
      const isNudgeInMyPromises = isMyPromisesTab && item.type === 'nudge';
      const isItemInActivePromises = isActivePromisesTab;
      return { ...item, selected: (isNudgeInMyPromises || isItemInActivePromises) ? false : checked };
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
  
  let itemColor = '#ff7043'; // Default orange for 'My Commitments' section

  // Determine item color based on the section title first
  if (title.trim() === "Others' Commitments") {
    itemColor = '#1976d2'; // Default blue for 'Others' Commitments' section
  } else { // This is 'My Commitments' section
    itemColor = '#ff7043'; // Default orange for 'My Commitments' section
  }

  // Override color for 'Unkept' tabs, regardless of section
  if (isUnkeptTab) {
    itemColor = '#4F4F4F'; // Grey for 'Unkept' tabs
  }

  // Bulk actions section should only show if it's the Actions page and not for Unkept/MyBadges tabs
  const showBulkActionsSection = isActionsPage && paginatedItems.length > 0 && !isUnkeptTab && !isMyBadgesTab;

  const showBulkRequest = isActionsPage && selectedCount > 0 && isMyPromisesTab;
  const showBulkClarify = isActionsPage && selectedCount > 0 && isOwedToMe;
  const showBulkRevoke = isActionsPage && selectedCount > 0 && isAwaitingResponseTab;

  const isOthersCommitmentsSection = title.trim() === "Others' Commitments";

  // Handlers for table-specific filters
  const handleTableFilterChange = useCallback((filterName: string, value: any) => {
    // setCurrentPage(1); // Reset pagination on filter change - Removed
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
      case 'approvedDate':
        setApprovedDateTableFilter(value);
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
    setApprovedDateTableFilter(null);
    // setCurrentPage(1); // Removed
  };

  // Options for table filters
  const tableBadgeOptions = [...new Set(commitments.map(item => item.title))];
  const tableAssigneeOptions = [...new Set(commitments.map(item => item.assignee))];

  return (
    <>
      <Paper sx={{
        p: 3,
        height: 'auto', // Let height be determined by content
        minHeight: 'auto', // Remove fixed minHeight from Paper
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
            {/* Simplified filter disabling logic: now based on displayMode and specific tabs */}
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }} disabled={isTableView || disableAllFiltersExceptSort}>
              <InputLabel>Person</InputLabel>
              <Select value={personFilter} onChange={(e) => setPersonFilter(e.target.value as string)} label="Person" startAdornment={<InputAdornment position="start"><Person fontSize="small" sx={{ color: (isTableView || disableAllFiltersExceptSort) ? 'action.disabled' : 'text.secondary' }} /></InputAdornment>}>
                <MenuItem value="">All</MenuItem>
                {filterOptions.map(person => (
                  <MenuItem key={person} value={person}>{person}</MenuItem>
                ))}
                {hasExternal && <MenuItem value="External">External</MenuItem>}
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }} disabled={isTableView || disableAllFiltersExceptSort}>
              <InputLabel>Due Date</InputLabel>
              <Select
                value={dateFilter}
                onChange={handleDateFilterChange}
                label="Due Date"
                startAdornment={
                  <InputAdornment position="start">
                    <CalendarToday fontSize="small" sx={{ color: (isTableView || disableAllFiltersExceptSort) ? 'action.disabled' : 'text.secondary' }} />
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
                disabled={isTableView || disableAllFiltersExceptSort}
              />
            )}

            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as string)} label="Sort By" startAdornment={
                <InputAdornment position="start">
                  <ArrowUpward fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              }>
                {/* Conditionally render sort options based on the tab type */}
                {isMyBadgesTab || isBadgesIssuedTab ? (
                  [
                    <MenuItem key="approvedDateNewest" value="approvedDateNewest">Approved Date (Newest First)</MenuItem>,
                    <MenuItem key="approvedDateOldest" value="approvedDateOldest">Approved Date (Oldest First)</MenuItem>,
                    <MenuItem key="committedDateNewest" value="committedDateNewest">Committed Date (Newest First)</MenuItem>,
                    <MenuItem key="committedDateOldest" value="committedDateOldest">Committed Date (Oldest First)</MenuItem>
                  ]
                ) : (
                  [
                    <MenuItem key="dueDateNewest" value="dueDateNewest">Due Date (Newest First)</MenuItem>,
                    <MenuItem key="dueDateOldest" value="dueDateOldest">Due Date (Oldest First)</MenuItem>,
                    <MenuItem key="committedDateNewest" value="committedDateNewest">Committed Date (Newest First)</MenuItem>,
                    <MenuItem key="committedDateOldest" value="committedDateOldest">Committed Date (Oldest First)</MenuItem>
                  ]
                )}
                {/* Add Overdue sort option for relevant tabs */}
                {!isUnkeptTab && !isRequestsToCommitTab && !isAwaitingResponseTab && (
                  <MenuItem value="overdue">Overdue</MenuItem>
                )}
              </Select>
            </FormControl>

            <TextField variant="outlined" size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} disabled={isTableView && isActivePromisesTab} />
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
            {tabs.map((tab, _index) => <Tab key={_index} label={`${tab.label} (${tab.count})`} />)}
          </Tabs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}> {/* New inner Box for toggle and button */}
            {onToggleDisplayMode && ( /* Changed condition to just onToggleDisplayMode */
              <FormControlLabel
                control={
                  <Switch
                    checked={displayMode === 'table'}
                    onChange={() => onToggleDisplayMode(displayMode === 'table' ? 'regular' : 'table')}
                    sx={{
                      '& .MuiSwitch-switchBase': {
                        color: '#ff7043', // Regular mode thumb color
                      },
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#1976d2', // Table mode thumb color
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: '#e0e0e0', // Track color
                      },
                      '& .MuiSwitch-thumb': {
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      },
                    }}
                  />
                }
                label={displayMode === 'table' ? 'Table Mode' : 'Regular Mode'}
                labelPlacement="start"
                sx={{ m: 0 }} // Removed mb here, let the parent Box handle alignment
              />
            )}
            {showClearAllFilters && (
              <Button
                onClick={handleClearAllFilters}
                sx={{
                  textTransform: 'capitalize', // Changed to capitalize each word
                  color: 'grey.600',
                  textDecoration: 'underline',
                  p: 0,
                  '&:hover': {
                    textDecoration: 'underline',
                    bgcolor: 'transparent',
                    color: 'grey.800',
                  },
                }}
              >
                Clear All Filters {/* Changed text to capitalize each word */}
              </Button>
            )}
          </Box>
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
                indeterminate={selectedCount > 0 && selectedCount < currentItems.filter(i => !(isMyPromisesTab && i.type === 'nudge') && !isActivePromisesTab).length}
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
          height: containerContentHeight, // Apply dynamic height here
          minHeight: 0, // Allow shrinking
          pr: isTableView ? 0 : 1, // Padding for scrollbar in regular mode
          overflowY: isTableView ? 'visible' : 'auto', // Use 'auto' for regular mode to enable scrolling
          display: 'flex', // Ensure flex properties apply to its children
          flexDirection: 'column', // Stack children vertically
          justifyContent: paginatedItems.length === 0 ? 'center' : 'flex-start', // Center content if empty
          alignItems: paginatedItems.length === 0 ? 'center' : 'stretch', // Center content if empty
        }}>
          {displayMode === 'table' ? ( /* Simplified condition */
            <Box sx={{ mt: 2 }}>
              <CommitmentsTable
                commitments={currentItems}
                filters={{
                  badge: badgeTableFilter,
                  commitmentText: commitmentTextTableFilter,
                  assignee: assigneeTableFilter,
                  dueDate: dueDateTableFilter,
                  committedDate: committedDateTableFilter,
                  approvedDate: approvedDateTableFilter,
                }}
                onFilterChange={handleTableFilterChange}
                badgeOptions={tableBadgeOptions}
                assigneeOptions={tableAssigneeOptions}
                isActivePromisesTab={isActivePromisesTab}
                isMyBadgesTab={isMyBadgesTab}
                isBadgesIssuedTab={isBadgesIssuedTab}
              />
            </Box>
          ) : (
            <Stack spacing={1} sx={{ width: '100%', mt: 1 }}> {/* Adjusted mt to 1 */}
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item, _index) => {
                  const isNudgeItem = item.type === 'nudge';
                  // Checkboxes are shown only on Actions page and not for MyBadges/Unkept tabs
                  const showCheckboxes = isActionsPage && !isMyBadgesTab && !isUnkeptTab;
                  // Nudges in My Promises tab on Actions page are disabled for bulk select
                  // Also, items in 'Active Promises' tab are disabled for bulk select
                  const isCheckboxDisabled = isActionsPage ? (isMyPromisesTab && isNudgeItem) : isActivePromisesTab; 
                  
                  const hideDueDate = isRequestsToCommitTab || isAwaitingResponseTab || isBadgeRequestsTab;
                  const showRevokeButton = isAwaitingResponseTab;
                  
                  // Action button logic:
                  // Show if on Actions page AND (
                  //   (is a Nudge in My Promises tab) OR
                  //   (is NOT MyBadges, NOT Unkept, NOT RequestsToCommit, NOT AwaitingResponse, NOT BadgeRequests)
                  // )
                  // Explicitly hide action button for 'Active Promises' tab in Commitment Portfolio
                  let showActionButtonForListItem = isActionsPage && (
                    (isNudgeItem && isMyPromisesTab) || 
                    (!isMyBadgesTab && !isUnkeptTab && !isRequestsToCommitTab && !isAwaitingResponseTab && !isBadgeRequestsTab)
                  );
                  if (isCommitmentPortfolioPage && isActivePromisesTab) {
                      showActionButtonForListItem = false;
                  }

                  // Determine 'From:' or 'To:' label based on tab
                  // 'Badges Issued' should be 'To:'
                  // 'Unkept Promises to Me' should be 'From:'
                  const showFromLabel = isRequestsToCommitTab || isOwedToMe || isBadgeRequestsTab || isUnkeptTab;

                  return (
                    <CommitmentListItem
                      key={item.id}
                      {...item}
                      ref={_index === 0 ? firstItemRef : null} // Keep ref for the first item to measure its height
                      color={itemColor}
                      showCheckbox={showCheckboxes}
                      isCheckboxDisabled={isCheckboxDisabled}
                      showActionButton={showActionButtonForListItem} // Use the new variable
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
                      totalNudges={item.totalNudges}
                      isMyPromisesTab={isMyPromisesTab}
                      isMyBadgesTab={isMyBadgesTab} // Pass this new prop
                      isBadgesIssuedTab={isBadgesIssuedTab} // Pass new prop
                      isExternal={item.isExternal}
                      isOverdue={item.isOverdue} // Pass the pre-calculated isOverdue
                      showRevokeButton={showRevokeButton}
                      onRevoke={() => handleRevokeClick(item)}
                      showFromLabel={showFromLabel}
                      explanation={item.explanation}
                      responses={item.responses}
                      showBadgePlaceholder={isMyBadgesTab || isActivePromisesTab || isBadgesIssuedTab || isOwedToMe} // Added isOwedToMe here
                      approvedDate={item.approvedDate} // Pass approvedDate to CommitmentListItem
                    />
                  );
                })
              ) : (
                <Box sx={{ 
                  textAlign: 'center', 
                  color: 'text.secondary', 
                  width: '100%',
                  flex: 1, // Make the empty state box take up all available space
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
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
        
        {/* Removed pagination for My Badges tab */}
        {/* {currentItems.length > 0 && isMyBadgesTab && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 2 }}>
            <Pagination count={totalPages} page={currentPage} onChange={(_, page) => setCurrentPage(page)} color="primary" />
          </Box>
        )} */}
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
          approvalDate: selectedBadge.approvedDate || 'N/A', // Use actual approvedDate
          originalDueDate: selectedBadge.dueDate, // Pass original dueDate
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