import React from 'react';
import {
  Tooltip,
  Box,
  Typography,
} from '@mui/material';
import { CheckCircle, Info } from '@mui/icons-material';

interface ApprovalTooltipProps {
  children: React.ReactElement;
}

const ApprovalTooltip: React.FC<ApprovalTooltipProps> = ({ children }) => {
  const tooltipContent = (
    <Box sx={{ p: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <CheckCircle sx={{ fontSize: 16, color: 'white' }} />
        <Typography variant="body2" sx={{ color: 'white', fontSize: '13px' }}>
          Approved by: Alex Johnson
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Info sx={{ fontSize: 16, color: 'white' }} />
        <Typography variant="body2" sx={{ color: 'white', fontSize: '13px' }}>
          Method: Manual Approval
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

export default ApprovalTooltip;