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
    // Mapping pour les imports depuis src
    '^@/(.*)': '<rootDir>',
    // Si vous avez des imports depuis la racine du projet
    '^~/(.*)$': '<rootDir>/../$1',
  },
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)',
    'src/**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$))',
  ],
  extensionsToTreatAsEsm: ['.ts'],
}
