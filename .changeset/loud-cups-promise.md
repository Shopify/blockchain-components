---
'@shopify/connect-wallet': patch
'@shopify/tokengate': patch
---

Addresses an issue with styled components and CJS support. Since the packages support ESM, some frameworks (Next.js) will try to transpile the packages and use a CommonJS version of styled-components we needed to re-export styled-components with a .default key for CJS support.
