---
'@shopify/blockchain-components': patch
'@shopify/gate-context-client': patch
'@shopify/connect-wallet': patch
'@shopify/tokengate': patch
---

This patch addresses an issue where the package was not setting the `NODE_ENV` variable during compile, resulting in unexpected behavior when utilizing the `process.env.NODE_ENV` value to add conditional functionality.
