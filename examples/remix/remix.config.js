/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  /**
   * The wildcard regex in the serverDependenciesToBundle is a fallback to bundle any ESM
   * packages that are dependencies of `@shopify/connect-wallet`.
   *
   * Without the wildcard, the following errors occur:
   *
   * @shopify/blockchain-components is possibly an ESM only package and should be bundled with "serverDependenciesToBundle" in remix.config.js.
   * @reduxjs/toolkit is possibly an ESM only package and should be bundled with "serverDependenciesToBundle" in remix.config.js.
   * @shopify/gate-context-client is possibly an ESM only package and should be bundled with "serverDependenciesToBundle" in remix.config.js.
   */
  serverDependenciesToBundle: ['@shopify/connect-wallet', /^@?wagmi.*/, /.*/],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
