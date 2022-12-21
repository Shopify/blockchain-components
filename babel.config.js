/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
  presets: [['@shopify/babel-preset', {typescript: true, react: true}]],
  babelrcRoots: [
    '.',
    // Note: The following projects use rootMode: 'upward' to inherit
    // and merge with this root level config.
    './connect-wallet',
    './react-tokengating-app',
    './shared',
    './tokengating-card',
  ],
};
