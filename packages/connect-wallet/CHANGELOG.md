# @shopify/connect-wallet

## 0.3.0

### Minor Changes

- [#55](https://github.com/Shopify/blockchain-components/pull/55) [`45f4f65`](https://github.com/Shopify/blockchain-components/commit/45f4f655735f08a528b7b3df2cb77d8e06992c55) Thanks [@lesliexin](https://github.com/lesliexin)! - Adding suppport for custom connectors to be added to the list of supported wallets in the Connect Wallet modal.

  This change deprecates `getDefaultConnectors` and replaces it with `buildConnectors`, which supports adding custom connectors and editing the default connectors.

  To update your project to align with these changes, see https://shopify.dev/docs/api/blockchain/components/connect-wallet.md#connectors.

- [#82](https://github.com/Shopify/blockchain-components/pull/82) [`a39e55c`](https://github.com/Shopify/blockchain-components/commit/a39e55c8a7a58f36693212bf36b1a37a3a0462be) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Add tracking events for rendering components

- [#74](https://github.com/Shopify/blockchain-components/pull/74) [`d3b80f4`](https://github.com/Shopify/blockchain-components/commit/d3b80f40d2f7f667d02d08507abe25f8234a18f1) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Import ClientAnalytics from '@shopify/blockchain-components' package

### Patch Changes

- Updated dependencies [[`d3b80f4`](https://github.com/Shopify/blockchain-components/commit/d3b80f40d2f7f667d02d08507abe25f8234a18f1), [`a39e55c`](https://github.com/Shopify/blockchain-components/commit/a39e55c8a7a58f36693212bf36b1a37a3a0462be), [`d434861`](https://github.com/Shopify/blockchain-components/commit/d43486128778301dfdb62ed68ca6f899fa267e2e), [`b92d802`](https://github.com/Shopify/blockchain-components/commit/b92d80233316afe8eb9549f54724e0b89059936d), [`f71cbec`](https://github.com/Shopify/blockchain-components/commit/f71cbec2bda512b71cab80e5ac21266c695444f7)]:
  - @shopify/blockchain-components@0.1.0

## 0.2.0

### Minor Changes

- [#37](https://github.com/Shopify/blockchain-components/pull/37) [`dfa32ad`](https://github.com/Shopify/blockchain-components/commit/dfa32ad8279d1c4bd6a6e3a0a276e9083f3ec617) Thanks [@QuintonC](https://github.com/QuintonC)! - Addressed an issue with Redux support for non-ESM compliant bundlers such as Webpack

- [#8](https://github.com/Shopify/blockchain-components/pull/8) [`c5bb842`](https://github.com/Shopify/blockchain-components/commit/c5bb8424efa6eb0d633f615ba5ff5c79030351c5) Thanks [@QuintonC](https://github.com/QuintonC)! - Adds support for ENS resolution.

  This feature works only when developers make use of either Alchemy or Infura providers. It cannot be enabled with the public provider as our mission is to ensure stability and not introduce a risk of rate-limited storefronts.

### Patch Changes

- [#72](https://github.com/Shopify/blockchain-components/pull/72) [`c69d654`](https://github.com/Shopify/blockchain-components/commit/c69d654fd46d72ee53c8775dc254d3888670aaed) Thanks [@QuintonC](https://github.com/QuintonC)! - Removes internal packages (shared + tsconfig) from package.json

- [#44](https://github.com/Shopify/blockchain-components/pull/44) [`235a1ba`](https://github.com/Shopify/blockchain-components/commit/235a1baec8900cd1d6ea92c5e3ee08c17e8309b0) Thanks [@QuintonC](https://github.com/QuintonC)! - Addresses an issue with styled components and CJS support. Since the packages support ESM, some frameworks (Next.js) will try to transpile the packages and use a CommonJS version of styled-components we needed to re-export styled-components with a .default key for CJS support.

- [#47](https://github.com/Shopify/blockchain-components/pull/47) [`29184fb`](https://github.com/Shopify/blockchain-components/commit/29184fbf7a1f938aa7cd3678777c0a2b29588056) Thanks [@QuintonC](https://github.com/QuintonC)! - Removes redux-logger to address an ESM based-packed issue with webpack bundlers.

- [#34](https://github.com/Shopify/blockchain-components/pull/34) [`e8cbf63`](https://github.com/Shopify/blockchain-components/commit/e8cbf63280d45d6c6056844be984d54dd7f2d752) Thanks [@QuintonC](https://github.com/QuintonC)! - Resolves an issue with redux-persist storage import using path imports

- [#33](https://github.com/Shopify/blockchain-components/pull/33) [`e803387`](https://github.com/Shopify/blockchain-components/commit/e80338748bbc7810660da2e67d4f4239d74dcd9f) Thanks [@QuintonC](https://github.com/QuintonC)! - Resolves an issue for webpack bundlers that cannot resolve pathed imports

- [#31](https://github.com/Shopify/blockchain-components/pull/31) [`c75ce7e`](https://github.com/Shopify/blockchain-components/commit/c75ce7eb002a1eec43cd5939eebd75d749e0f4d8) Thanks [@QuintonC](https://github.com/QuintonC)! - Addresses an issue where types that are used from the internal shared package were not compiled and exported as expected. This resulted in an issue where providing a theme to any of the providers would result in a type mismatch, but also made it impossible to extend or inherit any of the default themes.

- Updated dependencies [[`c69d654`](https://github.com/Shopify/blockchain-components/commit/c69d654fd46d72ee53c8775dc254d3888670aaed), [`2ee07fd`](https://github.com/Shopify/blockchain-components/commit/2ee07fd05af2f9e2616c536ba261a8cb4f28e048), [`4c181ca`](https://github.com/Shopify/blockchain-components/commit/4c181cadf91969b1559b453c21b12bfc6ce3d73b), [`16fab4c`](https://github.com/Shopify/blockchain-components/commit/16fab4c9491272cb5212c694991b35b3faa48a80)]:
  - @shopify/gate-context-client@0.1.1

## 0.1.0
