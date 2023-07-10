---
'@shopify/connect-wallet': patch
'@shopify/tokengate': patch
---

Upgrades TailwindCSS to v3.3.2.

This also removes the use of `@tailwindcss/aspect-ratio` and `@tailwindcss/line-clamp` as they are now included in the Tailwind package.

For `@shopify/connect-wallet`, this includes a minor update to the `QrCode` component displayed within the `ScanScreen`. This change was made to address the removal of `@tailwindcss/aspect-ratio`. Additionally, the `QRCode` was updated to make use of the `Spinner` component which creates a better loading state while the WalletConnect URI is loading.
