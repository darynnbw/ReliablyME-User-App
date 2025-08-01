import React from 'react';
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
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  FormControl,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { Search, CalendarToday } from '@mui/icons-material';

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
  onClearTableFilters: () => void; // New prop for clearing table-specific filters
  badgeOptions: string[];
  assigneeOptions: string[];
}

const CommitmentsTable: React.FC<CommitmentsTableProps> = ({
  commitments,
  filters,
  onFilterChange,
  onClearTableFilters,
  badgeOptions,
  assigneeOptions,
}) => {
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
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Badge</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Original Commitment</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Assignee</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Due Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Committed Date</TableCell>
          </TableRow>
          <TableRow sx={{ bgcolor: 'grey.100' }}> {/* Subtle background for filter row */}
            <TableCell sx={{ py: 0.5 }}> {/* Reduced vertical padding */}
              <FormControl variant="outlined" size="small" fullWidth>
                <Select
                  value={filters.badge}
                  onChange={(e) => onFilterChange('badge', e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Select badge filter' }}
                  sx={{ 
                    bgcolor: 'background.paper', 
                    height: 36, // Consistent height
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiSelect-select': { py: '8.5px', px: '14px' }, // Adjust padding inside select
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {badgeOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell sx={{ py: 0.5 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                value={filters.commitmentText}
                onChange={(e) => onFilterChange('commitmentText', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                  sx: { height: 36, pr: 0 }, // Consistent height, remove right padding
                }}
                sx={{ 
                  bgcolor: 'background.paper', 
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '& .MuiInputBase-input': { py: '8.5px', px: '14px' }, // Adjust padding inside input
                }}
                fullWidth
              />
            </TableCell>
            <TableCell sx={{ py: 0.5 }}>
              <FormControl variant="outlined" size="small" fullWidth>
                <Select
                  value={filters.assignee}
                  onChange={(e) => onFilterChange('assignee', e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Select assignee filter' }}
                  sx={{ 
                    bgcolor: 'background.paper', 
                    height: 36, // Consistent height
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiSelect-select': { py: '8.5px', px: '14px' }, // Adjust padding inside select
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {assigneeOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell sx={{ py: 0.5 }}>
              <DatePicker
                value={filters.dueDate}
                onChange={(newValue) => onFilterChange('dueDate', newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    placeholder: 'Select Date', // Placeholder for date picker
                    sx: { 
                      bgcolor: 'background.paper', 
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '& .MuiInputBase-input': { py: '8.5px', px: '14px' }, // Adjust padding inside input
                    },
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday fontSize="small" />
                        </InputAdornment>
                      ),
                      sx: { height: 36, pr: 0 }, // Consistent height, remove right padding
                    },
                  },
                }}
              />
            </TableCell>
            <TableCell sx={{ py: 0.5 }}>
              <DatePicker
                value={filters.committedDate}
                onChange={(newValue) => onFilterChange('committedDate', newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    placeholder: 'Select Date', // Placeholder for date picker
                    sx: { 
                      bgcolor: 'background.paper', 
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '& .MuiInputBase-input': { py: '8.5px', px: '14px' }, // Adjust padding inside input
                    },
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday fontSize="small" />
                        </InputAdornment>
                      ),
                      sx: { height: 36, pr: 0 }, // Consistent height, remove right padding
                    },
                  },
                }}
              />
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, bgcolor: 'grey.100', borderTop: '1px solid #e0e0e0' }}>
        <Typography
          variant="body2"
          onClick={onClearTableFilters}
          sx={{
            cursor: 'pointer',
            color: 'primary.main',
            fontWeight: 600,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Clear All Filters
        </Typography>
      </Box>
    </TableContainer>
  );
};

export default CommitmentsTable;