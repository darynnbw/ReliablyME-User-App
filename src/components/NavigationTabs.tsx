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

interface NavigationTabsProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        sx={{
          px: 3,
          '& .MuiTab-root': {
            textTransform: 'none',
            minHeight: 56,
            fontWeight: 500,
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
        />
        <Tab
          icon={<FolderOpen />}
          iconPosition="start"
          label="Commitment Portfolio"
          sx={{ gap: 1 }}
        />
        <Tab
          icon={<PlayArrow />}
          iconPosition="start"
          label="Actions"
          sx={{ gap: 1 }}
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
        />
      </Tabs>
    </Box>
  );
};

export default NavigationTabs;