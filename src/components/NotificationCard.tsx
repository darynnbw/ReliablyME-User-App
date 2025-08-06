import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Check,
  Close,
  Edit,
  Undo,
  MoreHoriz,
  Person,
} from '@mui/icons-material';
import ContactTooltip from './ContactTooltip';

interface Notification {
  id: number;
  title: string;
  type: string;
  description: string;
  assignee: string;
  actions: string[];
  dueDate: string;
  explanation?: string;
}

interface NotificationCardProps {
  notification: Notification;
  onActionClick: (action: string, notification: Notification) => void;
  onClarificationClick: (notification: Notification) => void;
  onViewDetails: (notification: Notification) => void;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Invitation':
    case 'Nudge':
      return '#ff7043';
    case 'Badge Request':
      return '#1976d2';
    default:
      return '#666';
  }
};

const getTypeBackground = (type: string) => {
  switch (type) {
    case 'Invitation':
    case 'Nudge':
      return '#fff3e0';
    case 'Badge Request':
      return '#e3f2fd';
    default:
      return '#f5f5f5';
  }
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onActionClick,
  onClarificationClick,
  onViewDetails,
}) => {
  const color = getTypeColor(notification.type);
  const background = getTypeBackground(notification.type);

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {notification.title}
            </Typography>
            <Chip
              label={notification.type}
              size="small"
              sx={{ bgcolor: background, color: color, fontSize: '12px', fontWeight: 700, height: 28, px: 1 }}
            />
          </Box>
          <Tooltip title="View details" placement="top" arrow>
            <IconButton size="small" onClick={() => onViewDetails(notification)}>
              <MoreHoriz />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography variant="body2" sx={{ color: '#666', mb: 2, lineHeight: 1.5 }}>
          {notification.description}
        </Typography>

        {notification.type === 'Badge Request' && notification.explanation && (
          <Box sx={{ bgcolor: '#f8f9fa', p: 2, borderRadius: 2, border: '1px solid #e9ecef', mb: 2 }}>
            <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#333' }}>
              <Typography component="span" sx={{ fontWeight: 'bold', fontSize: 'inherit', color: 'inherit' }}>
                Explanation:{' '}
              </Typography>
              {notification.explanation}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person sx={{ fontSize: 16, color: color }} />
            <Typography variant="body2" sx={{ color: '#666' }}>
              To:{' '}
              {notification.assignee === 'Chris Parker' ? (
                <ContactTooltip>
                  <span style={{ color: '#666', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit', fontWeight: 'inherit' }}>
                    {notification.assignee}
                  </span>
                </ContactTooltip>
              ) : (
                notification.assignee
              )}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {notification.actions.includes('accept') && (
              <Tooltip title="Accept" placement="top" arrow>
                <IconButton size="small" onClick={() => onActionClick('accept', notification)} sx={{ bgcolor: '#e8f5e8', color: '#4caf50', '&:hover': { bgcolor: '#d4edda' } }}>
                  <Check fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {notification.actions.includes('decline') && (
              <Tooltip title="Decline" placement="top" arrow>
                <IconButton size="small" onClick={() => onActionClick('decline', notification)} sx={{ bgcolor: '#fde8e8', color: '#f44336', '&:hover': { bgcolor: '#f8d7da' } }}>
                  <Close fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {notification.actions.includes('edit') && (
              <Tooltip title="Answer Nudge" placement="top" arrow>
                <IconButton size="small" onClick={() => onActionClick('edit', notification)} sx={{ bgcolor: '#fff3e0', color: '#ff7043', '&:hover': { bgcolor: '#ffe0b2' } }}>
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {notification.actions.includes('undo') && (
              <Tooltip title="Request Clarification" placement="top" arrow>
                <IconButton size="small" onClick={() => onClarificationClick(notification)} sx={{ bgcolor: '#fff8e1', color: '#ff9800', '&:hover': { bgcolor: '#fff3c4' } }}>
                  <Undo fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;