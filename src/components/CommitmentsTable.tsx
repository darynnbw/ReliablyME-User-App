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

const headers = [
  { id: 'badge', label: 'Badge' },
  { id: 'commitment', label: 'Original Commitment' },
  { id: 'assignee', label: 'Assignee' },
  { id: 'dueDate', label: 'Due Date' },
  { id: 'committedDate', label: 'Committed Date' },
];

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

  const [colWidths, setColWidths] = useState([20, 35, 15, 15, 15]);
  const tableRef = useRef<HTMLTableElement>(null);
  const activeIndex = useRef<number | null>(null);

  const badgeCellRef = useRef<HTMLTableCellElement>(null);
  const assigneeCellRef = useRef<HTMLTableCellElement>(null);
  const dueDateButtonRef = useRef<HTMLButtonElement>(null);
  const committedDateButtonRef = useRef<HTMLButtonElement>(null);

  const handleMouseDown = useCallback((index: number) => (_e: React.MouseEvent) => {
    activeIndex.current = index;
    document.body.style.cursor = 'col-resize';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (activeIndex.current === null || !tableRef.current) return;

    const tableWidth = tableRef.current.offsetWidth;
    const deltaPercent = (e.movementX / tableWidth) * 100;

    setColWidths(prev => {
      const newWidths = [...prev];
      const currentWidth = newWidths[activeIndex.current!];
      const nextWidth = newWidths[activeIndex.current! + 1];

      const minWidthPercent = (140 / tableWidth) * 100; // Set a larger minimum width

      if (currentWidth + deltaPercent < minWidthPercent || nextWidth - deltaPercent < minWidthPercent) {
        return prev;
      }

      newWidths[activeIndex.current!] += deltaPercent;
      newWidths[activeIndex.current! + 1] -= deltaPercent;
      return newWidths;
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    activeIndex.current = null;
    document.body.style.cursor = 'default';
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (activeIndex.current !== null) {
        handleMouseMove(e);
      }
    };
    const handleGlobalMouseUp = () => {
      if (activeIndex.current !== null) {
        handleMouseUp();
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleBadgeMenuOpen = () => setBadgeAnchorEl(badgeCellRef.current);
  const handleBadgeMenuClose = () => setBadgeAnchorEl(null);
  const handleBadgeSelect = (value: string) => {
    onFilterChange('badge', value);
    handleBadgeMenuClose();
  };

  const handleAssigneeMenuOpen = () => setAssigneeAnchorEl(assigneeCellRef.current);
  const handleAssigneeMenuClose = () => setAssigneeAnchorEl(null);
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

  const cellSx = (index: number) => ({
    borderRight: index < headers.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  });

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e8eaed', borderRadius: 3 }}>
      <Table ref={tableRef} sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="commitments table">
        <TableHead sx={{ bgcolor: 'grey.50' }}>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell
                key={header.id}
                ref={header.id === 'badge' ? badgeCellRef : (header.id === 'assignee' ? assigneeCellRef : null)}
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  width: `${colWidths[index]}%`,
                  borderRight: index < headers.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {header.label}
                  {header.id === 'badge' && (
                    <IconButton size="small" onClick={handleBadgeMenuOpen} aria-label="filter by badge">
                      <ArrowDropDown fontSize="small" sx={{ color: badgeIconColor }} />
                    </IconButton>
                  )}
                  {header.id === 'assignee' && (
                    <IconButton size="small" onClick={handleAssigneeMenuOpen} aria-label="filter by assignee">
                      <ArrowDropDown fontSize="small" sx={{ color: assigneeIconColor }} />
                    </IconButton>
                  )}
                  {header.id === 'dueDate' && (
                    <IconButton ref={dueDateButtonRef} size="small" onClick={() => setDueDateOpen(true)} aria-label="filter by due date">
                      <CalendarToday fontSize="small" sx={{ color: dueDateIconColor }} />
                    </IconButton>
                  )}
                  {header.id === 'committedDate' && (
                    <IconButton ref={committedDateButtonRef} size="small" onClick={() => setCommittedDateOpen(true)} aria-label="filter by committed date">
                      <CalendarToday fontSize="small" sx={{ color: committedDateIconColor }} />
                    </IconButton>
                  )}
                </Box>
                {index < headers.length - 1 && (
                  <Box
                    onMouseDown={handleMouseDown(index)}
                    sx={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      height: '100%',
                      width: '5px',
                      cursor: 'col-resize',
                      userSelect: 'none',
                      zIndex: 1,
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  />
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {commitments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>No data to display in table.</Typography>
                <Typography variant="body1">Adjust your filters or switch to Regular Mode.</Typography>
              </TableCell>
            </TableRow>
          ) : (
            commitments.map((commitment, rowIndex) => (
              <TableRow
                key={commitment.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  bgcolor: rowIndex % 2 === 0 ? 'background.paper' : 'grey.50',
                }}
              >
                <TableCell sx={cellSx(0)}>{commitment.title}</TableCell>
                <TableCell sx={cellSx(1)}>{commitment.description}</TableCell>
                <TableCell sx={cellSx(2)}>{commitment.assignee}</TableCell>
                <TableCell sx={cellSx(3)}>{commitment.dueDate}</TableCell>
                <TableCell sx={cellSx(4)}>{commitment.committedDate || 'N/A'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {/* Filter Menus and Date Pickers */}
      <Menu
        anchorEl={badgeAnchorEl}
        open={Boolean(badgeAnchorEl)}
        onClose={handleBadgeMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { minWidth: badgeCellRef.current ? badgeCellRef.current.offsetWidth : 'auto' } }}
      >
        <MenuItem onClick={() => handleBadgeSelect('')} selected={filters.badge === ''}>All</MenuItem>
        {badgeOptions.map((option) => (
          <MenuItem key={option} onClick={() => handleBadgeSelect(option)} selected={filters.badge === option}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={assigneeAnchorEl}
        open={Boolean(assigneeAnchorEl)}
        onClose={handleAssigneeMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { minWidth: assigneeCellRef.current ? assigneeCellRef.current.offsetWidth : 'auto' } }}
      >
        <MenuItem onClick={() => handleAssigneeSelect('')} selected={filters.assignee === ''}>All</MenuItem>
        {assigneeOptions.map((option) => (
          <MenuItem key={option} onClick={() => handleAssigneeSelect(option)} selected={filters.assignee === option}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <DatePicker
        open={dueDateOpen}
        onClose={() => setDueDateOpen(false)}
        value={filters.dueDate}
        onChange={handleDueDateChange}
        slotProps={{
          textField: { style: { display: 'none' } },
          popper: { placement: 'bottom-start', anchorEl: dueDateButtonRef.current },
        }}
      />
      <DatePicker
        open={committedDateOpen}
        onClose={() => setCommittedDateOpen(false)}
        value={filters.committedDate}
        onChange={handleCommittedDateChange}
        slotProps={{
          textField: { style: { display: 'none' } },
          popper: { placement: 'bottom-start', anchorEl: committedDateButtonRef.current },
        }}
      />
    </TableContainer>
  );
};

export default CommitmentsTable;