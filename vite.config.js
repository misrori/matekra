import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path:
//   - helyi dev: '/'
//   - GitHub Pages build (CI): VITE_BASE='/matek/'
//   - statikus file:// zip: VITE_BASE='./'
export default defineConfig({
  plugins: [react()],
  base: '/matekra/',
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/katex')) return 'katex';
          if (id.includes('node_modules/react-router')) return 'router';
          if (id.includes('node_modules/react')) return 'react';
          if (id.includes('/src/tasks/')) {
            const m = id.match(/\/src\/tasks\/([^/]+)\//);
            if (m) return `tasks-${m[1]}`;
          }
        },
      },
    },
  },
});
