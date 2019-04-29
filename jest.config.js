module.exports = {
  displayName: 'TEST',
  roots: ['<rootDir>/src'],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  bail: true, // stop when error occurred
  testEnvironment: 'node',
  globalSetup: './src/globalSetupTest.ts',
};
