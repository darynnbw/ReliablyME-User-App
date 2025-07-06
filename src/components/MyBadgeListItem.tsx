import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
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
  onViewDetails: () => void;
}

const MyBadgeListItem = React.forwardRef<HTMLDivElement, MyBadgeListItemProps>(({
  title,
  approvalDate,
  commitment,
  recipient,
  onViewDetails,
}, ref) => {
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
        {/* Badge Image Placeholder */}
        <Box sx={{
          width: 100,
          alignSelf: 'stretch',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100',
          borderRadius: 1,
          flexShrink: 0,
        }}>
          <Shield sx={{ fontSize: 40, color: 'grey.400' }} />
        </Box>

        {/* Main Content - Structure now matches CommitmentListItem */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Top row: Title, MoreHoriz */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Tooltip title="View details" placement="top" arrow>
              <IconButton size="small" onClick={onViewDetails}>
                <MoreHoriz />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Main content area with vertical stack */}
          <Stack>
            {/* Approval Date */}
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
              <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Approved {approvalDate}
              </Typography>
            </Stack>

            {/* Commitment Description */}
            <Typography
              variant="body2"
              sx={{ color: '#666', lineHeight: 1.5, mb: 0.5 }}
            >
              {commitment}
            </Typography>

            {/* Bottom row: Recipient */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  To: {recipient}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
});

export default MyBadgeListItem;