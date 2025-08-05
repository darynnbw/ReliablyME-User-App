import { Box, Tooltip } from '@mui/material';
import BadgeContent from './BadgeContent'; // Import the new component

interface BadgeIconWithTooltipProps {
  badgeType: string; // New prop to specify badge type
}

const BadgeIconWithTooltip: React.FC<BadgeIconWithTooltipProps> = ({ badgeType }) => {
  const tooltipContent = (
    <Box sx={{ p: 1 }}>
      <BadgeContent badgeType={badgeType} size="large" />
    </Box>
  );

  return (
    <Tooltip
      title={tooltipContent}
      placement="right"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'white',
            p: 0,
            boxShadow: 3,
          },
        },
      }}
    >
      <Box sx={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}>
        <BadgeContent badgeType={badgeType} size="small" />
      </Box>
    </Tooltip>
  );
};

export default BadgeIconWithTooltip;