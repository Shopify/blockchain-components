---
'@shopify/connect-wallet': patch
'@shopify/tokengate': patch
---

Addressed a bug in both `@shopify/connect-wallet` and `@shopify/tokengate` where some text elements would not have the expected text color. To address this, text elements were given a "primary" text color. Colors should be overridden using the theming capabilities outlined here: https://shopify.dev/docs/api/blockchain/theming
