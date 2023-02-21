module.exports = {
  moduleNameMapper: {
    '^tests/(.*)': '<rootDir>/tests/$1',
  },
  setupFiles: [`${__dirname}/setupTests.js`],
  testEnvironment: 'jsdom',
  transform: {
    '\\.(js|tsx?)$': [
      'babel-jest',
      {targets: 'current node', envName: 'test', rootMode: 'upward'},
    ],
  },
  watchPathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules'],
};
