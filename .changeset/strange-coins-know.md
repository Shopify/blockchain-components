---
'@shopify/connect-wallet': major
---

This change include the following updates:
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
