import React from 'react';
import {
  Box,
  Container,
  Grid,
} from '@mui/material';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import CommitmentsSection from '../components/CommitmentsSection';

const Actions: React.FC = () => {
  const myPromisesItems = [
    {
      id: 100,
      title: 'Mid-Week Progress',
      dueDate: 'Today',
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will answer the questions for my mid-week progress check-in.',
      assignee: 'Alex Johnson',
      type: 'nudge',
      nudgesLeft: 2,
      totalNudges: 10,
    },
    {
      id: 1,
      title: 'Teamwork',
      dueDate: 'Mar 28, 12:00 AM',
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will provide feedback on the new product design mockups for client presentation.',
      assignee: 'Riley Chen',
    },
    {
      id: 2,
      title: 'Attendance',
      dueDate: 'Due Mar 28, 12:00 AM',
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will deliver the quarterly marketing report with all KPIs and campaign results.',
      assignee: 'Jamie Smith',
    },
    {
      id: 6,
      title: 'Promise Kept General',
      dueDate: 'Apr 02, 05:00 PM',
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will complete the code review for the new feature branch by end of day.',
      assignee: 'Alex Johnson',
    },
    {
      id: 7,
      title: 'Teamwork',
      dueDate: 'Apr 04, 10:00 AM',
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will prepare and share the agenda for the upcoming sprint planning meeting.',
      assignee: 'Sarah Connor',
    },
    {
      id: 8,
      title: 'Attendance',
      dueDate: 'Apr 05, 09:00 AM',
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will join the all-hands meeting on time and prepared to discuss Q2 goals.',
      assignee: 'Mike Miller',
    },
  ];

  const requestsToCommitItems = [
    {
      id: 200,
      title: 'Mid-Week Progress',
      dueDate: 'Today',
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will answer the questions for my mid-week progress check-in.',
      assignee: 'Alex Johnson',
      type: 'nudge',
    },
    {
      id: 201,
      title: 'Teamwork',
      dueDate: 'Mar 28, 12:00 AM',
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will provide feedback on the new product design mockups for client presentation.',
      assignee: 'Riley Chen',
    },
    {
      id: 202,
      title: 'Promise Kept General',
      dueDate: 'Apr 1, 12:00 AM',
      committedDate: 'Mar 30, 10:00 AM',
      description: 'I will prepare the slides for the Q2 financial review meeting.',
      assignee: 'Sarah Wilson',
    },
    {
      id: 203,
      title: 'Attendance',
      dueDate: 'Apr 3, 09:00 AM',
      committedDate: 'Apr 1, 2:00 PM',
      description: 'I will attend the project retrospective for the Alpha launch.',
      assignee: 'Mike Johnson',
    },
    {
      id: 204,
      title: 'Promise Kept General',
      dueDate: 'Apr 5, 05:00 PM',
      committedDate: 'Apr 4, 10:00 AM',
      description: 'I will provide the final invoice for the freelance design work.',
      assignee: '+1 555-123-4567',
      isExternal: true,
    },
  ];

  const myCommitmentsTabs = [
    {
      label: 'My Promises',
      count: myPromisesItems.length,
      items: myPromisesItems,
    },
    {
      label: 'Requests to Commit',
      count: requestsToCommitItems.length,
      items: requestsToCommitItems,
    },
  ];

  const commitmentsReceivedTabs = [
    {
      label: 'Promises Owed to Me',
      count: 2,
      items: [
        {
          id: 1,
          title: 'Teamwork',
          dueDate: 'Mar 28, 12:00 AM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Need feedback on the new product design mockups for client presentation.',
          assignee: 'Riley Chen',
        },
        {
          id: 2,
          title: 'Promise Kept General',
          dueDate: 'Apr 15, 12:00 AM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Need the quarterly marketing report with all KPIs and campaign results.',
          assignee: 'Jamie Smith',
        },
      ],
    },
    {
      label: 'Badges Issued',
      count: 120,
      items: [],
    },
    {
      label: 'Unkept Promises to Me',
      count: 31,
      items: [],
    },
    {
      label: 'Nudges History',
      count: 4,
      items: [],
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <NavigationTabs />

      <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
        <Grid container spacing={3}>
          {/* My Commitments */}
          <Grid item xs={12}>
            <CommitmentsSection title="My Commitments" tabs={myCommitmentsTabs} />
          </Grid>

          {/* Commitments Received & Badges Issued */}
          <Grid item xs={12}>
            <CommitmentsSection title="Commitments Received & Badges Issued" tabs={commitmentsReceivedTabs} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Actions;