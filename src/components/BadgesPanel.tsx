import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';

const BadgesPanel: React.FC = () => {
  const badges = [
    {
      id: 1,
      title: 'Promise Kept General',
      count: 34,
      borderColor: '#ff7043',
      bgColor: '#fff3e0',
    },
    {
      id: 2,
      title: 'Attendance',
      count: 4,
      borderColor: '#1976d2',
      bgColor: '#e3f2fd',
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
            {/* Large Shield Badge */}
            <Box
              sx={{
                width: 114, // 106 * 1.08 = 114.48 ≈ 114
                height: 138, // 128 * 1.08 = 138.24 ≈ 138
                position: 'relative',
                mb: 2.8, // Increased spacing: 2.13 * 1.3 = 2.77 ≈ 2.8
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4.6px) scale(1.05)', // -4.25 * 1.08 = -4.59 ≈ -4.6
                  filter: 'drop-shadow(0 9.2px 18.4px rgba(0, 0, 0, 0.15))', // 8.5 * 1.08 = 9.18 ≈ 9.2, 17 * 1.08 = 18.36 ≈ 18.4
                },
              }}
            >
              {/* Shield Shape with Gradient */}
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${badge.borderColor} 0%, ${badge.borderColor}dd 50%, ${badge.borderColor}bb 100%)`,
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 70%, 50% 100%, 0% 70%, 0% 20%)',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  boxShadow: `0 6.9px 23px ${badge.borderColor}30`, // 6.38 * 1.08 = 6.89 ≈ 6.9, 21.25 * 1.08 = 22.95 ≈ 23
                }}
              />
              
              {/* Inner White Area */}
              <Box
                sx={{
                  width: 'calc(100% - 9.2px)', // 8.5 * 1.08 = 9.18 ≈ 9.2
                  height: 'calc(100% - 9.2px)',
                  background: 'white',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 70%, 50% 100%, 0% 70%, 0% 20%)',
                  position: 'absolute',
                  top: 4.6, // 4.25 * 1.08 = 4.59 ≈ 4.6
                  left: 4.6,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1.14, // 1.06 * 1.08 = 1.1448 ≈ 1.14
                }}
              >
                {/* ReliablyME Logo */}
                <Box sx={{ mb: 1.72, textAlign: 'center' }}> {/* 1.59 * 1.08 = 1.7172 ≈ 1.72 */}
                  <Typography
                    sx={{
                      fontSize: '11.48px', // 10.63 * 1.08 = 11.4804 ≈ 11.48
                      fontWeight: 500,
                      color: '#ff7043',
                      lineHeight: 1,
                      letterSpacing: '0.57px', // 0.53 * 1.08 = 0.5724 ≈ 0.57
                    }}
                  >
                    Reliably
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '18.36px', // 17 * 1.08 = 18.36
                      fontWeight: 700,
                      color: '#1565c0',
                      lineHeight: 1,
                      letterSpacing: '-0.57px', // -0.53 * 1.08 = -0.5724 ≈ -0.57
                    }}
                  >
                    ME
                  </Typography>
                </Box>
                
                {/* Badge Type */}
                <Typography
                  sx={{
                    fontSize: '10.32px', // 9.56 * 1.08 = 10.3248 ≈ 10.32
                    fontWeight: 700,
                    color: badge.borderColor,
                    textAlign: 'center',
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                    mb: 1.14, // 1.06 * 1.08 = 1.1448 ≈ 1.14
                    letterSpacing: '0.35px', // 0.32 * 1.08 = 0.3456 ≈ 0.35
                  }}
                >
                  {badge.title === 'Promise Kept General' ? 'PROMISE\nKEPT' : badge.title.toUpperCase()}
                </Typography>
                
                {/* Bottom Logo */}
                <Typography
                  sx={{
                    fontSize: '6.89px', // 6.38 * 1.08 = 6.8904 ≈ 6.89
                    fontWeight: 600,
                    color: '#1565c0',
                    textAlign: 'center',
                    letterSpacing: '0.23px', // 0.21 * 1.08 = 0.2268 ≈ 0.23
                  }}
                >
                  RELIABLY ME
                </Typography>
              </Box>
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
              {badge.title === 'Promise Kept General' ? 'Promise Kept General' : badge.title}
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