import { Box, Tooltip, Typography } from '@mui/material';

const BadgeContent = ({ size }: { size: 'small' | 'large' }) => {
  const isSmall = size === 'small';
  const badgeColor = '#ff7043'; // For "Promise Kept General"

  const dimensions = {
    width: isSmall ? 20 : 114,
    height: isSmall ? 24 : 138,
    innerPadding: isSmall ? 0.2 : 1.14,
    borderWidth: isSmall ? 1 : 4.6,
    logoMarginBottom: isSmall ? 0.2 : 1.72,
    logoReliablyFontSize: isSmall ? '5px' : '11.48px',
    logoMeFontSize: isSmall ? '7px' : '18.36px',
    titleFontSize: isSmall ? '4.5px' : '10.32px',
    titleMarginBottom: isSmall ? 0.2 : 1.14,
  };

  return (
    <Box
      sx={{
        width: dimensions.width,
        height: dimensions.height,
        position: 'relative',
      }}
    >
      {/* Shield Shape with Gradient */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${badgeColor} 0%, ${badgeColor}dd 50%, ${badgeColor}bb 100%)`,
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 70%, 50% 100%, 0% 70%, 0% 20%)',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      {/* Inner White Area */}
      <Box
        sx={{
          width: `calc(100% - ${dimensions.borderWidth * 2}px)`,
          height: `calc(100% - ${dimensions.borderWidth * 2}px)`,
          background: 'white',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 70%, 50% 100%, 0% 70%, 0% 20%)',
          position: 'absolute',
          top: dimensions.borderWidth,
          left: dimensions.borderWidth,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: dimensions.innerPadding,
        }}
      >
        {/* ReliablyME Logo */}
        <Box sx={{ mb: dimensions.logoMarginBottom, textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: dimensions.logoReliablyFontSize,
              fontWeight: 500,
              color: '#ff7043',
              lineHeight: 1,
            }}
          >
            Reliably
          </Typography>
          <Typography
            sx={{
              fontSize: dimensions.logoMeFontSize,
              fontWeight: 700,
              color: '#1565c0',
              lineHeight: 1,
            }}
          >
            ME
          </Typography>
        </Box>
        {/* Badge Type */}
        <Typography
          sx={{
            fontSize: dimensions.titleFontSize,
            fontWeight: 700,
            color: badgeColor,
            textAlign: 'center',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            mb: dimensions.titleMarginBottom,
            whiteSpace: 'pre-wrap',
          }}
        >
          PROMISE{'\n'}KEPT
        </Typography>
        {/* Bottom Logo - only for large */}
        {!isSmall && (
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
        )}
      </Box>
    </Box>
  );
};

const BadgeIconWithTooltip = () => {
  const tooltipContent = (
    <Box sx={{ p: 1 }}>
      <BadgeContent size="large" />
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
            bgcolor: 'transparent',
            p: 0,
            boxShadow: 3,
          },
        },
      }}
    >
      <Box sx={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}>
        <BadgeContent size="small" />
      </Box>
    </Tooltip>
  );
};

export default BadgeIconWithTooltip;