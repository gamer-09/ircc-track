import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Cross-Platform Pure-JS Configuration (Zero Native C++/Rust .node Binaries for 100% Windows Defender Compatibility)
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      // Uses standard Fast Refresh without unverified native binary bindings
      jsxRuntime: 'automatic'
    })
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
