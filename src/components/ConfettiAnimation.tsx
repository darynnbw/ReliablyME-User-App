import React from 'react';
import { Box, styled, keyframes } from '@mui/material';

const confettiFly = (x: number, y: number) => keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(${x}px, ${y}px) rotate(720deg);
  }
`;

const ConfettiPiece = styled('div')<{ x: number; y: number; color: string; duration: number; delay: number }>`
  position: absolute;
  width: 6px;
  height: 12px;
  background: ${({ color }) => color};
  top: 50%;
  left: 50%;
  opacity: 0;
  transform-origin: center;
  animation: ${({ x, y }) => confettiFly(x, y)} ${({ duration }) => duration}s ${({ delay }) => delay}s forwards;
`;

const colors = ['#ff7043', '#1976d2', '#4caf50', '#ffeb3b', '#9c27b0'];
const numConfetti = 30;

const ConfettiAnimation: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', width: 80, height: 80 }}>
      {Array.from({ length: numConfetti }).map((_, i) => {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 60 + 20;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const color = colors[i % colors.length];
        const duration = Math.random() * 0.5 + 0.8; // 0.8s to 1.3s
        const delay = Math.random() * 0.2;

        return (
          <ConfettiPiece
            key={i}
            x={x}
            y={y}
            color={color}
            duration={duration}
            delay={delay}
          />
        );
      })}
    </Box>
  );
};

export default ConfettiAnimation;