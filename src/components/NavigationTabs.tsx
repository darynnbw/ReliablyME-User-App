import React from 'react';
import {
  Box,
  Tabs,
  Tab,
  Badge,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  FolderOpen,
  PlayArrow,
  Notifications,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

interface NavigationTabsProps {}

const NavigationTabs: React.FC<NavigationTabsProps> = () => {
  const location = useLocation();

  // Determine active tab based on current path
  const getActiveTabIndex = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 0;
      case '/commitment-portfolio':
        return 1;
      case '/actions': // Assuming a future /actions route
        return 2;
      case '/notifications': // Assuming a future /notifications route
        return 3;
      default:
        return 0; // Default to dashboard
    }
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
      <Tabs
        value={getActiveTabIndex()}
        sx={{
          px: 3,
          '& .MuiTab-root': {
            textTransform: 'none',
            minHeight: 56,
            fontWeight: 600, // Made bolder
            color: '#666',
            '&.Mui-selected': {
              color: '#1976d2',
            },
          },
        }}
      >
        <Tab
          icon={<DashboardIcon />}
          iconPosition="start"
          label="Dashboard"
          sx={{ gap: 1 }}
          component={Link}
          to="/dashboard"
        />
        <Tab
          icon={<FolderOpen />}
          iconPosition="start"
          label="Commitment Portfolio"
          sx={{ gap: 1 }}
          component={Link}
          to="/commitment-portfolio"
        />
        <Tab
          icon={<PlayArrow />}
          iconPosition="start"
          label="Actions"
          sx={{ gap: 1 }}
          component={Link}
          to="/actions" // Placeholder for future route
        />
        <Tab
          icon={
            <Badge badgeContent={0} color="error">
              <Notifications />
            </Badge>
          }
          iconPosition="start"
          label="Notifications"
          sx={{ gap: 1 }}
          component={Link}
          to="/notifications" // Placeholder for future route
        />
      </Tabs>
    </Box>
  );
};

export default NavigationTabs;