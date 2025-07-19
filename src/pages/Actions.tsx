import React from 'react';
import {
  Box,
  Container,
  Grid,
} from '@mui/material';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import CommitmentsSection from '../components/CommitmentsSection';
import dayjs from 'dayjs';

const Actions: React.FC = () => {
  const myPromisesItems = [
    {
      id: 999,
      title: 'Quarterly Report',
      dueDate: 'Jul 18, 12:00 AM',
      committedDate: 'Jul 15, 9:15 PM',
      description: 'I will submit the Q2 performance report to management.',
      assignee: 'Alex Johnson',
    },
    {
      id: 100,
      title: 'Mid-Week Progress',
      dueDate: 'Today',
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will respond to a nudge every Thursday to report on my mid-week progress through the end of June.',
      assignee: 'Alex Johnson',
      type: 'nudge',
      nudgesLeft: 2,
      totalNudges: 10,
    },
    {
      id: 1,
      title: 'Teamwork',
      dueDate: dayjs().add(2, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will provide feedback on the new product design mockups for client presentation.',
      assignee: 'Riley Chen',
    },
    {
      id: 2,
      title: 'Attendance',
      dueDate: dayjs().add(3, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will deliver the quarterly marketing report with all KPIs and campaign results.',
      assignee: 'Jamie Smith',
    },
    {
      id: 6,
      title: 'Promise Kept General',
      dueDate: dayjs().add(4, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will complete the code review for the new feature branch by end of day.',
      assignee: 'Alex Johnson',
    },
    {
      id: 7,
      title: 'Teamwork',
      dueDate: dayjs().add(5, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will prepare and share the agenda for the upcoming sprint planning meeting.',
      assignee: 'Sarah Connor',
    },
    {
      id: 8,
      title: 'Attendance',
      dueDate: dayjs().add(6, 'day').format('MMM D, hh:mm A'),
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
      description: 'I will respond to a nudge every Thursday to report on my mid-week progress through the end of June.',
      assignee: 'Alex Johnson',
      type: 'nudge',
    },
    {
      id: 201,
      title: 'Teamwork',
      dueDate: dayjs().add(2, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 27, 9:15 PM',
      description: 'I will provide feedback on the new product design mockups for client presentation.',
      assignee: 'Riley Chen',
    },
    {
      id: 202,
      title: 'Promise Kept General',
      dueDate: dayjs().add(3, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Mar 30, 10:00 AM',
      description: 'I will prepare the slides for the Q2 financial review meeting.',
      assignee: 'Sarah Wilson',
    },
    {
      id: 203,
      title: 'Attendance',
      dueDate: dayjs().add(4, 'day').format('MMM D, hh:mm A'),
      committedDate: 'Apr 1, 2:00 PM',
      description: 'I will attend the project retrospective for the Alpha launch.',
      assignee: 'Mike Johnson',
    },
    {
      id: 204,
      title: 'Promise Kept General',
      dueDate: dayjs().add(5, 'day').format('MMM D, hh:mm A'),
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
          dueDate: dayjs().add(2, 'day').format('MMM D, hh:mm A'),
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Need feedback on the new product design mockups for client presentation.',
          assignee: 'Riley Chen',
        },
        {
          id: 2,
          title: 'Promise Kept General',
          dueDate: dayjs().add(7, 'day').format('MMM D, hh:mm A'),
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