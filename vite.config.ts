import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', '@emotion/react', '@emotion/styled', '@mui/icons-material'],
    include: [
      '@mui/material',
      '@mui/material/utils',
      'hoist-non-react-statics',
      '@mui/x-date-pickers-pro',
      '@mui/x-date-pickers',
    ],
  },
});