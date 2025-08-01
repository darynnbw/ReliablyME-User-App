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
} from '@mui/material';

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
}

const CommitmentsTable: React.FC<CommitmentsTableProps> = ({ commitments }) => {
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
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Assignee</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Due Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Committed Date</TableCell>
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