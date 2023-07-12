# @shopify/connect-wallet

## 3.0.1

### Patch Changes

- [#208](https://github.com/Shopify/blockchain-components/pull/208) [`749a19a`](https://github.com/Shopify/blockchain-components/commit/749a19a9791f99d52035d9790f51cbccc181445c) Thanks [@QuintonC](https://github.com/QuintonC)! - Upgrades TailwindCSS to v3.3.2.

  This also removes the use of `@tailwindcss/aspect-ratio` and `@tailwindcss/line-clamp` as they are now included in the Tailwind package.

  For `@shopify/connect-wallet`, this includes a minor update to the `QrCode` component displayed within the `ScanScreen`. This change was made to address the removal of `@tailwindcss/aspect-ratio`. Additionally, the `QRCode` was updated to make use of the `Spinner` component which creates a better loading state while the WalletConnect URI is loading.

## 3.0.0

### Major Changes

- [#7](https://github.com/Shopify/blockchain-components/pull/7) [`b49ba23`](https://github.com/Shopify/blockchain-components/commit/b49ba23a8189ffd588d8d83cfe7c8dfb2d60befc) Thanks [@QuintonC](https://github.com/QuintonC)! - This change include the following updates:

  - All usage of WalletConnect v1 connectors have been replaced with v2 connectors. [Read more about the deprecation of WalletConnect v1](https://medium.com/walletconnect/t-1-month-last-call-to-migrate-before-the-walletconnect-v1-0-shutdown-692ffa9520aa).
  - `buildConnectors` function now requires an additional prop, `projectId`.
  - Any usage which does not provide connectors to the `ConnectWalletProvider` will no longer operate as expected. Previously, the package would build the connectors in place for you. This is no longer the case as we cannot provide a WalletConnect v2 `projectId` to create the fallback and mobile connectors in place for your instance. You **must** provide connectors to the context provider in order for the package to function.
  - The `getDefaultConnectors` function has been removed in favor of using `buildConnectors`.

  To update your instance, please ensure that any usage of `buildConnectors` includes a `projectId` value with a valid WalletConnect `projectId`.

  To obtain a WalletConnect `projectId`, visit the [WalletConnect cloud portal](https://cloud.walletconnect.com/sign-in).

  To migrate, make the following changes:

  ```diff
  import {buildConnectors} from '@shopify/connect-wallet';
  import {configureChains, createConfig, mainnet} from 'wagmi';
  import {publicProvider} from 'wagmi/providers/public';

  const {chains, publicClient, webSocketPublicClient} = configureChains(
    [mainnet],
    [publicProvider()],
  );

  const {connectors, wagmiConnectors} = buildConnectors({
    chains,
  + projectId: "YOUR_PROJECT_ID"
  });

  const config = createConfig({
    autoConnect: true,
    connectors: wagmiConnectors,
    publicClient,
    webSocketPublicClient,
  });

  export {chains, config, connectors};
  ```

### Patch Changes

- [#205](https://github.com/Shopify/blockchain-components/pull/205) [`2e7f87e`](https://github.com/Shopify/blockchain-components/commit/2e7f87ea932b3a21abe6b55490b75df75a960bab) Thanks [@QuintonC](https://github.com/QuintonC)! - This patch addresses a minor bug relating to state cleanup when a modal is closed. Prior to this patch, an issue was present when closing the modal that would leave the state visible. This was an issue particularly when the user was connecting with a connector which was based on WalletConnect as the QR Code would be cleared. This addresses that by calling the `reset` state method which will clear the modal state and properly. In addition, functionality to handle disconnect events during signature flows was added for modal close events.

## 2.0.0

### Major Changes

- [#176](https://github.com/Shopify/blockchain-components/pull/176) [`cc7d7fc`](https://github.com/Shopify/blockchain-components/commit/cc7d7fc06e871f9e26baa5edd0c160ca51716939) Thanks [@QuintonC](https://github.com/QuintonC)! - This update includes a dependency upgrade from wagmi@0.10.4 to wagmi@1. As part of this upgrade, we no longer make use of the ethers package, but instead make use of [viem](https://viem.sh).

## 1.3.1

### Patch Changes

- [#199](https://github.com/Shopify/blockchain-components/pull/199) [`74ec3db`](https://github.com/Shopify/blockchain-components/commit/74ec3dba105bae93e58d9091df61fa10742801d0) Thanks [@QuintonC](https://github.com/QuintonC)! - Addressed a minor bug where after connecting, if an attempt to reconnect without refreshing occurs the modal would show a connecting state rather than a clean state.

## 1.3.0

### Minor Changes

- [#196](https://github.com/Shopify/blockchain-components/pull/196) [`9700f25`](https://github.com/Shopify/blockchain-components/commit/9700f255a842b3e38b21d47cfb610cde971a5db8) Thanks [@QuintonC](https://github.com/QuintonC)! - Removes usage of Redux and Redux Toolkit in favor of a non-contextual state management package.

### Patch Changes

- [#191](https://github.com/Shopify/blockchain-components/pull/191) [`4fd5ab4`](https://github.com/Shopify/blockchain-components/commit/4fd5ab434d99e65c1902789be77f1728a77ce8be) Thanks [@QuintonC](https://github.com/QuintonC)! - A bug was patched for the Popover component and its use of document.body which was causing errors in some frameworks.

- [#193](https://github.com/Shopify/blockchain-components/pull/193) [`baeaf5f`](https://github.com/Shopify/blockchain-components/commit/baeaf5f39fa6f68bf9d09505d12097f89588f88a) Thanks [@QuintonC](https://github.com/QuintonC)! - Addresses a style collision with TailwindCSS preflight plugin where the background styles of buttons are removed.

- [#190](https://github.com/Shopify/blockchain-components/pull/190) [`256b4df`](https://github.com/Shopify/blockchain-components/commit/256b4dfb0b221b167ba93589add3c7d48cb39e8a) Thanks [@QuintonC](https://github.com/QuintonC)! - Removed i18n context debug logging in non-development environments.

- [#189](https://github.com/Shopify/blockchain-components/pull/189) [`e97ea85`](https://github.com/Shopify/blockchain-components/commit/e97ea85ed00311c7cea932beecfa8d7279346d61) Thanks [@QuintonC](https://github.com/QuintonC)! - This patch addresses an issue where the package was not setting the `NODE_ENV` variable during compile, resulting in unexpected behavior when utilizing the `process.env.NODE_ENV` value to add conditional functionality.

- Updated dependencies [[`e97ea85`](https://github.com/Shopify/blockchain-components/commit/e97ea85ed00311c7cea932beecfa8d7279346d61)]:
  - @shopify/blockchain-components@1.0.1
  - @shopify/gate-context-client@1.0.1

## 1.2.1

### Patch Changes

- [#182](https://github.com/Shopify/blockchain-components/pull/182) [`34d96d0`](https://github.com/Shopify/blockchain-components/commit/34d96d03cabcac3985a4fdfa91b97e2266b8cb74) Thanks [@QuintonC](https://github.com/QuintonC)! - Addressed a minor bug that would close the connection modal when navigating back during a signature flow.

## 1.2.0

### Minor Changes

- [#172](https://github.com/Shopify/blockchain-components/pull/172) [`6915e32`](https://github.com/Shopify/blockchain-components/commit/6915e3269cdf0d972af5fa9d6a42bed1fc0457fd) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Adds optional `label` to ConnectButton in `connect-wallet` package that will overwrite the default text.

## 1.1.0

### Minor Changes

- [#169](https://github.com/Shopify/blockchain-components/pull/169) [`d5443e5`](https://github.com/Shopify/blockchain-components/commit/d5443e508e3effae71e95fcbd6371a73d72d003d) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Adds new prop `customTitles` to ConnectWallet package that allows the developers to customize the modal header of the ConnectScreen.

## 1.0.2

### Patch Changes

- Updated dependencies [[`930c48d`](https://github.com/Shopify/blockchain-components/commit/930c48d9562ec74092a5cc83475416595e80f619)]:
  - @shopify/blockchain-components@1.0.0
  - @shopify/gate-context-client@1.0.0

## 1.0.1

### Patch Changes

- [#159](https://github.com/Shopify/blockchain-components/pull/159) [`131142f`](https://github.com/Shopify/blockchain-components/commit/131142fb33640687b8c8e8aa749a1d1d20440491) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Update Tailwind config to use pixels instead of REMs. We noticed that if the components were included in an application that has smaller or larger root font-size, the styling broke. We made the decision to use pixels instead.

## 1.0.0

### Major Changes

- [#87](https://github.com/Shopify/blockchain-components/pull/87) [`d5e4b12`](https://github.com/Shopify/blockchain-components/commit/d5e4b126ffaa1ee7567e4750bb9cb5148de96472) Thanks [@QuintonC](https://github.com/QuintonC)! - This change migrates the styling library to TailwindCSS, requiring an update to your implementation. You must now import the CSS exported from the package.

  Migration steps:

  1. Remove any custom `theme` value you might have provided to either `ConnectWalletProvider` or `Tokengate`.
  2. At your application's entry point, import for the styles for the package you are using.

  - For `@shopify/connect-wallet` usage in Create React App, Next.js, or Vite, add the following to your application's entry point: `import '@shopify/connect-wallet/styles.css';`
  - For `@shopify/tokengate` usage in Create React App, Next.js, or Vite, add the following to your application's entry point: `import '@shopify/tokengate/styles.css';`
  - For usage in Remix, view the Remix example: https://github.com/Shopify/blockchain-components/tree/main/examples/remix

  3. If you were using custom themes, view the custom theme documentation: https://shopify.dev/docs/api/blockchain/theming

### Minor Changes

- [#150](https://github.com/Shopify/blockchain-components/pull/150) [`7f08d0a`](https://github.com/Shopify/blockchain-components/commit/7f08d0ad8480a0275a7994fbe0283578b5655ff1) Thanks [@lesliexin](https://github.com/lesliexin)! - [delegate-cash] Adding an informational delegate cash screen to the connect wallet modal.

- [#147](https://github.com/Shopify/blockchain-components/pull/147) [`6f3958b`](https://github.com/Shopify/blockchain-components/commit/6f3958b22551f43c34d1918c20a38438c609d889) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - [delegate-cash] Adds vaults list to ConnectButton popover

- [#140](https://github.com/Shopify/blockchain-components/pull/140) [`fc8c99c`](https://github.com/Shopify/blockchain-components/commit/fc8c99c41c1ccd45505e7d005d94416ee92da6aa) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - [delegate-cash] Add redux logic for supporting delegate.cash delegations

- [#148](https://github.com/Shopify/blockchain-components/pull/148) [`1b2e8e9`](https://github.com/Shopify/blockchain-components/commit/1b2e8e93805bee851659664e76af75430b28fe42) Thanks [@lesliexin](https://github.com/lesliexin)! - [delegate-cash] Attributing vaults to the order when the delegations are fetched

- [#55](https://github.com/Shopify/blockchain-components/pull/55) [`45f4f65`](https://github.com/Shopify/blockchain-components/commit/45f4f655735f08a528b7b3df2cb77d8e06992c55) Thanks [@lesliexin](https://github.com/lesliexin)! - Adding suppport for custom connectors to be added to the list of supported wallets in the Connect Wallet modal.

  This change deprecates `getDefaultConnectors` and replaces it with `buildConnectors`, which supports adding custom connectors and editing the default connectors.

  To update your project to align with these changes, see https://shopify.dev/docs/api/blockchain/components/connect-wallet.md#connectors.

- [#82](https://github.com/Shopify/blockchain-components/pull/82) [`a39e55c`](https://github.com/Shopify/blockchain-components/commit/a39e55c8a7a58f36693212bf36b1a37a3a0462be) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Add tracking events for rendering components

- [#74](https://github.com/Shopify/blockchain-components/pull/74) [`d3b80f4`](https://github.com/Shopify/blockchain-components/commit/d3b80f40d2f7f667d02d08507abe25f8234a18f1) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Import ClientAnalytics from '@shopify/blockchain-components' package

- [#141](https://github.com/Shopify/blockchain-components/pull/141) [`eeda4f7`](https://github.com/Shopify/blockchain-components/commit/eeda4f701144f9601243a18980385b16e328bd93) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - [delegate-cash] Add enableDelegateCash prop to ConnectWalletProvider

- [#145](https://github.com/Shopify/blockchain-components/pull/145) [`e600a64`](https://github.com/Shopify/blockchain-components/commit/e600a640c210eb6a5afa84898bd4ff5574ac1ed2) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - [delegate-cash] Add delegate-cash support to the connect button.

### Patch Changes

- [#138](https://github.com/Shopify/blockchain-components/pull/138) [`a947420`](https://github.com/Shopify/blockchain-components/commit/a947420030755ee417e2f92b5678795572dfe283) Thanks [@QuintonC](https://github.com/QuintonC)! - Moves the connect-wallet Popover component to the Shared package so Popover can be reused in the Tokengate package.

- [#142](https://github.com/Shopify/blockchain-components/pull/142) [`2bd1f92`](https://github.com/Shopify/blockchain-components/commit/2bd1f92fe8a2d55ac37fa7225a764e9b4db1384f) Thanks [@QuintonC](https://github.com/QuintonC)! - Fixes a bug that prevented the signature modal from reappearing when the a signature was requested.

- [#157](https://github.com/Shopify/blockchain-components/pull/157) [`2509c2f`](https://github.com/Shopify/blockchain-components/commit/2509c2f509320a8ddccd53445ac1f6494a639178) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - [delegate-cash] Fixes some visibility logic for components realted to delegate-cash.

- [#153](https://github.com/Shopify/blockchain-components/pull/153) [`fc6fd31`](https://github.com/Shopify/blockchain-components/commit/fc6fd31cca13821309f5c4c767080e4391f8c64f) Thanks [@QuintonC](https://github.com/QuintonC)! - Addressed a bug in both `@shopify/connect-wallet` and `@shopify/tokengate` where some text elements would not have the expected text color. To address this, text elements were given a "primary" text color. Colors should be overridden using the theming capabilities outlined here: https://shopify.dev/docs/api/blockchain/theming

- [#158](https://github.com/Shopify/blockchain-components/pull/158) [`fc6f32d`](https://github.com/Shopify/blockchain-components/commit/fc6f32daabef6c31f8c7795f0496ce2fe80da229) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - [delegate-cash] Fix connect wallet flow so that the vaults are sent in the `onConnect` callback.

- Updated dependencies [[`e77924e`](https://github.com/Shopify/blockchain-components/commit/e77924e247f45efe331b540aca22b62d4e700999), [`4a50933`](https://github.com/Shopify/blockchain-components/commit/4a5093341f0c97db94b96974b65a86bfda84c4c4), [`d3b80f4`](https://github.com/Shopify/blockchain-components/commit/d3b80f40d2f7f667d02d08507abe25f8234a18f1), [`1b2e8e9`](https://github.com/Shopify/blockchain-components/commit/1b2e8e93805bee851659664e76af75430b28fe42), [`a39e55c`](https://github.com/Shopify/blockchain-components/commit/a39e55c8a7a58f36693212bf36b1a37a3a0462be), [`398258a`](https://github.com/Shopify/blockchain-components/commit/398258a062fb43aea070872e42c40a49fb789335), [`d434861`](https://github.com/Shopify/blockchain-components/commit/d43486128778301dfdb62ed68ca6f899fa267e2e), [`fdfc405`](https://github.com/Shopify/blockchain-components/commit/fdfc40547d68f0165c57c6ed9c591584c1dc494a), [`3839cd6`](https://github.com/Shopify/blockchain-components/commit/3839cd6293d239549688cff640b61a8045501be9), [`c61578b`](https://github.com/Shopify/blockchain-components/commit/c61578b4898754ea740130529a2e063beee04853), [`b92d802`](https://github.com/Shopify/blockchain-components/commit/b92d80233316afe8eb9549f54724e0b89059936d), [`f71cbec`](https://github.com/Shopify/blockchain-components/commit/f71cbec2bda512b71cab80e5ac21266c695444f7)]:
  - @shopify/blockchain-components@0.1.0
  - @shopify/gate-context-client@0.2.0

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
