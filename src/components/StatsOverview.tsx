import React from 'react';
import { Paper, Grid, Divider } from '@mui/material';
import { WorkspacePremium, VerifiedUser, AccessTime, Groups } from '@mui/icons-material';
import StatCard from './StatCard';

const statsData = [
  {
    icon: WorkspacePremium,
    label: 'Total Points',
    value: '1234',
    iconColor: '#1976d2',
    avatarBgColor: '#e3f2fd',
  },
  {
    icon: VerifiedUser,
    label: 'Reliability Record',
    value: '80%',
    iconColor: '#ff7043',
    avatarBgColor: '#fff3e0',
  },
  {
    icon: AccessTime,
    label: 'Punctuality Record',
    value: '80%',
    iconColor: '#ff7043',
    avatarBgColor: '#fff3e0',
  },
  {
    icon: Groups,
    label: 'Confidence Score',
    value: '3.0',
    iconColor: '#ff7043',
    avatarBgColor: '#fff3e0',
  },
];

const StatsOverview: React.FC = () => {
  return (
    <Paper
      sx={{
        p: { xs: 2, md: 1 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        bgcolor: 'white',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e8eaed',
      }}
    >
      <Grid container spacing={{ xs: 2, md: 0 }} justifyContent="space-around" alignItems="center">
        {statsData.map((stat, index) => (
          <React.Fragment key={stat.label}>
            <Grid
              item
              xs={6}
              md
              sx={{
                transition: 'background-color 0.2s',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <StatCard {...stat} />
            </Grid>
            {index < statsData.length - 1 && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  display: { xs: 'none', md: 'block' },
                  height: '60%',
                  alignSelf: 'center',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Paper>
  );
};

export default StatsOverview;