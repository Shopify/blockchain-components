---
'@shopify/connect-wallet': major
---

Adding suppport for custom connectors to be added to the list of supported wallets in the Connect Wallet modal.

This change deprecates `getDefaultConnectors` and replaces it with `buildConnectors`, which supports adding custom connectors and editing the default connectors.

To update your project to align with these changes, see https://shopify.dev/docs/api/blockchain/components/connect-wallet.md#connectors.
