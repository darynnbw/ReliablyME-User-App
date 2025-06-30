import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';

interface BadgeItemProps {
  title: string;
  count: number;
  borderColor: string;
  bgColor: string;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ title, count, borderColor }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: '1 1 auto',
      maxWidth: { xs: '100%', sm: '161px' },
    }}
  >
    <Box
      sx={{
        width: 114,
        height: 138,
        position: 'relative',
        mb: 2.8,
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4.6px) scale(1.05)',
          filter: 'drop-shadow(0 9.2px 18.4px rgba(0, 0, 0, 0.15))',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${borderColor} 0%, ${borderColor}dd 50%, ${borderColor}bb 100%)`,
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 70%, 50% 100%, 0% 70%, 0% 20%)',
          position: 'absolute',
          top: 0,
          left: 0,
          boxShadow: `0 6.9px 23px ${borderColor}30`,
        }}
      />
      <Box
        sx={{
          width: 'calc(100% - 9.2px)',
          height: 'calc(100% - 9.2px)',
          background: 'white',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 70%, 50% 100%, 0% 70%, 0% 20%)',
          position: 'absolute',
          top: 4.6,
          left: 4.6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1.14,
        }}
      >
        <Box sx={{ mb: 1.72, textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: '11.48px',
              fontWeight: 500,
              color: '#ff7043',
              lineHeight: 1,
              letterSpacing: '0.57px',
            }}
          >
            Reliably
          </Typography>
          <Typography
            sx={{
              fontSize: '18.36px',
              fontWeight: 700,
              color: '#1565c0',
              lineHeight: 1,
              letterSpacing: '-0.57px',
            }}
          >
            ME
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: '10.32px',
            fontWeight: 700,
            color: borderColor,
            textAlign: 'center',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            mb: 1.14,
            letterSpacing: '0.35px',
          }}
        >
          {title === 'Promise Kept General' ? 'PROMISE\nKEPT' : title.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            fontSize: '6.89px',
            fontWeight: 600,
            color: '#1565c0',
            textAlign: 'center',
            letterSpacing: '0.23px',
          }}
        >
          RELIABLY ME
        </Typography>
      </Box>
    </Box>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 600,
        color: '#3c4043',
        fontSize: '16.07px',
        textAlign: 'center',
        lineHeight: 1.3,
        mb: 0.7,
      }}
    >
      {title === 'Promise Kept General' ? 'Promise Kept General' : title}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 500,
        color: '#5f6368',
        fontSize: '14.91px',
        textAlign: 'center',
      }}
    >
      ({count})
    </Typography>
  </Box>
);

const BadgesOverviewPanel: React.FC = () => {
  const [badgeFilter, setBadgeFilter] = useState('');

  const badges = [
    {
      id: 1,
      title: 'Slack Promise Kept General',
      count: 124,
      borderColor: '#ff7043',
      bgColor: '#fff3e0',
    },
    {
      id: 2,
      title: 'Teamwork',
      count: 45,
      borderColor: '#1976d2',
      bgColor: '#e3f2fd',
    },
    {
      id: 3,
      title: 'Attendance',
      count: 56,
      borderColor: '#ff7043',
      bgColor: '#fff3e0',
    },
    {
      id: 4,
      title: 'Promise Kept General',
      count: 9,
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#1976d2',
            fontSize: '1.25rem',
          }}
        >
          Badges Overview (389)
        </Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="badge-filter-label" sx={{ fontSize: '0.875rem' }}>Filter by badge type...</InputLabel>
          <Select
            labelId="badge-filter-label"
            value={badgeFilter}
            onChange={(e) => setBadgeFilter(e.target.value as string)}
            label="Filter by badge type..."
            input={
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" sx={{ color: '#666' }}>
                      <FilterList fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                }
              />
            }
            sx={{
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#bdbdbd' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' },
              '& .MuiSelect-select': { py: '8.5px', px: 2, fontSize: '0.875rem' },
            }}
          >
            <MenuItem value="">All Badges</MenuItem>
            <MenuItem value="Promise Kept General">Promise Kept General</MenuItem>
            <MenuItem value="Teamwork">Teamwork</MenuItem>
            <MenuItem value="Attendance">Attendance</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: { xs: 4, sm: 5.5 },
        mb: 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        px: 1,
      }}>
        {badges.map((badge) => (
          <BadgeItem key={badge.id} {...badge} />
        ))}
      </Box>

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

export default BadgesOverviewPanel;