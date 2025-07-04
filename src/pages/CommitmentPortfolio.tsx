import React from 'react';
import {
  Box,
  Container,
  Grid,
} from '@mui/material';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import UserProfileSection from '../components/UserProfileSection';
import BadgesOverviewPanel from '../components/BadgesOverviewPanel';
import CommitmentsSection from '../components/CommitmentsSection';
import AccomplishmentsOverviewPanel from '../components/AccomplishmentsOverviewPanel'; // Import the new panel

const CommitmentPortfolio: React.FC = () => {
  const myCommitmentsTabs = [
    {
      label: 'My Promises',
      count: 5,
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
          title: 'Attendance',
          dueDate: 'Due Mar 28, 12:00 AM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Need the quarterly marketing report with all KPIs and campaign results.',
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
          description: 'Prepare and share the agenda for the upcoming sprint planning meeting.',
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
      ],
    },
    {
      label: 'My Badges',
      count: 120,
      items: [
        {
          id: 3,
          title: 'Teamwork',
          dueDate: 'Mar 28, 12:00 AM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'I will attend today’s intern meeting',
          assignee: 'Riley Chen',
        },
        {
          id: 4,
          title: 'Promise Kept General',
          dueDate: 'Mar 27, 09:15 PM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'I will join the project kickoff meeting to discuss the upcoming launch.',
          assignee: 'Chris Parker',
        },
        {
          id: 5,
          title: 'Attendance',
          dueDate: 'Mar 26, 10:00 AM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'I will be on time for all the daily stand-ups this week.',
          assignee: 'Alex Johnson',
        },
      ],
    },
    {
      label: 'My Unkept Promises',
      count: 3,
      items: [
        {
          id: 9,
          title: 'Promise Kept General',
          dueDate: 'Mar 20, 03:00 PM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Failed to deliver the final report on the agreed-upon deadline.',
          assignee: 'John Doe',
        },
        {
          id: 10,
          title: 'Attendance',
          dueDate: 'Mar 22, 11:00 AM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Missed the critical client call without prior notification.',
          assignee: 'Jane Smith',
        },
        {
          id: 11,
          title: 'Teamwork',
          dueDate: 'Mar 25, 06:00 PM',
          committedDate: 'Mar 27, 9:15 PM',
          description: 'Did not provide the necessary assets for the marketing campaign.',
          assignee: 'Peter Jones',
        },
      ],
    },
    {
      label: 'Nudges History',
      count: 4,
      items: [],
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
        <UserProfileSection name="Alex Johnson" phone="+1 (555) 123-4567" />

        <Grid container spacing={3}>
          {/* Accomplishments Overview */}
          <Grid item xs={12}>
            <AccomplishmentsOverviewPanel />
          </Grid>

          {/* Badges Overview */}
          <Grid item xs={12} sx={{ mb: 3 }}>
            <BadgesOverviewPanel />
          </Grid>

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

export default CommitmentPortfolio;