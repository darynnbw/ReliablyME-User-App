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

  const badgeCellRef = useRef<HTMLTableCellElement>(null);
  const assigneeCellRef = useRef<HTMLTableCellElement>(null);
  const dueDateButtonRef = useRef<HTMLButtonElement>(null);
  const committedDateButtonRef = useRef<HTMLButtonElement>(null);

  // --- Column Resizing State and Logic ---
  const [columnWidths, setColumnWidths] = useState([180, 350, 180, 180, 180]);
  const [resizingColumnIndex, setResizingColumnIndex] = useState<number | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidths, setStartWidths] = useState<number[]>([]);

  const handleMouseDown = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setResizingColumnIndex(index);
    setStartX(event.clientX);
    setStartWidths([...columnWidths]);
  };

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (resizingColumnIndex === null) return;

    const deltaX = event.clientX - startX;
    const newWidths = [...startWidths];
    
    if (resizingColumnIndex < newWidths.length - 1) {
      const currentWidth = startWidths[resizingColumnIndex];
      const nextWidth = startWidths[resizingColumnIndex + 1];

      const newCurrentWidth = currentWidth + deltaX;
      const newNextWidth = nextWidth - deltaX;

      // Apply min width constraint
      if (newCurrentWidth > 80 && newNextWidth > 80) {
        newWidths[resizingColumnIndex] = newCurrentWidth;
        newWidths[resizingColumnIndex + 1] = newNextWidth;
        setColumnWidths(newWidths);
      }
    }
  }, [resizingColumnIndex, startX, startWidths]);

  const handleMouseUp = useCallback(() => {
    setResizingColumnIndex(null);
  }, []);

  useEffect(() => {
    if (resizingColumnIndex !== null) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingColumnIndex, handleMouseMove, handleMouseUp]);
  // --- End Column Resizing Logic ---

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

  const renderResizableCell = (
    content: React.ReactNode,
    index: number,
    isHeader: boolean = false,
    ref?: React.Ref<HTMLTableCellElement>
  ) => {
    const cellProps = {
      ref,
      sx: {
        width: columnWidths[index],
        position: 'relative',
        borderRight: index < columnWidths.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        ...(isHeader && {
          fontWeight: 'bold',
          color: 'text.primary',
        }),
      },
    };

    return (
      <TableCell {...cellProps}>
        {content}
        {index < columnWidths.length - 1 && (
          <Box
            onMouseDown={handleMouseDown(index)}
            sx={{
              position: 'absolute',
              top: 0,
              right: -2.5,
              width: '5px',
              height: '100%',
              cursor: 'col-resize',
              zIndex: 1,
            }}
          />
        )}
      </TableCell>
    );
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e8eaed', borderRadius: 3 }}>
      <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="commitments table">
        <TableHead sx={{ bgcolor: 'grey.50' }}>
          <TableRow>
            {renderResizableCell(
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
              </Box>,
              0, true, badgeCellRef
            )}
            {renderResizableCell('Original Commitment', 1, true)}
            {renderResizableCell(
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
              </Box>,
              2, true, assigneeCellRef
            )}
            {renderResizableCell(
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
              </Box>,
              3, true
            )}
            {renderResizableCell(
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
              </Box>,
              4, true
            )}
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
              <TableRow key={commitment.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: index % 2 === 0 ? 'background.paper' : 'grey.50' }}>
                {renderResizableCell(commitment.title, 0)}
                {renderResizableCell(commitment.description, 1)}
                {renderResizableCell(commitment.assignee, 2)}
                {renderResizableCell(commitment.dueDate, 3)}
                {renderResizableCell(commitment.committedDate || 'N/A', 4)}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommitmentsTable;