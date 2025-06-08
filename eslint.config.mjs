// eslint.config.mjs
// @ts-check
import { fileURLToPath } from 'url';
import antfu from '@antfu/eslint-config'

const __filename = fileURLToPath(import.meta.url);

export default await antfu(
  // Configuration globale d'antfu
  {
    typescript: true,
    react: true,
    formatters: true,
    ignores: [
      '**/dist',
      '**/node_modules',
      'apps/**/build',
    ],
  },

  // Configurations spécifiques (ESLint Flat Configs)
  {
    // Configuration commune pour le backend
    files: ['apps/backend/**/*.ts'],
    rules: {
      'ts/consistent-type-imports': 'off',
      'node/prefer-global/process': ['error', 'always'],
    },
  },

  {
    // Configuration spécifique pour le frontend
    files: ['apps/frontend/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  {
    // Configuration commune
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'style/brace-style': ['error', '1tbs'],
    },
  },
)