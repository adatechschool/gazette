// eslint.config.mjs
// @ts-check
import antfu from '@antfu/eslint-config'

export default await antfu(
  {
    typescript: true,
    react: true,
    formatters: {
      css: true,
      html: true,
      markdown: true,
    },
    ignores: [
      '**/dist',
      '**/node_modules',
      'apps/**/build',
      '**/.next',
      '**/coverage',
    ],
  },

  {
    files: ['**/*.md'],
    rules: {
      'no-irregular-whitespace': 'off',
    },
  },

  {
    files: ['apps/backend/**/*.ts'],
    rules: {
      'ts/consistent-type-imports': 'off',
      'node/prefer-global/process': 'off',
      'no-console': 'warn',
      'ts/no-explicit-any': 'off',
      'ts/no-non-null-assertion': 'off',
    },
  },

  {
    files: ['apps/frontend/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'node/prefer-global/process': 'off',
      'unused-imports/no-unused-vars': ['error', {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      'ts/no-use-before-define': ['error', {
        functions: false,
        classes: false,
        variables: true,
        typedefs: false,
      }],
    },
  },

  {
    files: ['packages/shared/**/*.ts'],
    rules: {
      'ts/consistent-type-imports': 'off',
      'no-console': 'warn',
    },
  },

  {
    files: ['**/*.json', '**/*.jsonc'],
    rules: {
      'jsonc/sort-keys': 'off',
    },
  },

  {
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },
)
