import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: mode === 'development' ? 'http://localhost:3000' : 'https://bestiasapi.onrender.com',
        changeOrigin: true,
      },
    },
  },
}));
