import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import { Box } from '@mui/material';

const drawCircle = keyframes`
  to { stroke-dashoffset: 0; }
`;

const drawStar = keyframes`
  to { stroke-dashoffset: 0; }
`;

const fill = keyframes`
  to { fill-opacity: 1; }
`;

const AnimatedCircle = styled('circle')({
  fill: '#FFD700',
  stroke: '#DAA520',
  strokeWidth: 4,
  strokeDasharray: 390,
  strokeDashoffset: 390,
  animation: `${drawCircle} 0.6s ease-out forwards`,
});

const AnimatedStar = styled('polygon')({
  fill: '#FFFFFF',
  fillOpacity: 0,
  stroke: '#DAA520',
  strokeWidth: 2,
  strokeDasharray: 200,
  strokeDashoffset: 200,
  animation: `${drawStar} 0.5s 0.4s ease-out forwards, ${fill} 0.3s 0.9s ease-out forwards`,
});

const MedalAnimation: React.FC = () => {
  return (
    <Box sx={{ width: 80, height: 80 }}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
        <AnimatedCircle cx="65.1" cy="65.1" r="62.1" />
        <AnimatedStar points="65.1,30.1 78.1,55.1 105.1,55.1 83.6,70.1 91.1,95.1 65.1,80.1 39.1,95.1 46.6,70.1 25.1,55.1 52.1,55.1" />
      </svg>
    </Box>
  );
};

export default MedalAnimation;