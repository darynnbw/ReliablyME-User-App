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
    committedDate: Dayjs | null;
  };
  onFilterChange: (filterName: string, value: any) => void;
  badgeOptions: string[];
}

const CommitmentsTable: React.FC<CommitmentsTableProps> = ({
  commitments,
  filters,
  onFilterChange,
  badgeOptions,
}) => {
  const theme = useTheme();
  const [badgeAnchorEl, setBadgeAnchorEl] = useState<null | HTMLElement>(null);
  const [committedDateOpen, setCommittedDateOpen] = useState(false);

  const badgeCellRef = useRef<HTMLTableCellElement>(null);
  const committedDateButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleCommittedDateChange = (newValue: Dayjs | null) => {
    onFilterChange('committedDate', newValue);
    setCommittedDateOpen(false);
  };

  const badgeIconColor = filters.badge ? theme.palette.primary.main : 'text.secondary';
  const committedDateIconColor = filters.committedDate ? theme.palette.primary.main : 'text.secondary';

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e8eaed', borderRadius: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="commitments table">
        <TableHead sx={{ bgcolor: 'grey.50' }}>
          <TableRow>
            <TableCell ref={badgeCellRef} sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap' }}>
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
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap' }}>
              Original Commitment
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap' }}>
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
              <TableCell colSpan={3} sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
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
                <TableCell component="th" scope="row">
                  {commitment.title}
                </TableCell>
                <TableCell>{commitment.description}</TableCell>
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