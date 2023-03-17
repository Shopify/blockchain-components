---
'@shopify/connect-wallet': major
'@shopify/tokengate': major
---

This change migrates the styling library to TailwindCSS, requiring an update to your implementation. You must now import the CSS exported from the package.

Migration steps:

1. Remove any custom `theme` value you might have provided to either `ConnectWalletProvider` or `Tokengate`.
2. At your application's entry point, import for the styles for the package you are using.
  - For `@shopify/connect-wallet` usage in Create React App, Next.js, or Vite, add the following to your application's entry point: `import '@shopify/connect-wallet/styles.css';`
  - For `@shopify/tokengate` usage in Create React App, Next.js, or Vite, add the following to your application's entry point: `import '@shopify/tokengate/styles.css';`
  - For usage in Remix, view the Remix example: https://github.com/Shopify/blockchain-components/tree/main/examples/remix
3. If you were using custom themes, view the custom theme documentation: https://shopify.dev/docs/api/blockchain/theming
