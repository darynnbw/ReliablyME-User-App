import React, { useState, useCallback } from 'react';
import {
  Paper,
  Box,
  Button,
  Tabs,
  Tab,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CommitmentDetailsModal from './CommitmentDetailsModal';
import RequestBadgeModal from './RequestBadgeModal';
import CommitmentListItem from './CommitmentListItem';

const DueSoonOverdue: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [requestBadgeModalOpen, setRequestBadgeModalOpen] = useState(false);
  const [commitmentForDetails, setCommitmentForDetails] = useState<any>(null);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const handleToggleExpand = (id: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCloseDetailsModal = useCallback(() => setModalOpen(false), []);
  const handleCloseRequestBadgeModal = useCallback(() => setRequestBadgeModalOpen(false), []);

  const dueSoonItems = [
    {
      id: 1,
      title: 'Promise Kept General',
      type: 'Offer',
      description: 'I am going to finalize the Q3 marketing budget and present it to the team.',
      assignee: 'Alex Todd',
      dueDate: '15th June, 18:35',
    },
    {
      id: 2,
      title: 'Promise Kept General',
      type: 'Offer',
      description: 'I promise to review the new landing page design and provide feedback by end of day.',
      assignee: 'Alex Todd',
      dueDate: '15th June, 18:35',
    },
    {
      id: 3,
      title: 'Promise Kept General',
      type: 'Offer',
      description: 'I will complete the design review for the new user interface components and provide detailed feedback.',
      assignee: 'Emma Davis',
      dueDate: '16th June, 14:20',
    },
    {
      id: 4,
      title: 'Promise Kept General',
      type: 'Offer',
      description: 'I will attend the weekly team standup meeting to discuss project progress and upcoming milestones.',
      assignee: 'John Smith',
      dueDate: '17th June, 09:00',
    },
  ];

  const overdueItems = [
    {
      id: 5,
      title: 'Promise Kept General',
      type: 'Offer',
      description: 'I promise to submit the weekly analytics report.',
      assignee: 'Alex Todd',
      dueDate: '15th June, 18:35',
    },
    {
      id: 6,
      title: 'Promise Kept General',
      type: 'Offer',
      description: 'I will update the project documentation with the latest API changes and implementation details.',
      assignee: 'Lisa Chen',
      dueDate: '12th June, 16:00',
    },
    {
      id: 7,
      title: 'Promise Kept General',
      type: 'Offer',
      description: 'I will review the pull request for the authentication system improvements and provide feedback.',
      assignee: 'Mark Wilson',
      dueDate: '13th June, 11:30',
    },
  ];

  const handleViewDetails = (item: any) => {
    setCommitmentForDetails(item);
    setModalOpen(true);
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
        flexDirection: 'column',
        bgcolor: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e8eaed',
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
              <CommitmentListItem
                key={item.id}
                id={item.id}
                title={item.title}
                dueDate={item.dueDate}
                description={item.description}
                assignee={item.assignee}
                color={'#ff7043'}
                showCheckbox={false}
                showActionButton={true}
                buttonText="Request Badge"
                onViewDetails={() => handleViewDetails(item)}
                onActionButtonClick={() => setRequestBadgeModalOpen(true)}
                onToggleSelect={() => {}}
                isOverdue={isOverdue}
                isExpanded={expandedItems.has(item.id)}
                onToggleExpand={() => handleToggleExpand(item.id)}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto', pt: 2 }}>
          <Button
            component={Link}
            to="/actions"
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
    </>
  );
};

export default DueSoonOverdue;