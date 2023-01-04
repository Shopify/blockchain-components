module.exports = {
  moduleNameMapper: {
    '^tests/(.*)': '<rootDir>/tests/$1',
  },
  setupFiles: ['./setupTests.js'],
  testEnvironment: 'jsdom',
  transform: {
    '\\.(js|tsx?)$': [
      'babel-jest',
      {targets: 'current node', envName: 'test', rootMode: 'upward'},
    ],
  },
  watchPathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules'],
};
