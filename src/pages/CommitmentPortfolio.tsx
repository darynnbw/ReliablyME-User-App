import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState(1); // Set to 1 for "Commitment Portfolio" tab

  const myCommitmentsTabs = [
    {
      label: 'My Promises',
      count: 2,
      items: [
        {
          id: 1,
          title: 'Teamwork',
          dueDate: 'Mar 28, 12:00 AM',
          description: 'Need feedback on the new product design mockups for client presentation.',
          assignee: 'Riley Chen',
        },
        {
          id: 2,
          title: 'Attendance',
          dueDate: 'Due Mar 28, 12:00 AM',
          description: 'Need the quarterly marketing report with all KPIs and campaign results.',
          assignee: 'Jamie Smith',
        },
      ],
    },
    {
      label: 'My Badges',
      count: 120,
      items: [],
    },
    {
      label: 'My Unkept Promises',
      count: 3,
      items: [],
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
          description: 'Need feedback on the new product design mockups for client presentation.',
          assignee: 'Riley Chen',
        },
        {
          id: 2,
          title: 'Promise Kept General',
          dueDate: 'Apr 15, 12:00 AM',
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
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

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