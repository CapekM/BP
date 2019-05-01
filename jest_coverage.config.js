module.exports = {
  displayName: 'TEST COVERAGE',
  bail: true, // stop when error occurred
  testEnvironment: 'node',
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  globalSetup: './src/test/globalSetupTest.ts',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
};
