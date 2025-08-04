import React from 'react';
import { Tooltip, Box } from '@mui/material';
import BadgeSvgIcon from './BadgeSvgIcon';

const BadgeTooltip: React.FC = () => {
  const tooltipContent = (
    <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: 2, boxShadow: 3 }}>
      <BadgeSvgIcon size={50} />
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
            bgcolor: 'transparent',
            p: 0,
            boxShadow: 'none',
          },
        },
        arrow: {
          sx: {
            color: 'white',
          },
        },
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        <BadgeSvgIcon size={18} />
      </span>
    </Tooltip>
  );
};

export default BadgeTooltip;