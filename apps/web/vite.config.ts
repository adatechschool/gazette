import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths" 
import { TanStackRouterVite } from '@tanstack/router-plugin/vite' // Import du plugin React

export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': '/src',  // Alias pour le dossier src si nécessaire
    },
  },
});
