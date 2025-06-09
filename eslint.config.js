import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,
  ignores: ['**/node_modules/**', '**/dist/**', '.next/**', 'coverage/**'],
  rules: {
    'no-console': 'warn',
  },
  prettier: {
    singleQuote: true,
    semi: false,
    trailingComma: 'all',
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
  },
})
