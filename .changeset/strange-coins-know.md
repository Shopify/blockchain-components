---
'@shopify/connect-wallet': major
---

This change migrates all WalletConnect connectors to v2. This is a breaking change as we now _require_ all instances of `@shopify/connect-wallet` to provider a `projectId` value when creating connectors or the provider for the package.

This breaking change is introduced because WalletConnect v1 will be shut down on March 1, 2023 [[source](https://medium.com/walletconnect/how-to-prepare-for-the-walletconnect-v1-0-shutdown-1a954da1dbff)].

To update your instance, please ensure that any usage of `getDefaultConnectors` or `ConnectWalletProvider` receive a `projectId` value with a valid WalletConnect `projectId`.

You can get your WalletConnect projectId [here](https://cloud.walletconnect.com/sign-in).
