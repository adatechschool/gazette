import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'; // Import du plugin React
import path from 'path';

export default defineConfig({
	plugins: [TanStackRouterVite(), viteReact(), tsconfigPaths()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@gazette/shared': path.resolve(__dirname, '../../packages/shared/src'),
		},
	},
});
