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
import { CalendarToday, Person, MoreHoriz } from '@mui/icons-material';

interface CommitmentListItemProps {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  selected?: boolean; // Added selected property
  onViewDetails: () => void;
  onRequestBadge: () => void;
  onToggleSelect: (id: number, checked: boolean) => void; // Added onToggleSelect handler
}

const CommitmentListItem: React.FC<CommitmentListItemProps> = ({
  id,
  title,
  dueDate,
  description,
  assignee,
  selected = false, // Default to false
  onViewDetails,
  onRequestBadge,
  onToggleSelect,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleSelect(id, event.target.checked);
  };

  return (
    <Card
      sx={{
        minHeight: 140,
        borderLeft: '4px solid #1976d2',
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
            <Checkbox
              size="small"
              sx={{ p: 0, mr: 1 }}
              checked={selected}
              onChange={handleCheckboxChange}
            />
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
            sx={{
              bgcolor: '#FF7F41',
              color: 'white',
              textTransform: 'none',
              fontWeight: 'bold',
              px: 3,
              py: 1,
              borderRadius: 1,
              flexShrink: 0,
              '&:hover': { bgcolor: '#F4611A' },
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