import { defineConfig } from 'vite';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

// Configuration de Vite
export default defineConfig({
  root: 'View', // Répertoire racine des fichiers source
  build: {
    outDir: '../dist', // Répertoire de sortie pour les fichiers construits
    sourcemap: true, // Générer des sourcemaps pour le débogage
  },
  server: {
    port: 3000, // Port par défaut
    open: true, // Ouvrir automatiquement dans le navigateur
  },
  plugins: [
    createHtmlPlugin({
      inject: {
        inject: '<link rel="stylesheet" href="/css/style.css">', // Charger le CSS global
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
