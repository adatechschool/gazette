import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';

// Configuration de base partagée
const baseConfig = {
	ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
};

// Configuration TypeScript partagée
const typescriptConfig = {
	files: ['**/*.ts', '**/*.tsx'],
	languageOptions: {
		parser: tseslint.parser,
		parserOptions: {
			project: true,
		},
	},
	plugins: {
		'@typescript-eslint': tseslint.plugin,
		prettier: eslintPluginPrettier,
	},
	rules: {
		// Règles TypeScript communes
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-floating-promises': 'warn',
		'@typescript-eslint/no-unsafe-argument': 'warn',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',

		// Prettier
		'prettier/prettier': 'error',
	},
};

// Configuration spécifique au backend
const backendConfig = {
	files: ['apps/backend/**/*.ts'],
	languageOptions: {
		globals: {
			...globals.node,
			...globals.jest,
		},
		parserOptions: {
			project: './apps/backend/tsconfig.json',
		},
	},
};

// Configuration spécifique au frontend
const frontendConfig = {
	files: ['apps/web/**/*.{ts,tsx}'],
	languageOptions: {
		globals: {
			...globals.browser,
			...globals.es2021,
		},
		parserOptions: {
			project: './apps/web/tsconfig.json',
		},
	},
	rules: {
		// Règles spécifiques au frontend
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
	},
};

export default tseslint.config(
	baseConfig,
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	typescriptConfig,
	backendConfig,
	frontendConfig,
);
