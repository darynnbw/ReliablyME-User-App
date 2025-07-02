import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { CalendarToday, Person, MoreHoriz } from '@mui/icons-material';

interface MyBadgeListItemProps {
  title: string;
  approvalDate: string;
  commitment: string;
  recipient: string;
}

const MyBadgeListItem: React.FC<MyBadgeListItemProps> = ({
  title,
  approvalDate,
  commitment,
  recipient,
}) => {
  return (
    <Card sx={{ display: 'flex', mb: 2, boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: 2, alignItems: 'center' }}>
      <Box sx={{ width: 100, height: 100, bgcolor: '#f0f0f0', m: 2, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Typography variant="caption" color="text.secondary">Badge</Typography>
      </Box>
      <CardContent sx={{ flex: 1, p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 0.5 }}>
              <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Approved {approvalDate}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ my: 1 }}>
              {commitment}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                To: <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{recipient}</Typography>
              </Typography>
            </Box>
          </Box>
          <IconButton size="small">
            <MoreHoriz />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MyBadgeListItem;