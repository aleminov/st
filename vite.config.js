import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Переносим кеш Vite в другую директорию, чтобы обойти проблемы с правами на node_modules/.vite
export default defineConfig({
  plugins: [vue()],
  cacheDir: 'node_modules/.vite-alt',
  optimizeDeps: {
    force: true
  },
  server: {
    port: 5173
  }
});


