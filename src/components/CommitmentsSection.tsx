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
  KeyboardArrowUp,
  KeyboardArrowDown,
  Remove,
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
import CommitmentsTable from './CommitmentsTable';
import { Switch, FormControlLabel } from '@mui/material';

dayjs.extend(isBetween);

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
  responses?: { date: string; answer: string; questions?: string[] }[];
  isOverdue?: boolean;
}

interface CommitmentsSectionProps {
  title:string;
  tabs: { label: string; count: number; items: Commitment[] }[];
  displayMode?: 'regular' | 'table';
  onToggleDisplayMode?: (mode: 'regular' | 'table') => void;
  showClearAllFilters?: boolean;
  isActionsPage?: boolean;
  isCommitmentPortfolioPage?: boolean;
}

const parseCommitmentDate = (dateString: string): Dayjs | null => {
  try {
    if (dateString === 'Today') return dayjs().startOf('day');
    let cleanDateString = dateString;
    if (dateString.startsWith('Completed ')) {
      cleanDateString = dateString.substring('Completed '.length);
    } else if (dateString === 'Pending') {
      return null;
    }
    
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
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [tempDateRange, setTempDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

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
  const [commitmentToIssueBadge, setCommitmentToIssueBadge] = useState<Commitment | null>(null); // New state for issuing badge

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

  const [showClarificationSuccessModal, setShowClarificationSuccessModal] = useState(false);
  const [issueBadgeSuccessModalOpen, setIssueBadgeSuccessModalOpen] = useState(false); // New state for issue badge success

  const [makePromiseModalOpen, setMakePromiseModalOpen] = useState(false);
  const [makePromiseModalType, setMakePromiseModalType] = useState<'promise' | 'request'>('promise');

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

  const handleCloseIssueBadgeSuccessModal = useCallback(() => { // New handler
    setIssueBadgeSuccessModalOpen(false);
    setCommitmentToIssueBadge(null);
  }, []);

  const handleApproveBadgeRequest = (commitment: Commitment) => {
    console.log('Approving badge request:', commitment.id);
    setCommitments(prev => prev.filter(c => c.id !== commitment.id));
    setApprovalModalOpen(true);
    setRequesterForApproval(commitment.assignee);
  };

  const handleRejectBadgeRequest = (commitment: Commitment) => {
    console.log('Rejecting badge request:', commitment.id);
    setCommitments(prev => prev.filter(c => c.id !== commitment.id));
    setCommitmentToReject(commitment);
    setRejectBadgeModalOpen(true);
  };

  const handleConfirmRejectBadge = () => {
    console.log('Confirming rejection of badge request:', commitmentToReject?.id);
    setRejectBadgeModalOpen(false);
    setCommitmentToReject(null);
  };

  useEffect(() => {
    setCommitments(tabs[activeTab].items.map(item => ({ ...item, selected: false })));
    setSelectAll(false);
    setExpandedRows(new Set());
    const currentTabLabel = tabs[activeTab].label;
    const disableFiltersForCurrentTab = currentTabLabel === 'Requests to Commit' || currentTabLabel === 'Awaiting Response' || currentTabLabel === 'Active Promises';

    if (disableFiltersForCurrentTab) {
      setDateFilter('All');
      setSortBy('dueDateNewest');
      setSearchTerm('');
      setDateRange([null, null]);
      setTempDateRange([null, null]);
    }

    if (currentTabLabel === 'My Badges' || currentTabLabel === 'Badges Issued') {
      setSortBy('approvedDateNewest');
    } else {
      setSortBy('dueDateNewest');
    }

    setBadgeTableFilter('');
    setCommitmentTextTableFilter('');
    setAssigneeTableFilter('');
    setDueDateTableFilter(null);
    setCommittedDateTableFilter(null);
    setApprovedDateTableFilter(null);
  }, [activeTab, tabs]);

  const isActivePromisesTab = tabs[activeTab].label === 'Active Promises';
  const isMyPromisesTab = tabs[activeTab].label === 'My Promises';
  const isRequestsToCommitTab = tabs[activeTab].label === 'Requests to Commit';
  const isAwaitingResponseTab = tabs[activeTab].label === 'Awaiting Response';
  const isOwedToMe = tabs[activeTab].label === 'Promises Owed to Me';
  const isBadgeRequestsTab = tabs[activeTab].label === 'Badge Requests';
  const isMyBadgesTab = tabs[activeTab].label === 'My Badges';
  const isUnkeptTab = tabs[activeTab].label.includes('Unkept');
  const isBadgesIssuedTab = tabs[activeTab].label === 'Badges Issued';

  const disableAllFiltersExceptSort = isRequestsToCommitTab || isAwaitingResponseTab;

  const allAssignees = tabs.flatMap(tab => tab.items.filter(item => !item.isExternal).map(item => item.assignee));
  const uniquePeople = [...new Set(allAssignees)].filter(name => name !== 'Dev Team Lead');
  const filterOptions = [...uniquePeople, 'Development team'];
  const hasExternal = tabs.some(tab => tab.items.some(item => item.isExternal));

  const processedCommitments = commitments.map(item => ({
    ...item,
    isOverdue: item.isOverdue || (!isUnkeptTab && !isMyBadgesTab && !isBadgesIssuedTab && (parseCommitmentDate(item.dueDate) ? parseCommitmentDate(item.dueDate)!.isBefore(dayjs(), 'day') : false))
  }));

  const currentItems = processedCommitments.filter(item => {
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchTerm.toLowerCase());

    if (!searchMatch) return false;

    const personMatch = (() => {
      if (!personFilter) return true;
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
    const aIsNudge = a.type === 'nudge';
    const bIsNudge = b.type === 'nudge';
    if (aIsNudge && !bIsNudge) return -1;
    if (!aIsNudge && bIsNudge) return 1;

    let effectiveSortBy = sortBy;
    if (sortBy === 'nudges') {
      if (isMyBadgesTab || isBadgesIssuedTab) {
        effectiveSortBy = 'approvedDateNewest';
      } else {
        effectiveSortBy = 'dueDateNewest';
      }
    }

    let dateA, dateB;
    switch (effectiveSortBy) {
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
        return (b.isOverdue ? 1 : 0) - (a.isOverdue ? 1 : 0);
      default:
        return 0;
    }

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    if (effectiveSortBy.includes('Newest')) {
      return dateB.valueOf() - dateA.valueOf();
    } else if (effectiveSortBy.includes('Oldest')) {
      return dateA.valueOf() - dateB.valueOf();
    }
    return 0;
  });

  const paginatedItems = currentItems;

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
  }, [paginatedItems.length, displayMode]);

  const firstItemRef = useRef<HTMLDivElement>(null);
  const [firstItemObservedHeight, setFirstItemObservedHeight] = useState<number | null>(null);

  useEffect(() => {
    if (displayMode === 'table') {
      setContainerContentHeight('auto');
      return;
    }

    if (paginatedItems.length === 0) {
      setContainerContentHeight('250px');
    } else if (firstItemObservedHeight !== null) {
      const cardHeight = firstItemObservedHeight;
      const spacing = 8;

      if (paginatedItems.length === 1) {
        setContainerContentHeight(cardHeight);
      } else {
        setContainerContentHeight((cardHeight * 2) + spacing);
      }
    }
  }, [paginatedItems.length, displayMode, firstItemObservedHeight]);

  const handleViewCommitmentDetails = (item: Commitment) => {
    if (isBadgeRequestsTab) {
      setCommitmentForBadgeRequest(item);
      setBadgeRequestDetailsModalOpen(true);
    } else if (item.type === 'nudge' && (isMyPromisesTab || isRequestsToCommitTab)) {
      setCommitmentForNudgeDetails(item);
      setNudgeDetailsModalOpen(true);
    } else if (isMyBadgesTab || isBadgesIssuedTab) {
      handleViewBadgeDetails(item);
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
    setCommitments(prev => prev.filter(c => c.id !== commitmentToDecline?.id)); // Remove from list
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
    setCommitments(prev => prev.filter(c => c.id !== commitmentToAccept?.id)); // Remove from list
    setCommitmentToAccept(null);
  };

  const handleConfirmBulkDecline = () => {
    console.log('Bulk declining commitments:', selectedCommitments.map(c => c.id));
    const selectedIds = selectedCommitments.map(c => c.id);
    setCommitments(prev => prev.filter(c => !selectedIds.includes(c.id))); // Remove from list
    setBulkDeclineModalOpen(false);
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
    setCommitments(prev => prev.filter(c => c.id !== commitmentToRevoke?.id)); // Remove from list
    setRevokeModalOpen(false);
    setCommitmentToRevoke(null);
  };

  const handleClarifyClick = (item: Commitment) => {
    setCommitmentToClarify(item);
    setClarifyModalOpen(true);
  };

  const handleSendClarification = (message: string) => {
    console.log(`Clarification request for ${commitmentToClarify?.id}: ${message}`);
    setCommitments(prev => prev.filter(c => c.id !== commitmentToClarify?.id)); // Remove from list
    setClarifyModalOpen(false);
    setCommitmentToClarify(null);
    setShowClarificationSuccessModal(true);
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

  // New handlers for Promises Owed to Me actions from details modal
  const handleRejectOwedPromiseFromDetails = () => {
    setModalOpen(false);
    if (commitmentForDetails) {
      handleRejectOwedPromiseClick(commitmentForDetails);
    }
  };

  const handleIssueBadgeFromDetails = () => {
    setModalOpen(false);
    if (commitmentForDetails) {
      handleIssueBadgeClick(commitmentForDetails);
    }
  };

  const handleIssueBadgeClick = (item: Commitment) => { // This is the handler for the list item button
    setCommitmentToIssueBadge(item);
    console.log('Issuing badge for commitment:', item.id);
    setCommitments(prev => prev.filter(c => c.id !== item.id)); // Remove from list
    setIssueBadgeSuccessModalOpen(true);
  };

  const handleRejectOwedPromiseClick = (item: Commitment) => { // This is the handler for the list item button
    setCommitmentToDecline(item); // Reusing commitmentToDecline state
    setIndividualDeclineModalOpen(true); // Reusing individualDeclineModalOpen
  };

  const handleConfirmBulkRevoke = () => {
    console.log('Bulk revoking commitments:', selectedCommitments.map(c => c.id));
    const selectedIds = selectedCommitments.map(c => c.id);
    setCommitments(prev => prev.filter(c => !selectedIds.includes(c.id))); // Remove from list
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
  
  let itemColor = '#ff7043';

  if (title.trim() === "Others' Commitments") {
    itemColor = '#1976d2';
  } else {
    itemColor = '#ff7043';
  }

  if (isUnkeptTab) {
    itemColor = '#4F4F4F';
  }

  const showBulkActionsSection = isActionsPage && paginatedItems.length > 0 && !isUnkeptTab && !isMyBadgesTab;

  const showBulkRequest = isActionsPage && selectedCount > 0 && isMyPromisesTab;
  const showBulkClarify = isActionsPage && selectedCount > 0 && isOwedToMe;
  const showBulkRevoke = isActionsPage && selectedCount > 0 && isAwaitingResponseTab;

  const isOthersCommitmentsSection = title.trim() === "Others' Commitments";

  const handleTableFilterChange = useCallback((filterName: string, value: any) => {
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
  };

  const handleToggleExpandRow = (id: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandableCommitmentIds = currentItems
    .filter(c => (c.type === 'nudge' && c.responses && c.responses.length > 0) || ((isMyBadgesTab || isBadgesIssuedTab) && c.explanation))
    .map(c => c.id);

  const expandedCount = expandedRows.size;
  const totalExpandable = expandableCommitmentIds.length;

  let expandAllState: 'collapsed' | 'expanded' | 'indeterminate' = 'collapsed';
  if (expandedCount === 0) {
    expandAllState = 'collapsed';
  } else if (expandedCount === totalExpandable && totalExpandable > 0) {
    expandAllState = 'expanded';
  } else if (expandedCount > 0) {
    expandAllState = 'indeterminate';
  }

  const handleToggleExpandAll = () => {
    if (expandAllState === 'expanded') {
      setExpandedRows(new Set());
    } else {
      setExpandedRows(new Set(expandableCommitmentIds));
    }
  };

  let expandAllIcon;
  let expandAllLabel = '';

  switch (expandAllState) {
    case 'expanded':
      expandAllIcon = <KeyboardArrowUp fontSize="small" />;
      expandAllLabel = 'Collapse All';
      break;
    case 'indeterminate':
      expandAllIcon = <Remove fontSize="small" />;
      expandAllLabel = 'Some Expanded';
      break;
    case 'collapsed':
    default:
      expandAllIcon = <KeyboardArrowDown fontSize="small" />;
      expandAllLabel = 'Expand All';
      break;
  }

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
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }} disabled={displayMode === 'table' || disableAllFiltersExceptSort}>
              <InputLabel>Person</InputLabel>
              <Select value={personFilter} onChange={(e) => setPersonFilter(e.target.value as string)} label="Person" startAdornment={<InputAdornment position="start"><Person fontSize="small" sx={{ color: (displayMode === 'table' || disableAllFiltersExceptSort) ? 'action.disabled' : 'text.secondary' }} /></InputAdornment>}>
                <MenuItem value="">All</MenuItem>
                {filterOptions.map(person => (
                  <MenuItem key={person} value={person}>{person}</MenuItem>
                ))}
                {hasExternal && <MenuItem value="External">External</MenuItem>}
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }} disabled={displayMode === 'table' || disableAllFiltersExceptSort}>
              <InputLabel>Due Date</InputLabel>
              <Select
                value={dateFilter}
                onChange={handleDateFilterChange}
                label="Due Date"
                startAdornment={
                  <InputAdornment position="start">
                    <CalendarToday fontSize="small" sx={{ color: (displayMode === 'table' || disableAllFiltersExceptSort) ? 'action.disabled' : 'text.secondary' }} />
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
                disabled={displayMode === 'table' || disableAllFiltersExceptSort}
              />
            )}

            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as string)} label="Sort By" startAdornment={
                <InputAdornment position="start">
                  <ArrowUpward fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              }>
                {isMyBadgesTab || isBadgesIssuedTab ? (
                  [
                    <MenuItem key="approvedDateNewest" value="approvedDateNewest">Approved Date (Newest First)</MenuItem>,
                    <MenuItem key="approvedDateOldest" value="approvedDateOldest">Approved Date (Oldest First)</MenuItem>,
                    <MenuItem key="committedDateNewest" value="committedDateNewest">Committed Date (Newest First)</MenuItem>,
                    <MenuItem key="committedDateOldest" value="committedDateOldest">Committed Date (Oldest First)</MenuItem>,
                    <MenuItem key="overdue" value="overdue">Overdue</MenuItem>,
                    <MenuItem key="nudges" value="nudges">Nudges</MenuItem>
                  ]
                ) : (
                  [
                    <MenuItem key="dueDateNewest" value="dueDateNewest">Due Date (Newest First)</MenuItem>,
                    <MenuItem key="dueDateOldest" value="dueDateOldest">Due Date (Oldest First)</MenuItem>,
                    <MenuItem key="committedDateNewest" value="committedDateNewest">Committed Date (Newest First)</MenuItem>,
                    <MenuItem key="committedDateOldest" value="committedDateOldest">Committed Date (Oldest First)</MenuItem>,
                    <MenuItem key="overdue" value="overdue">Overdue</MenuItem>,
                    <MenuItem key="nudges" value="nudges">Nudges</MenuItem>
                  ]
                )}
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: 1, borderColor: 'divider', mb: 1 }}>
          <Tabs value={activeTab} onChange={(_: React.SyntheticEvent, newValue: number) => setActiveTab(newValue)} sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 }, '& .Mui-selected': { color: 'primary.main' } }}>
            {tabs.map((tab, _index) => <Tab key={_index} label={`${tab.label} (${tab.count})`} />)}
          </Tabs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            {totalExpandable > 0 && (
              <Button
                size="small"
                startIcon={expandAllIcon}
                onClick={handleToggleExpandAll}
                sx={{ textTransform: 'none', color: 'text.secondary', mr: 1 }}
              >
                {expandAllLabel}
              </Button>
            )}
            {onToggleDisplayMode && (
              <FormControlLabel
                control={
                  <Switch
                    checked={displayMode === 'table'}
                    onChange={() => onToggleDisplayMode(displayMode === 'table' ? 'regular' : 'table')}
                    sx={{
                      '& .MuiSwitch-switchBase': {
                        color: '#ff7043',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#1976d2',
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: '#e0e0e0',
                      },
                      '& .MuiSwitch-thumb': {
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      },
                    }}
                  />
                }
                label={displayMode === 'table' ? 'Table Mode' : 'Regular Mode'}
                labelPlacement="start"
                sx={{ m: 0 }}
              />
            )}
            {showClearAllFilters && (
              <Button
                onClick={handleClearAllFilters}
                sx={{
                  textTransform: 'capitalize',
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
                Clear All Filters
              </Button>
            )}
          </Box>
        </Box>

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
          height: containerContentHeight,
          minHeight: 0,
          pr: displayMode === 'table' ? 0 : 1,
          overflowY: displayMode === 'table' ? 'visible' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: paginatedItems.length === 0 ? 'center' : 'flex-start',
          alignItems: paginatedItems.length === 0 ? 'center' : 'stretch',
        }}>
          {displayMode === 'table' ? (
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
                isMyBadgesTab={isMyBadgesTab}
                isBadgesIssuedTab={isBadgesIssuedTab}
                isUnkeptTab={isUnkeptTab}
                itemColor={itemColor}
                expandedRows={expandedRows}
                onToggleExpand={handleToggleExpandRow}
              />
            </Box>
          ) : (
            <Stack spacing={1} sx={{ width: '100%', mt: 1 }}>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item, _index) => {
                  const isNudgeItem = item.type === 'nudge';
                  const showCheckboxes = isActionsPage && !isMyBadgesTab && !isUnkeptTab;
                  const isCheckboxDisabled = isActionsPage ? (isMyPromisesTab && isNudgeItem) : isActivePromisesTab; 
                  
                  const hideDueDate = isRequestsToCommitTab || isAwaitingResponseTab || isBadgeRequestsTab;
                  const showRevokeButton = isAwaitingResponseTab;
                  
                  let showActionButtonForListItem = isActionsPage && (
                    (isNudgeItem && isMyPromisesTab) || 
                    (!isMyBadgesTab && !isUnkeptTab && !isRequestsToCommitTab && !isAwaitingResponseTab && !isBadgeRequestsTab && !isOwedToMe) // Exclude isOwedToMe here
                  );
                  if (isCommitmentPortfolioPage && isActivePromisesTab) {
                      showActionButtonForListItem = false;
                  }

                  const showFromLabel = isRequestsToCommitTab || isOwedToMe || isBadgeRequestsTab || isUnkeptTab;

                  return (
                    <CommitmentListItem
                      key={item.id}
                      {...item}
                      ref={_index === 0 ? firstItemRef : null}
                      color={itemColor}
                      showCheckbox={showCheckboxes}
                      isCheckboxDisabled={isCheckboxDisabled}
                      showActionButton={showActionButtonForListItem}
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
                      isMyBadgesTab={isMyBadgesTab}
                      isBadgesIssuedTab={isBadgesIssuedTab}
                      isExternal={item.isExternal}
                      isOverdue={item.isOverdue}
                      showRevokeButton={showRevokeButton}
                      onRevoke={() => handleRevokeClick(item)}
                      showFromLabel={showFromLabel}
                      explanation={item.explanation}
                      responses={item.responses}
                      showBadgePlaceholder={isMyBadgesTab || isActivePromisesTab || isBadgesIssuedTab || isOwedToMe}
                      approvedDate={item.approvedDate}
                      isExpanded={expandedRows.has(item.id)}
                      onToggleExpand={() => handleToggleExpandRow(item.id)}
                      isActionsPage={isActionsPage}
                      isOthersCommitmentsSection={isOthersCommitmentsSection}
                      // Pass new props for Promises Owed to Me buttons
                      showClarifyButton={isOwedToMe}
                      onClarify={() => handleClarifyClick(item)}
                      showRejectButton={isOwedToMe}
                      onReject={() => handleRejectOwedPromiseClick(item)}
                      showIssueBadgeButton={isOwedToMe}
                      onIssueBadge={() => handleIssueBadgeClick(item)}
                    />
                  );
                })
              ) : (
                <Box sx={{ 
                  textAlign: 'center', 
                  color: 'text.secondary', 
                  width: '100%',
                  flex: 1,
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
        // Pass new handlers for Promises Owed to Me from details modal
        onRejectRequestClick={handleRejectOwedPromiseFromDetails}
        onIssueBadgeClick={handleIssueBadgeFromDetails}
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
          approvalDate: selectedBadge.approvedDate || 'N/A',
          originalDueDate: selectedBadge.dueDate,
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
        open={showClarificationSuccessModal}
        onClose={handleCloseClarificationSuccessModal}
        title="Request Sent!"
        message="The clarification request has been sent."
      />
      <SuccessConfirmationModal // New modal for Issue Badge success
        open={issueBadgeSuccessModalOpen}
        onClose={handleCloseIssueBadgeSuccessModal}
        title="Badge Issued!"
        message={`${commitmentToIssueBadge?.assignee || 'The user'} has been notified.`}
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

      <CommitmentActionModal
        open={makePromiseModalOpen}
        onClose={handleCloseMakePromiseModal}
        type={makePromiseModalType}
      />
    </>
  );
};

export default CommitmentsSection;