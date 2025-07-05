import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material';
import { CalendarToday, Person, MoreHoriz, Shield } from '@mui/icons-material';

interface MyBadgeListItemProps {
  id: number;
  title: string;
  approvalDate: string;
  commitment: string;
  recipient: string;
  selected?: boolean;
  onToggleSelect: (id: number, checked: boolean) => void;
  onViewDetails: () => void;
}

const MyBadgeListItem = React.forwardRef<HTMLDivElement, MyBadgeListItemProps>(({
  id,
  title,
  approvalDate,
  commitment,
  recipient,
  selected = false,
  onToggleSelect,
  onViewDetails,
}, ref) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleSelect(id, event.target.checked);
  };

  return (
    <Card
      ref={ref}
      sx={{
        minHeight: 140,
        borderLeft: '4px solid #4caf50', // Green border for badges
        boxShadow: 1,
        transition: 'all 0.2s ease-in-out',
        flexShrink: 0,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <Checkbox
          size="small"
          sx={{ p: 0, mt: 0.5 }}
          checked={selected}
          onChange={handleCheckboxChange}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Shield sx={{ color: '#4caf50' }} /> {/* Badge Icon */}
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

          <Stack>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
              <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Approved {approvalDate}
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              sx={{ color: '#666', lineHeight: 1.5, mb: 0.5 }}
            >
              {commitment}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                To: <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{recipient}</Typography>
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
});

export default MyBadgeListItem;