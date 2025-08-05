import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import BadgeContent from './BadgeContent';

const BadgesPanel: React.FC = () => {
  const badges = [
    {
      id: 1,
      title: 'Promise Kept General',
      count: 34,
    },
    {
      id: 2,
      title: 'Attendance',
      count: 4,
    },
  ];

  return (
    <Paper sx={{ 
      p: 3, 
      height: { xs: 'auto', md: 450 },
      minHeight: { xs: 350, md: 450 },
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#fafbfc',
      borderRadius: 3,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e8eaed',
    }}>
      {/* Title - Styled to match Action Notifications headings */}
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600, 
          color: '#1976d2', 
          mb: 1, 
          fontSize: '1.25rem',
        }}
      >
        Badges Earned
      </Typography>

      {/* Subtitle styled to match reliability rating text */}
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#666', 
          lineHeight: 1.5, 
          fontWeight: 400,
          mb: 4,
        }}
      >
        You have earned{' '}
        <Typography component="span" sx={{ fontWeight: 700, color: '#000' }}>
          82 badges
        </Typography>{' '}
        so far. Great job!
      </Typography>

      {/* Badge Display - Side by Side */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 4, sm: 5.5 }, // Increased spacing: 3.19 * 1.25 = 4, 4.25 * 1.3 = 5.5
        mb: 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        px: 1,
      }}>
        {badges.map((badge) => (
          <Box
            key={badge.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: '1 1 auto',
              maxWidth: { xs: '100%', sm: '161px' }, // 149 * 1.08 = 160.92 ≈ 161
            }}
          >
            {/* Large Shield Badge - now using BadgeContent component */}
            <Box
              sx={{
                mb: 2.8, // Increased spacing: 2.13 * 1.3 = 2.77 ≈ 2.8
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4.6px) scale(1.05)', // -4.25 * 1.08 = -4.59 ≈ -4.6
                  filter: 'drop-shadow(0 9.2px 18.4px rgba(0, 0, 0, 0.15))', // 8.5 * 1.08 = 9.18 ≈ 9.2, 17 * 1.08 = 18.36 ≈ 18.4
                },
              }}
            >
              <BadgeContent badgeType={badge.title} size="large" />
            </Box>
            
            {/* Badge Name and Count */}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#3c4043',
                fontSize: '16.07px', // 14.88 * 1.08 = 16.0704 ≈ 16.07
                textAlign: 'center',
                lineHeight: 1.3,
                mb: 0.7, // Increased spacing: 0.53 * 1.3 = 0.689 ≈ 0.7
              }}
            >
              {badge.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: '#5f6368',
                fontSize: '14.91px', // 13.81 * 1.08 = 14.9148 ≈ 14.91
                textAlign: 'center',
              }}
            >
              ({badge.count})
            </Typography>
          </Box>
        ))}
      </Box>

      {/* See All Button - Styled to match other dashboard buttons and aligned right */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
        <Button
          component={Link}
          to="/commitment-portfolio"
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
  );
};

export default BadgesPanel;