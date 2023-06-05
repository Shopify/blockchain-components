# @shopify/tokengate

## 1.1.0

### Minor Changes

- [#185](https://github.com/Shopify/blockchain-components/pull/185) [`7dddd29`](https://github.com/Shopify/blockchain-components/commit/7dddd29c8a22b89161f12c339f4f919a7e401929) Thanks [@QuintonC](https://github.com/QuintonC)! - This release adds support for providing custom dynamic values into the `discountCustomTitles` prop.

  Using `{{value}}` will ensure that the discount value is entered into the custom title and formatted as expected.

### Patch Changes

- [#191](https://github.com/Shopify/blockchain-components/pull/191) [`4fd5ab4`](https://github.com/Shopify/blockchain-components/commit/4fd5ab434d99e65c1902789be77f1728a77ce8be) Thanks [@QuintonC](https://github.com/QuintonC)! - A bug was patched for the Popover component and its use of document.body which was causing errors in some frameworks.

- [#193](https://github.com/Shopify/blockchain-components/pull/193) [`baeaf5f`](https://github.com/Shopify/blockchain-components/commit/baeaf5f39fa6f68bf9d09505d12097f89588f88a) Thanks [@QuintonC](https://github.com/QuintonC)! - Addresses a style collision with TailwindCSS preflight plugin where the background styles of buttons are removed.

- [#190](https://github.com/Shopify/blockchain-components/pull/190) [`256b4df`](https://github.com/Shopify/blockchain-components/commit/256b4dfb0b221b167ba93589add3c7d48cb39e8a) Thanks [@QuintonC](https://github.com/QuintonC)! - Removed i18n context debug logging in non-development environments.

- [#189](https://github.com/Shopify/blockchain-components/pull/189) [`e97ea85`](https://github.com/Shopify/blockchain-components/commit/e97ea85ed00311c7cea932beecfa8d7279346d61) Thanks [@QuintonC](https://github.com/QuintonC)! - This patch addresses an issue where the package was not setting the `NODE_ENV` variable during compile, resulting in unexpected behavior when utilizing the `process.env.NODE_ENV` value to add conditional functionality.

- Updated dependencies [[`e97ea85`](https://github.com/Shopify/blockchain-components/commit/e97ea85ed00311c7cea932beecfa8d7279346d61)]:
  - @shopify/blockchain-components@1.0.1

## 1.0.5

### Patch Changes

- [#181](https://github.com/Shopify/blockchain-components/pull/181) [`86c4bbd`](https://github.com/Shopify/blockchain-components/commit/86c4bbd273c81964110c1f58ff07ee8484f63512) Thanks [@QuintonC](https://github.com/QuintonC)! - Updates tokengate error text to utilize `requirements.conditions` and assess whether to use a plural or singular string.

## 1.0.4

### Patch Changes

- [#174](https://github.com/Shopify/blockchain-components/pull/174) [`af72d56`](https://github.com/Shopify/blockchain-components/commit/af72d56cb52cf686643674406e61f0f839cfcd1a) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Adds formatting to the discount value. If the discount is type `fixedAmount`, we format to two decimal places. If the discount is type `percentage`, we remove any decimals.

  Adds support for `string` values to the reaction type discounts.

## 1.0.3

### Patch Changes

- [#170](https://github.com/Shopify/blockchain-components/pull/170) [`5a89047`](https://github.com/Shopify/blockchain-components/commit/5a89047f85688c6d4387b44ab01df2b9ac4e44a9) Thanks [@QuintonC](https://github.com/QuintonC)! - This update adjusts the text color for the `active.end` prop and also removes the year from the text string when the year provided more than 90 days in the future and not the current year.

- [#163](https://github.com/Shopify/blockchain-components/pull/163) [`ca5c1a5`](https://github.com/Shopify/blockchain-components/commit/ca5c1a57568fa83441da2039be18cb8257a7d60f) Thanks [@QuintonC](https://github.com/QuintonC)! - Adds support for `active.end` prop to display an additional text element underneath the provided ConnectButton with detailed information about when the tokengate's benefits will end.

## 1.0.2

### Patch Changes

- Updated dependencies [[`930c48d`](https://github.com/Shopify/blockchain-components/commit/930c48d9562ec74092a5cc83475416595e80f619)]:
  - @shopify/blockchain-components@1.0.0

## 1.0.1

### Patch Changes

- [#159](https://github.com/Shopify/blockchain-components/pull/159) [`131142f`](https://github.com/Shopify/blockchain-components/commit/131142fb33640687b8c8e8aa749a1d1d20440491) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Update Tailwind config to use pixels instead of REMs. We noticed that if the components were included in an application that has smaller or larger root font-size, the styling broke. We made the decision to use pixels instead.

## 1.0.0

### Major Changes

- [#156](https://github.com/Shopify/blockchain-components/pull/156) [`6bd11bf`](https://github.com/Shopify/blockchain-components/commit/6bd11bf77f769865c8978b53e0f021ff1a6a8a63) Thanks [@lesliexin](https://github.com/lesliexin)! - Renaming the discount type from `amount` to `fixedAmount` in the `reaction` prop for the Tokengate component.

  This change was made to ensure naming consistency across the Shopify Blockchain ecosystem.

  To update your project to align with these changes, see the updated docs at https://shopify.dev/docs/api/blockchain/components/tokengate#reaction.

- [#137](https://github.com/Shopify/blockchain-components/pull/137) [`0acc7df`](https://github.com/Shopify/blockchain-components/commit/0acc7df6cacd265d70e5b9075f8d5446388bd5a6) Thanks [@lesliexin](https://github.com/lesliexin)! - Renaming instances of `collectionAddress` to `contractAddress` for consistency with Gates API and for more descriptive naming.

  To update your project to align with these changes, replace all occurances of `collectionAddress` to `contractAddress`.

  For more information, see https://shopify.dev/docs/api/blockchain/components/tokengate.md

- [#87](https://github.com/Shopify/blockchain-components/pull/87) [`d5e4b12`](https://github.com/Shopify/blockchain-components/commit/d5e4b126ffaa1ee7567e4750bb9cb5148de96472) Thanks [@QuintonC](https://github.com/QuintonC)! - This change migrates the styling library to TailwindCSS, requiring an update to your implementation. You must now import the CSS exported from the package.

  Migration steps:

  1. Remove any custom `theme` value you might have provided to either `ConnectWalletProvider` or `Tokengate`.
  2. At your application's entry point, import for the styles for the package you are using.

  - For `@shopify/connect-wallet` usage in Create React App, Next.js, or Vite, add the following to your application's entry point: `import '@shopify/connect-wallet/styles.css';`
  - For `@shopify/tokengate` usage in Create React App, Next.js, or Vite, add the following to your application's entry point: `import '@shopify/tokengate/styles.css';`
  - For usage in Remix, view the Remix example: https://github.com/Shopify/blockchain-components/tree/main/examples/remix

  3. If you were using custom themes, view the custom theme documentation: https://shopify.dev/docs/api/blockchain/theming

### Minor Changes

- [#151](https://github.com/Shopify/blockchain-components/pull/151) [`06131fa`](https://github.com/Shopify/blockchain-components/commit/06131fa4cfc2b2d0431333c053c7e4bf1e14a8c2) Thanks [@QuintonC](https://github.com/QuintonC)! - The `reaction` prop for the Tokengate component was updated to prevent a discount from being provided to a discount with a type of `exclusive_access`.

- [#75](https://github.com/Shopify/blockchain-components/pull/75) [`216fd15`](https://github.com/Shopify/blockchain-components/commit/216fd1548cb0af875b91bddb9e6f1e4aa19f4441) Thanks [@Borahm](https://github.com/Borahm)! - This adds support for linking to an external source (e.g. Marketplaces) for a buyer to purchase an unlocking token if they don't have one

- [#82](https://github.com/Shopify/blockchain-components/pull/82) [`a39e55c`](https://github.com/Shopify/blockchain-components/commit/a39e55c8a7a58f36693212bf36b1a37a3a0462be) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Add tracking events for rendering components

- [#74](https://github.com/Shopify/blockchain-components/pull/74) [`d3b80f4`](https://github.com/Shopify/blockchain-components/commit/d3b80f40d2f7f667d02d08507abe25f8234a18f1) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Import ClientAnalytics from '@shopify/blockchain-components' package

- [#92](https://github.com/Shopify/blockchain-components/pull/92) [`b92d802`](https://github.com/Shopify/blockchain-components/commit/b92d80233316afe8eb9549f54724e0b89059936d) Thanks [@caropinzonsilva](https://github.com/caropinzonsilva)! - Add Tokengate events

### Patch Changes

- [#153](https://github.com/Shopify/blockchain-components/pull/153) [`fc6fd31`](https://github.com/Shopify/blockchain-components/commit/fc6fd31cca13821309f5c4c767080e4391f8c64f) Thanks [@QuintonC](https://github.com/QuintonC)! - Addressed a bug in both `@shopify/connect-wallet` and `@shopify/tokengate` where some text elements would not have the expected text color. To address this, text elements were given a "primary" text color. Colors should be overridden using the theming capabilities outlined here: https://shopify.dev/docs/api/blockchain/theming

- Updated dependencies [[`e77924e`](https://github.com/Shopify/blockchain-components/commit/e77924e247f45efe331b540aca22b62d4e700999), [`4a50933`](https://github.com/Shopify/blockchain-components/commit/4a5093341f0c97db94b96974b65a86bfda84c4c4), [`d3b80f4`](https://github.com/Shopify/blockchain-components/commit/d3b80f40d2f7f667d02d08507abe25f8234a18f1), [`a39e55c`](https://github.com/Shopify/blockchain-components/commit/a39e55c8a7a58f36693212bf36b1a37a3a0462be), [`d434861`](https://github.com/Shopify/blockchain-components/commit/d43486128778301dfdb62ed68ca6f899fa267e2e), [`fdfc405`](https://github.com/Shopify/blockchain-components/commit/fdfc40547d68f0165c57c6ed9c591584c1dc494a), [`3839cd6`](https://github.com/Shopify/blockchain-components/commit/3839cd6293d239549688cff640b61a8045501be9), [`c61578b`](https://github.com/Shopify/blockchain-components/commit/c61578b4898754ea740130529a2e063beee04853), [`b92d802`](https://github.com/Shopify/blockchain-components/commit/b92d80233316afe8eb9549f54724e0b89059936d), [`f71cbec`](https://github.com/Shopify/blockchain-components/commit/f71cbec2bda512b71cab80e5ac21266c695444f7)]:
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
