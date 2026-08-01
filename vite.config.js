import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true, // Listen on all local IP addresses (127.0.0.1 & localhost)
    port: 3000,
    strictPort: false
  }
});
