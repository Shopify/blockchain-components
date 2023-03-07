# `@shopify/connect-wallet`

[![npm version](https://img.shields.io/npm/v/@shopify/connect-wallet.svg?label=@shopify/connect-wallet)](https://www.npmjs.com/package/@shopify/connect-wallet) [![CI](https://github.com/Shopify/blockchain-components/actions/workflows/ci.yml/badge.svg)](https://github.com/Shopify/blockchain-components/actions?query=branch%3Amain) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](../../.github/contributing.md)

The `@shopify/connect-wallet` package provides a standard way of connecting wallets and signing messages on Shopify storefronts. For more in-depth information, [read the complete documentation](https://shopify.dev/api/blockchain/components/connect-wallet).

## Get started

To get started with using `@shopify/connect-wallet` you need to follow these steps

1. [Installation](#installation)
1. [Client configuration](#client-configuration)
1. [App provider setup](#app-provider-setup)
1. [Adding the `ConnectButton` component to your app](#adding-the-connectbutton-component-to-your-app)
### Installation

Install the `shopify/connect-wallet` package and its wagmi + ethers peer dependencies.

```bash
yarn add @shopify/connect-wallet ethers wagmi
```

### Client configuration

We recommend creating a new file at the root of your app.

Create a file in your project titled `connect-wallet-config.ts` at the root of your app with the following code. For more information, refer to [wagmi documentation](https://wagmi.sh).

```ts
import {buildConnectors} from '@shopify/connect-wallet';
import {configureChains, createClient} from 'wagmi';
import {mainnet} from 'wagmi/chains';
/**
 * It is strongly recommended to make use of `alchemyProvider`
 * or `infuraProvider` to reduce the risk of your
 * storefront being rate limited.
 */
// import {alchemyProvider} from 'wagmi/providers/alchemy';
import {publicProvider} from 'wagmi/providers/public';

const {chains, provider, webSocketProvider} = configureChains(
  [mainnet],
  [
    // alchemyProvider({apiKey: 'INSERT API KEY HERE'}),
    publicProvider(),
  ],
);

const {connectors, wagmiConnectors} = buildConnectors({chains});

const client = createClient({
  autoConnect: true,
  connectors: wagmiConnectors,
  provider,
  webSocketProvider,
});

export {chains, client, connectors};
```

### App provider setup

Let's begin using the configured client and chains. In your app's entry point, (either `index.tsx`, `_app.tsx`, or your framework's entry point), wrap the rendered component with both `<WagmiConfig />` and the `<ConnectWalletProvider />` as follows.

```tsx
import {ConnectWalletProvider} from '@shopify/connect-wallet';
import {WagmiConfig} from 'wagmi';

import {chains, client} from './connect-wallet-config'

export function Index() {
  return (
    <WagmiConfig client={client}>
      <ConnectWalletProvider chains={chains}>
        /* {...your app content here} */
      </ConnectWalletProvider>
    </WagmiConfig>
  );
}
```

### Adding the `ConnectButton` component to your app

This example shows a pseudo code version of including the component in your navigation header, but you're welcome to place the component where you prefer.

```tsx
import {ConnectButton} from '@shopify/connect-wallet';

export const Header = () => {
  return (
    <MyHeaderMarkup>
      // {...existing header code}
      <Links>
        // {...existing links code}
        <ConnectButton />
      </Links>
    </MyHeaderMarkup>
  );
}
```

## Additional setup

Additional setup might be required depending on the tooling of your project.

### Polyfills

If you're using a bundler such as [Vite](https://vitejs.dev/) which doesn't provide Node polyfills, you will need to polyfill `global`, `Buffer`, and `process`. Below is a list of plugins that you can use for polyfills:

- [`@esbuild-plugins/node-globals-polyfill`](https://github.com/remorses/esbuild-plugins)
- [`vite-plugin-node-stdlib-browser`](https://github.com/sodatea/vite-plugin-node-stdlib-browser)
- [`vite-plugin-node-polyfills`](https://github.com/voracious/vite-plugin-node-polyfills)

## Contributing

Pull requests are welcome. See the [contribution guidelines](../../.github/contributing.md) for more information.

## Licenses

- Source code is under the [MIT license](../../LICENSE.md).
