const config = require('./base.jest.config.js');

module.exports = {
  ...config,
  testEnvironment: 'jsdom',
};
