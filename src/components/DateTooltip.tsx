import React from 'react';
import { Tooltip, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface DateTooltipProps {
  children: React.ReactElement;
  dateString?: string;
}

const DateTooltip: React.FC<DateTooltipProps> = ({ children, dateString }) => {
  if (!dateString || dateString === 'N/A') {
    return children; // No tooltip if no date
  }

  const date = dayjs(dateString, 'MMM D, YYYY, hh:mm A');
  const formattedDate = date.isValid() ? date.format('dddd, MMMM D, YYYY h:mm A') : 'Invalid Date';

  const tooltipContent = (
    <Box sx={{ p: 1.5 }}>
      <Typography variant="body2" sx={{ color: 'white', fontSize: '13px', textAlign: 'center' }}>
        {formattedDate}
      </Typography>
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

export default DateTooltip;