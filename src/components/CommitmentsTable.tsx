import React, { useState, useRef, useCallback } from 'react';
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
  // Removed unused state variables badgeAnchorEl and assigneeAnchorEl
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [committedDateOpen, setCommittedDateOpen] = useState(false);

  const badgeCellRef = useRef<HTMLTableCellElement>(null);
  const assigneeCellRef = useRef<HTMLTableCellElement>(null);
  const dueDateButtonRef = useRef<HTMLButtonElement>(null);
  const committedDateButtonRef = useRef<HTMLButtonElement>(null);

  // State for column widths
  const [columnWidths, setColumnWidths] = useState<number[]>([150, 300, 150, 120, 120]); // Initial widths for 5 columns
  const [resizingColumnIndex, setResizingColumnIndex] = useState<number | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const tableRef = useRef<HTMLTableElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setResizingColumnIndex(index);
    setStartX(e.clientX);
    setStartWidth(columnWidths[index]);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [columnWidths]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (resizingColumnIndex === null) return;

    const deltaX = e.clientX - startX;
    setColumnWidths(prevWidths => {
      const newWidths = [...prevWidths];
      const currentColumnNewWidth = Math.max(50, startWidth + deltaX); // Min width of 50px for current column

      // Calculate the change in width for the current column
      const widthChange = currentColumnNewWidth - prevWidths[resizingColumnIndex];

      newWidths[resizingColumnIndex] = currentColumnNewWidth;

      // If there's a next column, adjust its width to compensate
      if (resizingColumnIndex + 1 < newWidths.length) {
        const nextColumnIndex = resizingColumnIndex + 1;
        const nextColumnCurrentWidth = prevWidths[nextColumnIndex];
        const nextColumnNewWidth = Math.max(50, nextColumnCurrentWidth - widthChange); // Min width of 50px for next column

        // Only apply the change if both columns can accommodate it
        if (currentColumnNewWidth >= 50 && nextColumnNewWidth >= 50) {
          newWidths[nextColumnIndex] = nextColumnNewWidth;
        } else {
          // If one hits min, just let the current column expand/shrink
          // without affecting the next one beyond its min.
          newWidths[resizingColumnIndex] = Math.max(50, currentColumnNewWidth);
        }
      }
      return newWidths;
    });
  }, [resizingColumnIndex, startX, startWidth, columnWidths]);

  const handleMouseUp = useCallback(() => {
    setResizingColumnIndex(null);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleBadgeMenuOpen = () => {
    // Use the ref directly for anchorEl
    // setBadgeAnchorEl(badgeCellRef.current); // This line is no longer needed
  };
  const handleBadgeMenuClose = () => {
    // setBadgeAnchorEl(null); // This line is no longer needed
  };
  const handleBadgeSelect = (value: string) => {
    onFilterChange('badge', value);
    handleBadgeMenuClose();
  };

  const handleAssigneeMenuOpen = () => {
    // Use the ref directly for anchorEl
    // setAssigneeAnchorEl(assigneeCellRef.current); // This line is no longer needed
  };
  const handleAssigneeMenuClose = () => {
    // setAssigneeAnchorEl(null); // This line is no longer needed
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

  const columns = [
    { id: 'badge', label: 'Badge', filterRef: badgeCellRef, filterMenuOpen: handleBadgeMenuOpen, filterMenuClose: handleBadgeMenuClose, filterSelect: handleBadgeSelect, filterValue: filters.badge, filterOptions: badgeOptions, iconColor: badgeIconColor },
    { id: 'originalCommitment', label: 'Original Commitment', filterRef: null, filterMenuOpen: null, filterMenuClose: null, filterSelect: null, filterValue: null, filterOptions: null, iconColor: null },
    { id: 'assignee', label: 'Assignee', filterRef: assigneeCellRef, filterMenuOpen: handleAssigneeMenuOpen, filterMenuClose: handleAssigneeMenuClose, filterSelect: handleAssigneeSelect, filterValue: filters.assignee, filterOptions: assigneeOptions, iconColor: assigneeIconColor },
    { id: 'dueDate', label: 'Due Date', filterRef: dueDateButtonRef, filterMenuOpen: () => setDueDateOpen(true), filterMenuClose: () => setDueDateOpen(false), filterSelect: handleDueDateChange, filterValue: filters.dueDate, filterOptions: null, iconColor: dueDateIconColor, isDatePicker: true, datePickerOpen: dueDateOpen },
    { id: 'committedDate', label: 'Committed Date', filterRef: committedDateButtonRef, filterMenuOpen: () => setCommittedDateOpen(true), filterMenuClose: () => setCommittedDateOpen(false), filterSelect: handleCommittedDateChange, filterValue: filters.committedDate, filterOptions: null, iconColor: committedDateIconColor, isDatePicker: true, datePickerOpen: committedDateOpen },
  ];

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e8eaed', borderRadius: 3, overflowX: 'auto' }}>
      <Table ref={tableRef} sx={{ minWidth: 'max-content' }} aria-label="commitments table">
        <TableHead sx={{ bgcolor: 'grey.50' }}>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell
                key={col.id}
                ref={col.filterRef}
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  borderRight: index < columns.length - 1 ? '1px solid #e0e0e0' : 'none', // Vertical divider
                  width: columnWidths[index], // Apply dynamic width
                  minWidth: 50, // Minimum width
                  boxSizing: 'border-box', // Ensure padding/border are included in width
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {col.label}
                  {col.filterMenuOpen && (
                    <IconButton size="small" onClick={col.filterMenuOpen} aria-label={`filter by ${col.label.toLowerCase()}`}>
                      {col.isDatePicker ? <CalendarToday fontSize="small" sx={{ color: col.iconColor }} /> : <ArrowDropDown fontSize="small" sx={{ color: col.iconColor }} />}
                    </IconButton>
                  )}
                  {col.filterMenuOpen && !col.isDatePicker && (
                    <Menu
                      anchorEl={col.filterRef?.current}
                      open={Boolean(col.filterRef?.current && col.filterValue !== null)}
                      onClose={col.filterMenuClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                      PaperProps={{
                        sx: { minWidth: col.filterRef?.current ? col.filterRef.current.offsetWidth : 'auto' }
                      }}
                    >
                      <MenuItem 
                        onClick={() => (col.filterSelect as (value: string) => void)('')} 
                        selected={(col.filterValue as string) === ''}
                      >
                        All
                      </MenuItem>
                      {col.filterOptions?.map((option: string) => (
                        <MenuItem key={option} onClick={() => (col.filterSelect as (value: string) => void)(option)} selected={(col.filterValue as string) === option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                  {col.isDatePicker && (
                    <DatePicker
                      label={col.label}
                      open={col.datePickerOpen}
                      onClose={col.filterMenuClose}
                      value={col.filterValue as Dayjs | null}
                      onChange={col.filterSelect as (value: Dayjs | null) => void}
                      slotProps={{
                        textField: {
                          style: { display: 'none' }
                        },
                        popper: {
                          placement: 'bottom-start',
                          anchorEl: col.filterRef?.current,
                        }
                      }}
                    />
                  )}
                </Box>
                {/* Resizer Handle */}
                {index < columns.length - 1 && (
                  <Box
                    onMouseDown={(e) => handleMouseDown(e, index)}
                    sx={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: '8px', // Draggable area width
                      cursor: 'col-resize',
                      bgcolor: resizingColumnIndex === index ? theme.palette.primary.main : 'transparent', // Highlight when dragging
                      '&:hover': {
                        bgcolor: theme.palette.grey[300], // Visual feedback on hover
                      },
                      zIndex: 1, // Ensure it's above other content
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
              <TableCell colSpan={columns.length} sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
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
                <TableCell sx={{ width: columnWidths[0], minWidth: 50, borderRight: '1px solid #e0e0e0', boxSizing: 'border-box' }}>
                  {commitment.title}
                </TableCell>
                <TableCell sx={{ width: columnWidths[1], minWidth: 50, borderRight: '1px solid #e0e0e0', boxSizing: 'border-box' }}>
                  {commitment.description}
                </TableCell>
                <TableCell sx={{ width: columnWidths[2], minWidth: 50, borderRight: '1px solid #e0e0e0', boxSizing: 'border-box' }}>
                  {commitment.assignee}
                </TableCell>
                <TableCell sx={{ width: columnWidths[3], minWidth: 50, borderRight: '1px solid #e0e0e0', boxSizing: 'border-box' }}>
                  {commitment.dueDate}
                </TableCell>
                <TableCell sx={{ width: columnWidths[4], minWidth: 50, boxSizing: 'border-box' }}>
                  {commitment.committedDate || 'N/A'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommitmentsTable;