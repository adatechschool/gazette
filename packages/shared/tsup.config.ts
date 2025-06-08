import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	target: 'es2022',
	dts: {
		resolve: true,
		entry: 'src/index.ts',
	},
	splitting: false,
	sourcemap: true,
	clean: true,
	treeshake: true,
	tsconfig: 'tsconfig.json',
});
