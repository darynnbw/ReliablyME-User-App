import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  useTheme,
  styled,
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

const Resizer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '5px',
  height: '100%',
  cursor: 'col-resize',
  userSelect: 'none',
  zIndex: 10,
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const CommitmentsTable: React.FC<CommitmentsTableProps> = ({
  commitments,
  filters,
  onFilterChange,
  badgeOptions,
  assigneeOptions,
}) => {
  const theme = useTheme();
  const [badgeAnchorEl, setBadgeAnchorEl] = useState<null | HTMLElement>(null);
  const [assigneeAnchorEl, setAssigneeAnchorEl] = useState<null | HTMLElement>(null);
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [committedDateOpen, setCommittedDateOpen] = useState(false);

  const [columnWidths, setColumnWidths] = useState([150, 350, 150, 180, 180]);
  const isResizing = useRef<number | null>(null);
  const startX = useRef(0);
  const startWidths = useRef<number[]>([]);

  const badgeCellRef = useRef<HTMLTableCellElement>(null);
  const assigneeCellRef = useRef<HTMLTableCellElement>(null);
  const dueDateButtonRef = useRef<HTMLButtonElement>(null);
  const committedDateButtonRef = useRef<HTMLButtonElement>(null);

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    isResizing.current = index;
    startX.current = e.clientX;
    startWidths.current = [...columnWidths];
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing.current === null) return;

    const delta = e.clientX - startX.current;
    const newWidths = [...startWidths.current];
    const minWidth = 80;

    const currentWidth = newWidths[isResizing.current];
    const nextWidth = newWidths[isResizing.current + 1];

    if (currentWidth + delta > minWidth && nextWidth - delta > minWidth) {
      newWidths[isResizing.current] = currentWidth + delta;
      newWidths[isResizing.current + 1] = nextWidth - delta;
      setColumnWidths(newWidths);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = null;
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleBadgeMenuOpen = () => {
    setBadgeAnchorEl(badgeCellRef.current);
  };
  const handleBadgeMenuClose = () => {
    setBadgeAnchorEl(null);
  };
  const handleBadgeSelect = (value: string) => {
    onFilterChange('badge', value);
    handleBadgeMenuClose();
  };

  const handleAssigneeMenuOpen = () => {
    setAssigneeAnchorEl(assigneeCellRef.current);
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
    setDueDateOpen(false);
  };

  const handleCommittedDateChange = (newValue: Dayjs | null) => {
    onFilterChange('committedDate', newValue);
    setCommittedDateOpen(false);
  };

  const badgeIconColor = filters.badge ? theme.palette.primary.main : 'text.secondary';
  const assigneeIconColor = filters.assignee ? theme.palette.primary.main : 'text.secondary';
  const dueDateIconColor = filters.dueDate ? theme.palette.primary.main : 'text.secondary';
  const committedDateIconColor = filters.committedDate ? theme.palette.primary.main : 'text.secondary';

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e8eaed', borderRadius: 3 }}>
      <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="commitments table">
        <TableHead sx={{ bgcolor: 'grey.50' }}>
          <TableRow>
            <TableCell ref={badgeCellRef} sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap', width: columnWidths[0], position: 'relative', borderRight: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Badge
                <IconButton size="small" onClick={handleBadgeMenuOpen} aria-label="filter by badge">
                  <ArrowDropDown fontSize="small" sx={{ color: badgeIconColor }} />
                </IconButton>
                <Menu
                  anchorEl={badgeAnchorEl}
                  open={Boolean(badgeAnchorEl)}
                  onClose={handleBadgeMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  PaperProps={{
                    sx: { minWidth: badgeCellRef.current ? badgeCellRef.current.offsetWidth : 'auto' }
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
              <Resizer onMouseDown={handleMouseDown(0)} />
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap', width: columnWidths[1], position: 'relative', borderRight: '1px solid #e0e0e0' }}>
              Original Commitment
              <Resizer onMouseDown={handleMouseDown(1)} />
            </TableCell>
            <TableCell ref={assigneeCellRef} sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap', width: columnWidths[2], position: 'relative', borderRight: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Assignee
                <IconButton size="small" onClick={handleAssigneeMenuOpen} aria-label="filter by assignee">
                  <ArrowDropDown fontSize="small" sx={{ color: assigneeIconColor }} />
                </IconButton>
                <Menu
                  anchorEl={assigneeAnchorEl}
                  open={Boolean(assigneeAnchorEl)}
                  onClose={handleAssigneeMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  PaperProps={{
                    sx: { minWidth: assigneeCellRef.current ? assigneeCellRef.current.offsetWidth : 'auto' }
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
              <Resizer onMouseDown={handleMouseDown(2)} />
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap', width: columnWidths[3], position: 'relative', borderRight: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Due Date
                <IconButton ref={dueDateButtonRef} size="small" onClick={() => setDueDateOpen(true)} aria-label="filter by due date">
                  <CalendarToday fontSize="small" sx={{ color: dueDateIconColor }} />
                </IconButton>
                <DatePicker
                  label="Due Date"
                  open={dueDateOpen}
                  onClose={() => setDueDateOpen(false)}
                  value={filters.dueDate}
                  onChange={handleDueDateChange}
                  slotProps={{
                    textField: {
                      style: { display: 'none' }
                    },
                    popper: {
                      placement: 'bottom-start',
                      anchorEl: dueDateButtonRef.current,
                    }
                  }}
                />
              </Box>
              <Resizer onMouseDown={handleMouseDown(3)} />
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap', width: columnWidths[4], position: 'relative' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Committed Date
                <IconButton ref={committedDateButtonRef} size="small" onClick={() => setCommittedDateOpen(true)} aria-label="filter by committed date">
                  <CalendarToday fontSize="small" sx={{ color: committedDateIconColor }} />
                </IconButton>
                <DatePicker
                  label="Committed Date"
                  open={committedDateOpen}
                  onClose={() => setCommittedDateOpen(false)}
                  value={filters.committedDate}
                  onChange={handleCommittedDateChange}
                  slotProps={{
                    textField: {
                      style: { display: 'none' }
                    },
                    popper: {
                      placement: 'bottom-start',
                      anchorEl: committedDateButtonRef.current,
                    }
                  }}
                />
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commitments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: 'center', color: 'text.secondary', py: 4, border: 'none' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>No data to display in table.</Typography>
                <Typography variant="body1">Adjust your filters or switch to Regular Mode.</Typography>
              </TableCell>
            </TableRow>
          ) : (
            commitments.map((commitment) => (
              <TableRow
                key={commitment.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row" sx={{ borderRight: '1px solid #e0e0e0' }}>
                  {commitment.title}
                </TableCell>
                <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>{commitment.description}</TableCell>
                <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>{commitment.assignee}</TableCell>
                <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>{commitment.dueDate}</TableCell>
                <TableCell>{commitment.committedDate || 'N/A'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommitmentsTable;