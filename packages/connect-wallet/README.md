# `@shopify/connect-wallet`

[![npm version](https://img.shields.io/npm/v/@shopify/connect-wallet.svg?label=@shopify/connect-wallet)](https://www.npmjs.com/package/@shopify/connect-wallet) [![CI](https://github.com/Shopify/blockchain-components/actions/workflows/ci.yml/badge.svg)](https://github.com/Shopify/blockchain-components/actions?query=branch%3Amain) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](../../.github/contributing.md)

The `@shopify/connect-wallet` package provides an opinionated and delightful way of connecting wallets and signing messages. The provided package and functionality is suitable for use on and off of Shopify.

For more in-depth information and API references, [read the complete documentation](https://shopify.dev/api/blockchain/components/connect-wallet).

## Installation

Install the `@shopify/connect-wallet` package and its wagmi + viem peer dependencies.

```bash
yarn add @shopify/connect-wallet viem wagmi
```

## Documentation

### Client configuration

We recommend creating a new file at the root of your app.

Create a file in your project titled `connect-wallet-config.ts` at the root of your app with the following code. For more information, refer to [wagmi documentation](https://wagmi.sh).

```ts
import {buildConnectors} from '@shopify/connect-wallet';
import {configureChains, createConfig, mainnet} from 'wagmi';
// import {alchemyProvider} from 'wagmi/providers/alchemy';
import {publicProvider} from 'wagmi/providers/public';

const {chains, publicClient, webSocketPublicClient} = configureChains(
  [mainnet],
  [
    /**
     * We recommend using `alchemyProvider or `infuraProvider`
     * to reduce the risk of your application being rate limited.
     */
    // alchemyProvider({apiKey: 'INSERT API KEY HERE'}),
    publicProvider(),
  ],
);

const {connectors, wagmiConnectors} = buildConnectors({chains});

const config = createConfig({
  autoConnect: true,
  connectors: wagmiConnectors,
  publicClient,
  webSocketPublicClient,
});

export {chains, config, connectors};
```

### App provider setup

Let's begin using the configured client and chains. In your app's entry point, (either `index.tsx`, `_app.tsx`, or your framework's entry point), wrap the rendered component with both `<WagmiConfig />` and the `<ConnectWalletProvider />` as follows.

```tsx
import {ConnectWalletProvider} from '@shopify/connect-wallet';
import '@shopify/connect-wallet/styles.css';
import {WagmiConfig} from 'wagmi';

import {chains, config, connectors} from './wagmi';

export function Index() {
  return (
    <WagmiConfig config={config}>
      <ConnectWalletProvider chains={chains} connectors={connectors}>
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

## Examples

For examples of component usage in various frameworks, see the [examples folder](https://github.com/Shopify/blockchain-components/tree/main/examples).

## Contributing

Pull requests are welcome. See the [contribution guidelines](../../.github/contributing.md) for more information.

## License

MIT &copy; [Shopify](https://shopify.com/), see [LICENSE.md](LICENSE.md) for details.

<a href="https://shopify.com" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="../../images/shopify-light.svg">
    <source media="(prefers-color-scheme: light)" srcset="../../images/shopify-dark.svg">
    <img alt="Shopify Logo" src="../../images/shopify-dark.svg">
  </picture>
</a>

