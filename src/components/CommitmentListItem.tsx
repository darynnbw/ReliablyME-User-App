import React, { useState } from 'react';
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
  alpha,
  Chip,
  useTheme,
  Collapse,
} from '@mui/material';
import { CalendarToday, Person, MoreHoriz, Edit, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import ContactTooltip from './ContactTooltip';
import dayjs from 'dayjs';
import BadgeContent from './BadgeContent';

// Prop Interfaces
interface CommitmentListItemProps {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  explanation?: string;
  assignee: string;
  selected?: boolean;
  color: string;
  showCheckbox: boolean;
  isCheckboxDisabled?: boolean;
  showActionButton: boolean;
  buttonText: string;
  onViewDetails: () => void;
  onActionButtonClick: () => void;
  onToggleSelect: (id: number, checked: boolean) => void;
  showBadgePlaceholder?: boolean;
  showAcceptDeclineButtons?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  isBulkSelecting?: boolean;
  hideDueDate?: boolean;
  isNudge?: boolean;
  nudgesLeft?: number;
  totalNudges?: number;
  isMyPromisesTab?: boolean;
  isMyBadgesTab?: boolean;
  isBadgesIssuedTab?: boolean;
  isExternal?: boolean;
  isOverdue: boolean; // Changed from isOverdue?: boolean;
  showRevokeButton?: boolean;
  onRevoke?: () => void;
  showFromLabel?: boolean;
  acceptButtonText?: string;
  declineButtonText?: string;
  responses?: { date: string; answer: string }[];
  approvedDate?: string;
}

// Sub-components for internal rendering
const ItemHeader: React.FC<{ title: string; isNudge?: boolean; isExternal?: boolean; isOverdue: boolean; showExpandIcon: boolean; expanded: boolean; onExpandClick: (e: React.MouseEvent) => void; onViewDetails: () => void; }> = ({ title, isNudge, isExternal, isOverdue, showExpandIcon, expanded, onExpandClick, onViewDetails }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{title}</Typography>
        {isNudge && <Chip label="Nudge" size="small" sx={{ bgcolor: '#fff3e0', color: '#ff7043', fontSize: '12px', fontWeight: 700 }} />}
        {isExternal && <Chip label="External" size="small" sx={{ bgcolor: 'grey.300', color: 'text.secondary', fontSize: '12px', fontWeight: 700 }} />}
        {isOverdue && <Chip label="Overdue" size="small" sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.dark', fontSize: '12px', fontWeight: 700, height: 20 }} />}
      </Stack>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {showExpandIcon && <IconButton onClick={onExpandClick} aria-expanded={expanded} size="small" sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}><ExpandMoreIcon /></IconButton>}
        <Tooltip title="View details" placement="top" arrow><IconButton size="small" onClick={onViewDetails}><MoreHoriz /></IconButton></Tooltip>
      </Box>
    </Box>
  );
};

const ItemMeta: React.FC<{ hideDueDate?: boolean; displayDateLabel: string; displayDateValue: string; dateTextColor: string; dateTextWeight: string; calendarIconColor: string; isNudge?: boolean; nudgesLeft?: number; totalNudges?: number; }> = ({ hideDueDate, displayDateLabel, displayDateValue, dateTextColor, dateTextWeight, calendarIconColor, isNudge, nudgesLeft, totalNudges }) => {
  if (hideDueDate) return null;
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
      <CalendarToday sx={{ fontSize: 16, color: calendarIconColor }} />
      <Typography variant="body2" sx={{ color: dateTextColor, fontWeight: dateTextWeight }}>{displayDateLabel} {displayDateValue}</Typography>
      {isNudge && nudgesLeft !== undefined && totalNudges !== undefined && nudgesLeft > 0 && <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 400 }}>({nudgesLeft} of {totalNudges} nudges left)</Typography>}
    </Stack>
  );
};

const ItemBody: React.FC<{ description: string; explanation?: string; isMyBadgesTab?: boolean; isBadgesIssuedTab?: boolean; }> = ({ description, explanation, isMyBadgesTab, isBadgesIssuedTab }) => (
  <>
    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.5, mb: 1.5 }}>{description}</Typography>
    {explanation && !(isMyBadgesTab || isBadgesIssuedTab) && (
      <Box sx={{ bgcolor: '#f8f9fa', px: 2, py: 1.5, borderRadius: 2, border: '1px solid #e9ecef', mb: 1.5, maxWidth: '100%' }}>
        <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#333' }}><Typography component="span" sx={{ fontWeight: 'bold', fontSize: 'inherit', color: 'inherit' }}>Explanation:{' '}</Typography>{explanation}</Typography>
      </Box>
    )}
  </>
);

const ItemFooter: React.FC<{ color: string; showFromLabel?: boolean; isExternal?: boolean; assignee: string; showActionButton: boolean; onActionButtonClick: () => void; isBulkSelecting?: boolean; isNudge?: boolean; isMyPromisesTab?: boolean; buttonText: string; showAcceptDeclineButtons?: boolean; onDecline?: () => void; onAccept?: () => void; declineButtonText?: string; acceptButtonText?: string; showRevokeButton?: boolean; onRevoke?: () => void; }> = (props) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 1.5 }}>
    <Stack direction="row" spacing={1} alignItems="center">
      <Person sx={{ fontSize: 16, color: props.color }} />
      <Typography variant="body2" sx={{ color: '#666' }}>{props.showFromLabel ? 'From:' : 'To:'}{' '}{!props.isExternal ? <ContactTooltip><span style={{ color: '#666', cursor: 'pointer' }}>{props.assignee}</span></ContactTooltip> : props.assignee}</Typography>
      {props.isExternal && <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>(Non-member)</Typography>}
    </Stack>
    <Box sx={{ minWidth: 130, textAlign: 'right' }}>
      {props.showActionButton && <Button variant="contained" onClick={props.onActionButtonClick} disabled={props.isBulkSelecting} startIcon={props.isNudge && props.isMyPromisesTab ? <Edit /> : undefined} sx={{ bgcolor: (props.isNudge && props.isMyPromisesTab) ? '#ff7043' : props.color, color: 'white', textTransform: 'none', fontWeight: 'bold', px: props.buttonText === 'Clarify' ? 6 : 3, py: 1, borderRadius: 1, flexShrink: 0, '&:hover': { bgcolor: props.buttonText === 'Answer Nudge' || props.buttonText === 'Request Badge' ? '#f4511e' : (props.buttonText === 'Clarify' ? '#1565c0' : alpha(props.color, 0.8)) } }}>{props.buttonText}</Button>}
      {props.showAcceptDeclineButtons && <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}><Button variant="contained" onClick={props.onDecline} disabled={props.isBulkSelecting} sx={{ bgcolor: '#F44336', color: 'white', textTransform: 'none', fontWeight: 'bold', px: 4, py: 0.75, borderRadius: 1, '&:hover': { bgcolor: '#d32f2f' } }}>{props.declineButtonText || 'Decline'}</Button><Button variant="contained" onClick={props.onAccept} disabled={props.isBulkSelecting} sx={{ bgcolor: '#4CAF50', color: 'white', textTransform: 'none', fontWeight: 'bold', px: 4, py: 0.75, borderRadius: 1, '&:hover': { bgcolor: '#388e3c' } }}>{props.acceptButtonText || 'Accept'}</Button></Box>}
      {props.showRevokeButton && <Button variant="contained" onClick={props.onRevoke} disabled={props.isBulkSelecting} sx={{ bgcolor: '#F44336', color: 'white', textTransform: 'none', fontWeight: 'bold', px: 4, py: 0.75, borderRadius: 1, '&:hover': { bgcolor: '#d32f2f' } }}>Revoke</Button>}
    </Box>
  </Box>
);

const ItemCollapseContent: React.FC<{ isNudge?: boolean; responses?: { date: string; answer: string }[]; isMyBadgesTab?: boolean; isBadgesIssuedTab?: boolean; explanation?: string; }> = ({ isNudge, responses, isMyBadgesTab, isBadgesIssuedTab, explanation }) => (
  <Collapse in={true} timeout="auto" unmountOnExit>
    <Box sx={{ mt: 1.5, p: 2, bgcolor: 'grey.50', borderRadius: 1, border: '1px solid grey.200' }}>
      {isNudge && responses && responses.length > 0 && (
        <>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>All Responses:</Typography>
          <Stack spacing={1}>
            {responses.sort((a, b) => dayjs(b.date, 'MMM D, YYYY').valueOf() - dayjs(a.date, 'MMM D, YYYY').valueOf()).map((response, idx) => (
              <Box key={idx} sx={{ pb: 1, borderBottom: idx < responses.length - 1 ? '1px dashed grey.300' : 'none' }}>
                <Chip label={response.date} size="small" sx={{ bgcolor: '#fff3e0', color: '#ff7043', fontWeight: 700, fontSize: '12px', mb: 1 }} />
                <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.5 }}>{response.answer}</Typography>
              </Box>
            ))}
          </Stack>
        </>
      )}
      {(isMyBadgesTab || isBadgesIssuedTab) && explanation && (
        <>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>Explanation:</Typography>
          <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.5 }}>{explanation}</Typography>
        </>
      )}
    </Box>
  </Collapse>
);

// Main Component
const CommitmentListItem = React.forwardRef<HTMLDivElement, CommitmentListItemProps>((props, ref) => {
  const { id, title, dueDate, onToggleSelect, selected = false, showCheckbox, isCheckboxDisabled, showBadgePlaceholder, color, isOverdue } = props;
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => onToggleSelect(id, event.target.checked);
  const handleExpandClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  const displayDateLabel = props.isMyBadgesTab || props.isBadgesIssuedTab ? 'Approved' : 'Due';
  const displayDateValue = props.isMyBadgesTab || props.isBadgesIssuedTab ? (props.approvedDate || 'N/A') : dueDate;
  const dateTextColor = isOverdue ? theme.palette.error.main : '#666';
  const dateTextWeight = isOverdue ? '600' : 'inherit';
  const calendarIconColor = isOverdue ? theme.palette.error.main : color;
  const showExpandIcon = (props.isNudge && props.responses && props.responses.length > 0) || ((props.isMyBadgesTab || props.isBadgesIssuedTab) && props.explanation);

  return (
    <Card ref={ref} sx={{ position: 'relative', minHeight: 140, borderLeft: `4px solid ${color}`, boxShadow: 1, transition: 'all 0.2s ease-in-out', flexShrink: 0, overflow: 'hidden', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
      {isOverdue && <Box sx={{ position: 'absolute', top: 0, right: 0, width: '24px', height: '24px', bgcolor: 'error.main', clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />}
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', gap: 1.5 }}>
        {showBadgePlaceholder && <Box sx={{ width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, alignSelf: 'center' }}><BadgeContent badgeType={title} size="list-item-large" /></Box>}
        {showCheckbox && <Checkbox size="small" sx={{ p: 0, mt: 0.5, alignSelf: 'flex-start' }} checked={selected} onChange={handleCheckboxChange} disabled={isCheckboxDisabled} />}
        <Box sx={{ flex: 1, minWidth: 0, alignSelf: 'center' }}>
          <ItemHeader title={title} isNudge={props.isNudge} isExternal={props.isExternal} isOverdue={isOverdue} showExpandIcon={showExpandIcon} expanded={expanded} onExpandClick={handleExpandClick} onViewDetails={props.onViewDetails} />
          <ItemMeta hideDueDate={props.hideDueDate} displayDateLabel={displayDateLabel} displayDateValue={displayDateValue} dateTextColor={dateTextColor} dateTextWeight={dateTextWeight} calendarIconColor={calendarIconColor} isNudge={props.isNudge} nudgesLeft={props.nudgesLeft} totalNudges={props.totalNudges} />
          <ItemBody description={props.description} explanation={props.explanation} isMyBadgesTab={props.isMyBadgesTab} isBadgesIssuedTab={props.isBadgesIssuedTab} />
          <ItemFooter {...props} />
          {showExpandIcon && expanded && <ItemCollapseContent {...props} />}
        </Box>
      </CardContent>
    </Card>
  );
});

export default CommitmentListItem;