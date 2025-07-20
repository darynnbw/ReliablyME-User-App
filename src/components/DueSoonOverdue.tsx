import React, { useState, useCallback } from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Chip,
  Button,
  Tabs,
  Tab,
  Tooltip,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import {
  MoreHoriz,
  Person,
  CalendarToday,
} from '@mui/icons-material';
import CommitmentDetailsModal from './CommitmentDetailsModal';
import RequestBadgeModal from './RequestBadgeModal';
import NudgeDetailsModal from './NudgeDetailsModal';
import AnswerNudgeModal from './AnswerNudgeModal';

const DueSoonOverdue: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [requestBadgeModalOpen, setRequestBadgeModalOpen] = useState(false);
  const [commitmentForDetails, setCommitmentForDetails] = useState<any>(null);
  const [nudgeDetailsModalOpen, setNudgeDetailsModalOpen] = useState(false);
  const [answerNudgeModalOpen, setAnswerNudgeModalOpen] = useState(false);
  const [commitmentForNudgeDetails, setCommitmentForNudgeDetails] = useState<any>(null);

  const handleCloseDetailsModal = useCallback(() => setModalOpen(false), []);
  const handleCloseRequestBadgeModal = useCallback(() => setRequestBadgeModalOpen(false), []);
  const handleCloseNudgeDetailsModal = useCallback(() => setNudgeDetailsModalOpen(false), []);
  const handleCloseAnswerNudgeModal = useCallback(() => setAnswerNudgeModalOpen(false), []);

  const dueSoonItems = [
    {
      id: 1,
      title: 'On Track Daily',
      type: 'nudge',
      description: 'A daily check-in to track your progress.',
      assignee: 'Alex Todd',
      dueDate: 'Today',
      questions: ['Did you complete all your planned tasks today?'],
    },
    {
      id: 2,
      title: 'Promise Kept General',
      type: 'Offer',
      description: 'Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text.',
      assignee: 'Alex Todd',
      dueDate: '15th June, 18:35',
    },
    {
      id: 3,
      title: 'Promise Kept General',
      type: 'Offer',
      description: 'Complete the design review for the new user interface components and provide detailed feedback.',
      assignee: 'Emma Davis',
      dueDate: '16th June, 14:20',
    },
    {
      id: 4,
      title: 'Promise Kept General',
      type: 'Offer',
      description: 'Attend the weekly team standup meeting to discuss project progress and upcoming milestones.',
      assignee: 'John Smith',
      dueDate: '17th June, 09:00',
    },
  ];

  const overdueItems = [
    {
      id: 5,
      title: 'Promise Kept General',
      type: 'Offer',
      description: 'Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text. Here goes sample text.',
      assignee: 'Alex Todd',
      dueDate: '15th June, 18:35',
    },
    {
      id: 6,
      title: 'Promise Kept General',
      type: 'Offer',
      description: 'Update the project documentation with the latest API changes and implementation details.',
      assignee: 'Lisa Chen',
      dueDate: '12th June, 16:00',
    },
    {
      id: 7,
      title: 'Promise Kept General',
      type: 'Offer',
      description: 'Review the pull request for the authentication system improvements and provide feedback.',
      assignee: 'Mark Wilson',
      dueDate: '13th June, 11:30',
    },
  ];

  const handleViewDetails = (item: any) => {
    if (item.type === 'nudge') {
      setCommitmentForNudgeDetails(item);
      setNudgeDetailsModalOpen(true);
    } else {
      setCommitmentForDetails(item);
      setModalOpen(true);
    }
  };

  const handleAnswerNudgeClick = () => {
    setNudgeDetailsModalOpen(false);
    setAnswerNudgeModalOpen(true);
  };

  const currentItems = activeTab === 0 ? dueSoonItems : overdueItems;
  const isOverdue = activeTab === 1;

  return (
    <>
      <Paper sx={{ 
        p: 3, 
        height: { xs: 'auto', md: 450 },
        minHeight: { xs: 350, md: 450 },
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                color: '#666',
                '&.Mui-selected': {
                  color: '#1976d2',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#1976d2',
              },
            }}
          >
            <Tab label={`Due Soon (${dueSoonItems.length})`} />
            <Tab label={`Overdue (${overdueItems.length})`} />
          </Tabs>
        </Box>

        <Box sx={{ 
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          mb: 2,
          pr: 1,
          scrollbarWidth: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0',
          },
        }}>
          <Stack spacing={1}>
            {currentItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  minHeight: 140,
                  borderLeft: `4px solid ${item.type === 'nudge' ? '#ff7043' : '#ff7043'}`,
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
                        {item.title}
                      </Typography>
                      <Chip
                        label={item.type}
                        size="small"
                        sx={{
                          bgcolor: '#fff3e0',
                          color: '#ff7043',
                          fontSize: '12px',
                          fontWeight: 700,
                          height: 28,
                          px: 1,
                        }}
                      />
                      {isOverdue && (
                        <Chip
                          label="OVERDUE"
                          size="small"
                          sx={{
                            bgcolor: alpha(theme.palette.error.main, 0.1),
                            color: 'error.dark',
                            fontSize: '10px',
                            fontWeight: 700,
                            height: 24,
                            px: 1,
                            '& .MuiChip-label': {
                              px: 1,
                            },
                          }}
                        />
                      )}
                    </Box>
                    <Tooltip title="View details" placement="top" arrow>
                      <IconButton size="small" onClick={() => handleViewDetails(item)}>
                        <MoreHoriz />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{ color: '#666', mb: 2, lineHeight: 1.5 }}
                  >
                    {item.description}
                  </Typography>

                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    flexWrap: 'wrap', 
                    gap: 2 
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 3, 
                      flexWrap: 'wrap',
                      flex: 1,
                      minWidth: 0
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person sx={{ 
                          fontSize: 16, 
                          color: '#ff7043'
                        }} />
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          To: {item.assignee}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday sx={{ 
                          fontSize: 16, 
                          color: isOverdue ? theme.palette.error.main : '#ff7043'
                        }} />
                        <Typography variant="body2" sx={{ 
                          color: isOverdue ? theme.palette.error.main : '#666',
                          fontWeight: isOverdue ? 700 : 400
                        }}>
                          Due: {item.dueDate}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      variant="contained"
                      onClick={() => item.type === 'nudge' ? handleAnswerNudgeClick() : setRequestBadgeModalOpen(true)}
                      sx={{
                        bgcolor: '#FF7F41',
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        px: 2.5,
                        py: 0.75,
                        borderRadius: 1,
                        flexShrink: 0,
                        '&:hover': { bgcolor: '#F4611A' },
                      }}
                    >
                      {item.type === 'nudge' ? 'Answer Nudge' : 'Request Badge'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto', pt: 2 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#607d8b',
              textTransform: 'none',
              px: 6,
              py: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: '#546e7a' },
            }}
          >
            See all
          </Button>
        </Box>
      </Paper>

      <CommitmentDetailsModal
        open={modalOpen}
        onClose={handleCloseDetailsModal}
        commitment={commitmentForDetails}
      />

      <RequestBadgeModal
        open={requestBadgeModalOpen}
        onClose={handleCloseRequestBadgeModal}
      />

      <NudgeDetailsModal
        open={nudgeDetailsModalOpen}
        onClose={handleCloseNudgeDetailsModal}
        commitment={commitmentForNudgeDetails}
        onAnswerNudgeClick={handleAnswerNudgeClick}
        questions={commitmentForNudgeDetails?.questions}
      />

      <AnswerNudgeModal
        open={answerNudgeModalOpen}
        onClose={handleCloseAnswerNudgeModal}
        title={commitmentForNudgeDetails?.title}
        questions={commitmentForNudgeDetails?.questions}
      />
    </>
  );
};

export default DueSoonOverdue;