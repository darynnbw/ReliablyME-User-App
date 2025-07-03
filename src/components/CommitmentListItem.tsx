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
  Stack,
} from '@mui/material';
import { CalendarToday, Person, MoreHoriz } from '@mui/icons-material';

interface CommitmentListItemProps {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  selected?: boolean;
  color: string;
  showCheckbox: boolean;
  showRequestBadgeButton: boolean;
  onViewDetails: () => void;
  onRequestBadge: () => void;
  onToggleSelect: (id: number, checked: boolean) => void;
}

const CommitmentListItem: React.FC<CommitmentListItemProps> = ({
  id,
  title,
  dueDate,
  description,
  assignee,
  selected = false,
  color,
  showCheckbox,
  showRequestBadgeButton,
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
        borderLeft: `4px solid ${color}`,
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
        {/* Top row: Checkbox, Title, MoreHoriz */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {showCheckbox && (
              <Checkbox
                size="small"
                sx={{ p: 0, mr: 1 }}
                checked={selected}
                onChange={handleCheckboxChange}
              />
            )}
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          </Stack>
          <Tooltip title="View details" placement="top" arrow>
            <IconButton size="small" onClick={onViewDetails}>
              <MoreHoriz />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Main content area with padding and vertical stack */}
        <Box sx={{ pl: showCheckbox ? 4.5 : 1.5, mt: 1 }}>
          <Stack spacing={1.25}>
            {/* Due Date */}
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarToday sx={{ fontSize: 16, color: color }} />
              <Typography variant="body2" sx={{ color: '#666' }}>
                Due {dueDate}
              </Typography>
            </Stack>

            {/* Description */}
            <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.5 }}>
              {description}
            </Typography>

            {/* Bottom row: Assignee and Button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mt: 1 }}>
              {/* Assignee */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Person sx={{ fontSize: 16, color: color }} />
                <Typography variant="body2" sx={{ color: '#666' }}>
                  To: {assignee}
                </Typography>
              </Stack>

              {/* Button */}
              {showRequestBadgeButton && (
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
              )}
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommitmentListItem;