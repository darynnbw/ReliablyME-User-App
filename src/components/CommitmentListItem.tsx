import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Checkbox,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { CalendarToday, Person, MoreHoriz, WorkspacePremium as WorkspacePremiumIcon } from '@mui/icons-material'; // Added WorkspacePremiumIcon

interface CommitmentListItemProps {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  onViewDetails: () => void;
  onRequestBadge: () => void;
}

const CommitmentListItem: React.FC<CommitmentListItemProps> = ({
  title,
  dueDate,
  description,
  assignee,
  onViewDetails,
  onRequestBadge,
}) => {
  return (
    <Card
      sx={{
        minHeight: 140,
        borderLeft: '4px solid #1976d2', // Consistent with badge request color
        boxShadow: 1,
        transition: 'all 0.2s ease-in-out',
        flexShrink: 0,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Checkbox size="small" sx={{ p: 0, mr: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          </Box>
          <Tooltip title="View details" placement="top" arrow>
            <IconButton size="small" onClick={onViewDetails}>
              <MoreHoriz />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <CalendarToday sx={{ fontSize: 16, color: '#004C97' }} />
          <Typography variant="body2" sx={{ color: '#666' }}>
            Due {dueDate}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: '#666', mb: 2, lineHeight: 1.5 }}
        >
          {description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person sx={{
              fontSize: 16,
              color: '#1976d2'
            }} />
            <Typography variant="body2" sx={{ color: '#666' }}>
              To: {assignee}
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={onRequestBadge}
            // Added leading icon
            startIcon={<WorkspacePremiumIcon />}
            sx={{
              bgcolor: '#ff7043',
              textTransform: 'none',
              minWidth: '140px', // Increased minWidth
              minHeight: '40px', // Increased minHeight
              px: 3, // Increased horizontal padding
              py: 1.5, // Increased vertical padding
              borderRadius: 1,
              fontSize: '14px',
              fontWeight: 600,
              flexShrink: 0,
              '&:hover': { bgcolor: '#f4511e' },
            }}
          >
            Request Badge
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommitmentListItem;