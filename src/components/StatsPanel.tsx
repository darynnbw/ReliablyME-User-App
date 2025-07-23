import React from 'react';
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';

const StatsPanel: React.FC = () => {
  return (
    <Paper sx={{ 
      p: 3, 
      height: { xs: 'auto', md: 500 },
      minHeight: { xs: 400, md: 500 },
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#ffffff',
      borderRadius: 3,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e8eaed',
    }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            bgcolor: '#ff7043',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            mb: 2,
            boxShadow: '0 4px 20px rgba(255, 112, 67, 0.3)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.8rem' }}>
            5223
          </Typography>
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            color: '#1976d2',
            textAlign: 'center',
            fontSize: '1.25rem',
          }}
        >
          Total Points
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
            Reliability
          </Typography>
          <Typography variant="body1" sx={{ color: '#ff7043', fontWeight: 700 }}>
            88%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={88}
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#ff7043',
              borderRadius: 5,
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
            Punctuality
          </Typography>
          <Typography variant="body1" sx={{ color: '#1976d2', fontWeight: 700 }}>
            82%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={82}
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#1976d2',
              borderRadius: 5,
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
            Confidence Score
          </Typography>
          <Typography variant="body1" sx={{ color: '#4caf50', fontWeight: 700 }}>
            7.93
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 'auto' }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#666', 
            lineHeight: 1.5, 
            fontWeight: 400,
            textAlign: 'left',
          }}
        >
          Your current Reliability Rating is{' '}
          <Typography component="span" sx={{ fontWeight: 700, color: '#000' }}>
            88.9%
          </Typography>{' '}
          after making{' '}
          <Typography component="span" sx={{ fontWeight: 700, color: '#000' }}>
            22
          </Typography>{' '}
          commitments in the past{' '}
          <Typography component="span" sx={{ fontWeight: 700, color: '#000' }}>
            90 days
          </Typography>
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatsPanel;