import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
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

const MyBadgeListItem: React.FC<MyBadgeListItemProps> = ({
  id,
  title,
  approvalDate,
  commitment,
  recipient,
  selected = false,
  onToggleSelect,
  onViewDetails,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleSelect(id, event.target.checked);
  };

  return (
    <Card
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
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Checkbox
              size="small"
              sx={{ p: 0, mr: 1 }}
              checked={selected}
              onChange={handleCheckboxChange}
            />
            <Shield sx={{ color: '#4caf50', mr: 1 }} /> {/* Badge Icon */}
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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, pl: 4 }}>
          <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Approved {approvalDate}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: '#666', mb: 2, lineHeight: 1.5, pl: 4 }}
        >
          {commitment}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, pl: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              To: <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{recipient}</Typography>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MyBadgeListItem;