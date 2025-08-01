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
  Select,
  MenuItem,
  InputAdornment,
  FormControl,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { CalendarToday } from '@mui/icons-material';

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
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
              Badge
              <FormControl variant="outlined" size="small" sx={{ minWidth: 80 }}>
                <Select
                  value={filters.badge}
                  onChange={(e) => onFilterChange('badge', e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Select badge filter' }}
                  sx={{
                    height: 36, // Compact height
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Remove border
                    '& .MuiSelect-select': { paddingRight: '24px !important' }, // Adjust padding for arrow
                    '& .MuiSelect-icon': { right: 4 }, // Adjust icon position
                    bgcolor: 'background.paper',
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {badgeOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              Original Commitment
              {/* No filter for Original Commitment as per request */}
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
              Assignee
              <FormControl variant="outlined" size="small" sx={{ minWidth: 80 }}>
                <Select
                  value={filters.assignee}
                  onChange={(e) => onFilterChange('assignee', e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Select assignee filter' }}
                  sx={{
                    height: 36, // Compact height
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Remove border
                    '& .MuiSelect-select': { paddingRight: '24px !important' }, // Adjust padding for arrow
                    '& .MuiSelect-icon': { right: 4 }, // Adjust icon position
                    bgcolor: 'background.paper',
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {assigneeOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
              Due Date
              <DatePicker
                value={filters.dueDate}
                onChange={(newValue) => onFilterChange('dueDate', newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: {
                      width: 'auto',
                      minWidth: 0,
                      '& .MuiInputBase-root': { height: 36, paddingRight: '8px !important' },
                      '& .MuiInputBase-input': { display: 'none' }, // Hide the actual input text
                      '& fieldset': { border: 'none' }, // Remove border
                    },
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
              Committed Date
              <DatePicker
                label="Committed Date"
                value={filters.committedDate}
                onChange={(newValue) => onFilterChange('committedDate', newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: {
                      width: 'auto',
                      minWidth: 0,
                      '& .MuiInputBase-root': { height: 36, paddingRight: '8px !important' },
                      '& .MuiInputBase-input': { display: 'none' }, // Hide the actual input text
                      '& fieldset': { border: 'none' }, // Remove border
                    },
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday fontSize="small" />
                        </InputAdornment>
                      ),
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
    </TableContainer>
  );
};

export default CommitmentsTable;