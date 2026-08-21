import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Eagle-Comply/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    watch: {
      usePolling: true,
      interval: 800
    }
  }
}));
