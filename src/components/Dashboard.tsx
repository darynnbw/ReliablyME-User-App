import React from 'react';
import {
  Box,
  Container,
  Grid,
} from '@mui/material';
import Header from './Header';
import NavigationTabs from './NavigationTabs';
import ActionNotifications from './ActionNotifications';
import DueSoonOverdue from './DueSoonOverdue';
import StatsPanel from './StatsPanel';
import BadgesPanel from './BadgesPanel';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <NavigationTabs />
      
      <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Top row - Action Notifications and Stats Panel */}
          <Grid item xs={12} lg={8}>
            <ActionNotifications />
          </Grid>
          <Grid item xs={12} lg={4}>
            <StatsPanel />
          </Grid>
          
          {/* Bottom row - Due Soon (60%) and Badges (40%) spanning full width */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7.2}>
                <DueSoonOverdue />
              </Grid>
              <Grid item xs={12} md={4.8}>
                <BadgesPanel />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;