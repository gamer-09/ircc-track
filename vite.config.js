import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Zero-Babel, Pure Built-in JSX Configuration
// Eliminates the `vite:react-babel` deprecation warnings in Vite 8 / Rolldown
// and avoids Windows Defender native .node binary blocks.
export default defineConfig({
  plugins: [
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: true,
    cors: true
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: true,
    cors: true
  }
});
