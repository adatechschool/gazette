export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.jest.json' }],
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/(.*)': '<rootDir>',
    '^~/(.*)$': '<rootDir>/../$1',
  },
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)',
    'src/**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$))',
  ],
  extensionsToTreatAsEsm: ['.ts'],
  verbose: true,
  detectOpenHandles: true,
}
