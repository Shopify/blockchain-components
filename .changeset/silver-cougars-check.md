---
'@shopify/connect-wallet': patch
'@shopify/tokengate': patch
---

Addresses an issue where types that are used from the internal shared package were not compiled and exported as expected. This resulted in an issue where providing a theme to any of the providers would result in a type mismatch, but also made it impossible to extend or inherit any of the default themes.
