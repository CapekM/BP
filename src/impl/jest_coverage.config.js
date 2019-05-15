module.exports = {
  displayName: 'TEST COVERAGE',
  roots: ['<rootDir>/src'],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  bail: true, // stop when error occurred
  testEnvironment: 'node',
  globalSetup: './src/globalSetupTest.ts',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
};
