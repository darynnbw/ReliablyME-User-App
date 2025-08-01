import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { CalendarToday, ArrowDropDown } from '@mui/icons-material';

interface Commitment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  committedDate?: string;
  type?: string;
  nudgesLeft?: number;
  totalNudges?: number;
  isExternal?: boolean;
  questions?: string[];
  explanation?: string;
}

interface CommitmentsTableProps {
  commitments: Commitment[];
  filters: {
    badge: string;
    commitmentText: string;
    assignee: string;
    dueDate: Dayjs | null;
    committedDate: Dayjs | null;
  };
  onFilterChange: (filterName: string, value: any) => void;
  badgeOptions: string[];
  assigneeOptions: string[];
}

const CommitmentsTable: React.FC<CommitmentsTableProps> = ({
  commitments,
  filters,
  onFilterChange,
  badgeOptions,
  assigneeOptions,
}) => {
  // State for dropdown/datepicker anchors
  const [badgeAnchorEl, setBadgeAnchorEl] = useState<null | HTMLElement>(null);
  const [assigneeAnchorEl, setAssigneeAnchorEl] = useState<null | HTMLElement>(null);
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [committedDateOpen, setCommittedDateOpen] = useState(false);

  const handleBadgeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setBadgeAnchorEl(event.currentTarget);
  };
  const handleBadgeMenuClose = () => {
    setBadgeAnchorEl(null);
  };
  const handleBadgeSelect = (value: string) => {
    onFilterChange('badge', value);
    handleBadgeMenuClose();
  };

  const handleAssigneeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAssigneeAnchorEl(event.currentTarget);
  };
  const handleAssigneeMenuClose = () => {
    setAssigneeAnchorEl(null);
  };
  const handleAssigneeSelect = (value: string) => {
    onFilterChange('assignee', value);
    handleAssigneeMenuClose();
  };

  const handleDueDateChange = (newValue: Dayjs | null) => {
    onFilterChange('dueDate', newValue);
    setDueDateOpen(false); // Close after selection
  };

  const handleCommittedDateChange = (newValue: Dayjs | null) => {
    onFilterChange('committedDate', newValue);
    setCommittedDateOpen(false); // Close after selection
  };

  if (commitments.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>No data to display in table.</Typography>
        <Typography variant="body1">Adjust your filters or switch to Regular Mode.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e8eaed', borderRadius: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="commitments table">
        <TableHead sx={{ bgcolor: 'grey.50' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Badge
                <IconButton size="small" onClick={handleBadgeMenuOpen} aria-label="filter by badge">
                  <ArrowDropDown fontSize="small" />
                </IconButton>
                <Menu
                  anchorEl={badgeAnchorEl}
                  open={Boolean(badgeAnchorEl)}
                  onClose={handleBadgeMenuClose}
                  PaperProps={{
                    sx: { minWidth: badgeAnchorEl ? badgeAnchorEl.offsetWidth : 'auto' }
                  }}
                >
                  <MenuItem onClick={() => handleBadgeSelect('')} selected={filters.badge === ''}>All</MenuItem>
                  {badgeOptions.map((option) => (
                    <MenuItem key={option} onClick={() => handleBadgeSelect(option)} selected={filters.badge === option}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              Original Commitment
              {/* No filter for this column as per request */}
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Assignee
                <IconButton size="small" onClick={handleAssigneeMenuOpen} aria-label="filter by assignee">
                  <ArrowDropDown fontSize="small" />
                </IconButton>
                <Menu
                  anchorEl={assigneeAnchorEl}
                  open={Boolean(assigneeAnchorEl)}
                  onClose={handleAssigneeMenuClose}
                  PaperProps={{
                    sx: { minWidth: assigneeAnchorEl ? assigneeAnchorEl.offsetWidth : 'auto' }
                  }}
                >
                  <MenuItem onClick={() => handleAssigneeSelect('')} selected={filters.assignee === ''}>All</MenuItem>
                  {assigneeOptions.map((option) => (
                    <MenuItem key={option} onClick={() => handleAssigneeSelect(option)} selected={filters.assignee === option}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Due Date
                <IconButton size="small" onClick={() => setDueDateOpen(true)} aria-label="filter by due date">
                  <CalendarToday fontSize="small" />
                </IconButton>
                <DatePicker
                  label="Due Date"
                  open={dueDateOpen}
                  onClose={() => setDueDateOpen(false)}
                  value={filters.dueDate}
                  onChange={handleDueDateChange}
                  slotProps={{
                    textField: {
                      style: { display: 'none' } // Hide the text field, only show icon button
                    },
                    popper: {
                      placement: 'bottom-start',
                    }
                  }}
                />
              </Box>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Committed Date
                <IconButton size="small" onClick={() => setCommittedDateOpen(true)} aria-label="filter by committed date">
                  <CalendarToday fontSize="small" />
                </IconButton>
                <DatePicker
                  label="Committed Date"
                  open={committedDateOpen}
                  onClose={() => setCommittedDateOpen(false)}
                  value={filters.committedDate}
                  onChange={handleCommittedDateChange}
                  slotProps={{
                    textField: {
                      style: { display: 'none' } // Hide the text field, only show icon button
                    },
                    popper: {
                      placement: 'bottom-start',
                    }
                  }}
                />
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commitments.map((commitment, index) => (
            <TableRow
              key={commitment.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                bgcolor: index % 2 === 0 ? 'background.paper' : 'grey.50', // Striped rows
              }}
            >
              <TableCell component="th" scope="row">
                {commitment.title}
              </TableCell>
              <TableCell>{commitment.description}</TableCell>
              <TableCell>{commitment.assignee}</TableCell>
              <TableCell>{commitment.dueDate}</TableCell>
              <TableCell>{commitment.committedDate || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommitmentsTable;