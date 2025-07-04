import React from 'react';
import {
  Tooltip,
  Box,
  Typography,
} from '@mui/material';
import { Phone, Public, Schedule } from '@mui/icons-material';

interface ContactTooltipProps {
  children: React.ReactElement;
}

const ContactTooltip: React.FC<ContactTooltipProps> = ({ children }) => {
  const tooltipContent = (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Phone sx={{ fontSize: 16, color: 'white' }} />
        <Typography variant="body2" sx={{ color: 'white', fontSize: '13px' }}>
          +1 (456) 12 89
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Public sx={{ fontSize: 16, color: 'white' }} />
        <Typography variant="body2" sx={{ color: 'white', fontSize: '13px' }}>
          Europe/Berlin Time Zone
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Schedule sx={{ fontSize: 16, color: 'white' }} />
        <Typography variant="body2" sx={{ color: 'white', fontSize: '13px' }}>
          3:45 PM (your time: 11:45 AM)
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Tooltip
      title={tooltipContent}
      placement="top"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'rgba(0, 0, 0, 0.9)',
            borderRadius: 2,
            p: 0,
            maxWidth: 280,
            '& .MuiTooltip-arrow': {
              color: 'rgba(0, 0, 0, 0.9)',
            },
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default ContactTooltip;