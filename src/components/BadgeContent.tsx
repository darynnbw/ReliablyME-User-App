import { Box, Typography } from '@mui/material';

interface BadgeContentProps {
  badgeType: string;
  size: 'small' | 'large' | 'list-item-large';
}

const badgeConfig: { [key: string]: { color: string; displayText: string } } = {
  'Promise Kept General': { color: '#ff7043', displayText: 'PROMISE\nKEPT' },
  'Attendance': { color: '#1976d2', displayText: 'ATTENDANCE' },
  'Teamwork': { color: '#4caf50', displayText: 'TEAMWORK' },
  'Leadership': { color: '#9c27b0', displayText: 'LEADERSHIP' },
  'COMMUNICATION EFFECTIVENESS - nudging': { color: '#673ab7', displayText: 'COMMUNICATION\nEFFECTIVENESS' },
  // Add more badge types as needed
};

const BadgeContent = ({ badgeType, size }: BadgeContentProps) => {
  const config = badgeConfig[badgeType] || badgeConfig['Promise Kept General']; // Fallback to general
  const badgeColor = config.color;
  const displayText = config.displayText;

  let dimensions;
  switch (size) {
    case 'small':
      dimensions = {
        width: 20,
        height: 24,
        innerPadding: 0.2,
        borderWidth: 1,
        logoMarginBottom: 0.2,
        logoReliablyFontSize: '5px',
        logoMeFontSize: '7px',
        titleFontSize: '4.5px',
        titleMarginBottom: 0.2,
        bottomLogoFontSize: '2px',
      };
      break;
    case 'large':
      dimensions = {
        width: 114,
        height: 138,
        innerPadding: 1.14,
        borderWidth: 4.6,
        logoMarginBottom: 1.72,
        logoReliablyFontSize: '11.48px',
        logoMeFontSize: '18.36px',
        titleFontSize: '10.32px',
        titleMarginBottom: 1.14,
        bottomLogoFontSize: '6.89px',
      };
      break;
    case 'list-item-large': // New size for list items
      dimensions = {
        width: 83, // Scaled from 114 to fit 100px height (114 * (100/138))
        height: 100, // Target height for the list item
        innerPadding: 1.14 * (100 / 138), // Scale padding
        borderWidth: 4.6 * (100 / 138), // Scale border
        logoMarginBottom: 1.72 * (100 / 138), // Scale logo margin
        logoReliablyFontSize: `${parseFloat(config.displayText === 'PROMISE\nKEPT' ? '11.48' : '11.48') * (100 / 138)}px`, // Scale font size
        logoMeFontSize: `${parseFloat(config.displayText === 'PROMISE\nKEPT' ? '18.36' : '18.36') * (100 / 138)}px`, // Scale font size
        titleFontSize: `${parseFloat(config.displayText === 'PROMISE\nKEPT' ? '10.32' : '10.32') * (100 / 138)}px`, // Scale font size
        titleMarginBottom: 1.14 * (100 / 138), // Scale title margin
        bottomLogoFontSize: `${parseFloat('6.89') * (100 / 138)}px`, // Scale bottom logo font size
      };
      break;
    default:
      dimensions = {
        width: 20,
        height: 24,
        innerPadding: 0.2,
        borderWidth: 1,
        logoMarginBottom: 0.2,
        logoReliablyFontSize: '5px',
        logoMeFontSize: '7px',
        titleFontSize: '4.5px',
        titleMarginBottom: 0.2,
        bottomLogoFontSize: '2px',
      };
  }

  return (
    <Box
      sx={{
        width: dimensions.width,
        height: dimensions.height,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
          boxShadow: size === 'large' ? `0 6.9px 23px ${badgeColor}30` : 'none',
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
              letterSpacing: size === 'large' ? '0.57px' : '0.2px',
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
              letterSpacing: size === 'large' ? '-0.57px' : '-0.2px',
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
            letterSpacing: size === 'large' ? '0.35px' : '0.15px',
          }}
        >
          {displayText}
        </Typography>
        {/* Bottom Logo - only for large and list-item-large */}
        {(size === 'large' || size === 'list-item-large') && (
          <Typography
            sx={{
              fontSize: dimensions.bottomLogoFontSize,
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

export default BadgeContent;