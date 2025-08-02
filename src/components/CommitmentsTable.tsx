import React, { useState, useRef } from 'react';
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

const Resizer = ({ onMouseDown }: { onMouseDown: (e: React.MouseEvent) => void }) => (
  <Box
    onMouseDown={onMouseDown}
    sx={{
      position: 'absolute',
      right: 0,
      top: 0,
      height: '100%',
      width: '5px',
      cursor: 'col-resize',
      userSelect: 'none', // Prevent text selection during drag
      zIndex: 1,
      '&:hover': {
        backgroundColor: 'primary.light',
        opacity: 0.5,
      },
    }}
  />
);

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

  const [columnWidths, setColumnWidths] = useState({
    badge: 150,
    commitment: 350,
    assignee: 150,
    dueDate: 150,
    committedDate: 150,
  });

  const badgeCellRef = useRef<HTMLTableCellElement>(null);
  const assigneeCellRef = useRef<HTMLTableCellElement>(null);
  const dueDateButtonRef = useRef<HTMLButtonElement>(null);
  const committedDateButtonRef = useRef<HTMLButtonElement>(null);

  const handleMouseDown = (e: React.MouseEvent, column: keyof typeof columnWidths) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[column];

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      if (newWidth > 80) { // Set a minimum width for columns
        setColumnWidths(prev => ({ ...prev, [column]: newWidth }));
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

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

  const headerCellSx = {
    fontWeight: 'bold',
    color: 'text.primary',
    whiteSpace: 'nowrap',
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'relative',
  };

  const bodyCellSx = {
    borderRight: `1px solid ${theme.palette.divider}`,
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e8eaed', borderRadius: 3 }}>
      <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="commitments table">
        <TableHead sx={{ bgcolor: 'grey.50' }}>
          <TableRow>
            <TableCell ref={badgeCellRef} sx={{ ...headerCellSx, width: columnWidths.badge }}>
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
                  PaperProps={{ sx: { minWidth: badgeCellRef.current ? badgeCellRef.current.offsetWidth : 'auto' } }}
                >
                  <MenuItem onClick={() => handleBadgeSelect('')} selected={filters.badge === ''}>All</MenuItem>
                  {badgeOptions.map((option) => (
                    <MenuItem key={option} onClick={() => handleBadgeSelect(option)} selected={filters.badge === option}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Resizer onMouseDown={(e) => handleMouseDown(e, 'badge')} />
            </TableCell>
            <TableCell sx={{ ...headerCellSx, width: columnWidths.commitment }}>
              Original Commitment
              <Resizer onMouseDown={(e) => handleMouseDown(e, 'commitment')} />
            </TableCell>
            <TableCell ref={assigneeCellRef} sx={{ ...headerCellSx, width: columnWidths.assignee }}>
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
                  PaperProps={{ sx: { minWidth: assigneeCellRef.current ? assigneeCellRef.current.offsetWidth : 'auto' } }}
                >
                  <MenuItem onClick={() => handleAssigneeSelect('')} selected={filters.assignee === ''}>All</MenuItem>
                  {assigneeOptions.map((option) => (
                    <MenuItem key={option} onClick={() => handleAssigneeSelect(option)} selected={filters.assignee === option}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Resizer onMouseDown={(e) => handleMouseDown(e, 'assignee')} />
            </TableCell>
            <TableCell sx={{ ...headerCellSx, width: columnWidths.dueDate }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Due Date
                <IconButton ref={dueDateButtonRef} size="small" onClick={() => setDueDateOpen(true)} aria-label="filter by due date">
                  <CalendarToday fontSize="small" sx={{ color: dueDateIconColor }} />
                </IconButton>
                <DatePicker
                  open={dueDateOpen}
                  onClose={() => setDueDateOpen(false)}
                  value={filters.dueDate}
                  onChange={handleDueDateChange}
                  slotProps={{ textField: { style: { display: 'none' } }, popper: { placement: 'bottom-start', anchorEl: dueDateButtonRef.current } }}
                />
              </Box>
              <Resizer onMouseDown={(e) => handleMouseDown(e, 'dueDate')} />
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap', width: columnWidths.committedDate }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Committed Date
                <IconButton ref={committedDateButtonRef} size="small" onClick={() => setCommittedDateOpen(true)} aria-label="filter by committed date">
                  <CalendarToday fontSize="small" sx={{ color: committedDateIconColor }} />
                </IconButton>
                <DatePicker
                  open={committedDateOpen}
                  onClose={() => setCommittedDateOpen(false)}
                  value={filters.committedDate}
                  onChange={handleCommittedDateChange}
                  slotProps={{ textField: { style: { display: 'none' } }, popper: { placement: 'bottom-start', anchorEl: committedDateButtonRef.current } }}
                />
              </Box>
            </TableCell>
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
            commitments.map((commitment, index) => (
              <TableRow
                key={commitment.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  bgcolor: index % 2 === 0 ? 'background.paper' : 'grey.50',
                }}
              >
                <TableCell component="th" scope="row" sx={bodyCellSx}>
                  {commitment.title}
                </TableCell>
                <TableCell sx={bodyCellSx}>{commitment.description}</TableCell>
                <TableCell sx={bodyCellSx}>{commitment.assignee}</TableCell>
                <TableCell sx={bodyCellSx}>{commitment.dueDate}</TableCell>
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