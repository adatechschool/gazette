// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu(
  // Configures for antfu's config and global rules
  {
    react: true,
    css: true,
    html: true,
    ignores: [
      '**/dist/',
      '**/temp/',
      'ai-research/',
      'apps/backoffice/src/routeTree.gen.ts',
      'apps/api/yaak/',
      'apps/backoffice/src/components/ui/',
      'packages/nest-crud-helpers',
    ],
  },
  // Starting from the second arguments they are ESLint Flat Configs
  // Careful, antfu renames some plugins for consistency https://github.com/antfu/eslint-config?tab=readme-ov-file#plugins-renaming
  {
    files: ['apps/api/**/*.ts', 'apps/api/**/*.json'],
    rules: {
      'ts/consistent-type-imports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      'node/prefer-global/process': ['error', 'always'],
    },
  },
  {
    files: ['apps/backend/**/*.ts'],
    rules: {
      'ts/consistent-type-imports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      'node/prefer-global/process': ['error', 'always'],
    },
  },
)
