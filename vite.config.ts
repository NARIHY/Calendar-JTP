import { defineConfig } from 'vite';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  root: 'View',
  build: {
    outDir: '../dist',
    sourcemap: true,
    rollupOptions: {
      // Si vous utilisez Rollup, configurez les options si nécessaire
    }
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    createHtmlPlugin({
      inject: {
        inject: '<link rel="stylesheet" href="/css/style.css">',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'View'),
    },
  },
});
