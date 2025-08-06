import { useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

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
  isExternal?: boolean;
  explanation?: string;
  isOverdue?: boolean;
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
  } catch (error) {
    return null;
  }
};

const groupMembers: { [key: string]: string[] } = {
  'Development team': ['Alex Johnson', 'Chris Parker'],
};

export const useCommitmentFilters = (
  commitments: Commitment[],
  filters: {
    personFilter: string;
    dateFilter: string;
    searchTerm: string;
    dateRange: [Dayjs | null, Dayjs | null];
    sortBy: string;
    displayMode: 'regular' | 'table';
    badgeTableFilter: string;
    commitmentTextTableFilter: string;
    assigneeTableFilter: string;
    dueDateTableFilter: Dayjs | null;
    committedDateTableFilter: Dayjs | null;
    approvedDateTableFilter: Dayjs | null;
  },
  isUnkeptTab: boolean,
  isMyBadgesTab: boolean,
  isBadgesIssuedTab: boolean,
  disableActivePromisesFiltersInTable: boolean
) => {
  return useMemo(() => {
    const processedCommitments = commitments.map(item => ({
      ...item,
      isOverdue: item.isOverdue || (!isUnkeptTab && !isMyBadgesTab && !isBadgesIssuedTab && (parseCommitmentDate(item.dueDate) ? parseCommitmentDate(item.dueDate)!.isBefore(dayjs(), 'day') : false))
    }));

    const filtered = processedCommitments.filter(item => {
      const searchMatch = item.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.assignee.toLowerCase().includes(filters.searchTerm.toLowerCase());
      if (!searchMatch && !disableActivePromisesFiltersInTable) return false;

      const personMatch = (() => {
        if (!filters.personFilter) return true;
        if (filters.personFilter === 'External') return item.isExternal === true;
        if (filters.personFilter === 'Development team') {
          return groupMembers['Development team'].includes(item.assignee);
        }
        return item.assignee === filters.personFilter;
      })();
      if (!personMatch && !disableActivePromisesFiltersInTable) return false;

      const itemDate = parseCommitmentDate(item.dueDate);
      let dateMatch = true;
      if (filters.dateFilter === 'Custom Range' && filters.dateRange[0] && filters.dateRange[1] && itemDate) {
        dateMatch = !itemDate.isBefore(filters.dateRange[0], 'day') && !itemDate.isAfter(filters.dateRange[1], 'day');
      } else if (filters.dateFilter === 'Today') {
        dateMatch = itemDate ? itemDate.isSame(dayjs(), 'day') : false;
      } else if (filters.dateFilter === 'This Week') {
        dateMatch = itemDate ? itemDate.isBetween(dayjs().startOf('week'), dayjs().endOf('week'), null, '[]') : false;
      }
      if (!dateMatch && !disableActivePromisesFiltersInTable) return false;

      if (filters.displayMode === 'table') {
        if (filters.badgeTableFilter && item.title !== filters.badgeTableFilter) return false;
        if (filters.commitmentTextTableFilter && !item.description.toLowerCase().includes(filters.commitmentTextTableFilter.toLowerCase())) return false;
        if (filters.assigneeTableFilter && item.assignee !== filters.assigneeTableFilter) return false;
        
        const itemDueDate = parseCommitmentDate(item.dueDate);
        if (filters.dueDateTableFilter && itemDueDate && !itemDueDate.isSame(filters.dueDateTableFilter, 'day')) return false;

        const itemCommittedDate = item.committedDate ? parseCommitmentDate(item.committedDate) : null;
        if (filters.committedDateTableFilter && itemCommittedDate && !itemCommittedDate.isSame(filters.committedDateTableFilter, 'day')) return false;

        const itemApprovedDate = item.approvedDate ? dayjs(item.approvedDate, 'MMM D, YYYY, hh:mm A') : null;
        if (filters.approvedDateTableFilter && itemApprovedDate && !itemApprovedDate.isSame(filters.approvedDateTableFilter, 'day')) return false;
      }

      return true;
    });

    return filtered.sort((a, b) => {
      let dateA, dateB;
      switch (filters.sortBy) {
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

      if (filters.sortBy.includes('Newest')) {
        return dateB.valueOf() - dateA.valueOf();
      } else if (filters.sortBy.includes('Oldest')) {
        return dateA.valueOf() - dateB.valueOf();
      }
      return 0;
    });
  }, [commitments, filters, isUnkeptTab, isMyBadgesTab, isBadgesIssuedTab, disableActivePromisesFiltersInTable]);
};