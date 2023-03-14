# @shopify/tokengate

## 0.3.0

### Minor Changes

- [#82](https://github.com/Shopify/blockchain-components/pull/82) [`a39e55c`](https://github.com/Shopify/blockchain-components/commit/a39e55c8a7a58f36693212bf36b1a37a3a0462be) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Add tracking events for rendering components

- [#74](https://github.com/Shopify/blockchain-components/pull/74) [`d3b80f4`](https://github.com/Shopify/blockchain-components/commit/d3b80f40d2f7f667d02d08507abe25f8234a18f1) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Import ClientAnalytics from '@shopify/blockchain-components' package

- [#92](https://github.com/Shopify/blockchain-components/pull/92) [`b92d802`](https://github.com/Shopify/blockchain-components/commit/b92d80233316afe8eb9549f54724e0b89059936d) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Add Tokengate events

### Patch Changes

- Updated dependencies [[`d3b80f4`](https://github.com/Shopify/blockchain-components/commit/d3b80f40d2f7f667d02d08507abe25f8234a18f1), [`a39e55c`](https://github.com/Shopify/blockchain-components/commit/a39e55c8a7a58f36693212bf36b1a37a3a0462be), [`d434861`](https://github.com/Shopify/blockchain-components/commit/d43486128778301dfdb62ed68ca6f899fa267e2e), [`b92d802`](https://github.com/Shopify/blockchain-components/commit/b92d80233316afe8eb9549f54724e0b89059936d), [`f71cbec`](https://github.com/Shopify/blockchain-components/commit/f71cbec2bda512b71cab80e5ac21266c695444f7)]:
  - @shopify/blockchain-components@0.1.0

## 0.2.0

### Minor Changes

- [#26](https://github.com/Shopify/blockchain-components/pull/26) [`28b708e`](https://github.com/Shopify/blockchain-components/commit/28b708e19a8e4bfb700e77f0361a9c9e8581c759) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Display discount on unlocked title

- [#48](https://github.com/Shopify/blockchain-components/pull/48) [`c8a3cf1`](https://github.com/Shopify/blockchain-components/commit/c8a3cf16955e090e7c74c1641640d613d7ec4f44) Thanks [@jamiely](https://github.com/jamiely)! - Adds description prop to Condition type and makes collectionAddress optional.

- [#39](https://github.com/Shopify/blockchain-components/pull/39) [`244a138`](https://github.com/Shopify/blockchain-components/commit/244a138c50cd3230c01ca7f097e4b0bc26e48bfd) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Adds new ClientAnalytics component

### Patch Changes

- [#72](https://github.com/Shopify/blockchain-components/pull/72) [`c69d654`](https://github.com/Shopify/blockchain-components/commit/c69d654fd46d72ee53c8775dc254d3888670aaed) Thanks [@QuintonC](https://github.com/QuintonC)! - Removes internal packages (shared + tsconfig) from package.json

- [#44](https://github.com/Shopify/blockchain-components/pull/44) [`235a1ba`](https://github.com/Shopify/blockchain-components/commit/235a1baec8900cd1d6ea92c5e3ee08c17e8309b0) Thanks [@QuintonC](https://github.com/QuintonC)! - Addresses an issue with styled components and CJS support. Since the packages support ESM, some frameworks (Next.js) will try to transpile the packages and use a CommonJS version of styled-components we needed to re-export styled-components with a .default key for CJS support.

- [#31](https://github.com/Shopify/blockchain-components/pull/31) [`c75ce7e`](https://github.com/Shopify/blockchain-components/commit/c75ce7eb002a1eec43cd5939eebd75d749e0f4d8) Thanks [@QuintonC](https://github.com/QuintonC)! - Addresses an issue where types that are used from the internal shared package were not compiled and exported as expected. This resulted in an issue where providing a theme to any of the providers would result in a type mismatch, but also made it impossible to extend or inherit any of the default themes.

## 0.1.0
