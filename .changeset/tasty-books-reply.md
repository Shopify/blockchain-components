---
'@shopify/connect-wallet': patch
---

This patch addresses a minor bug relating to state cleanup when a modal is closed. Prior to this patch, an issue was present when closing the modal that would leave the state visible. This was an issue particularly when the user was connecting with a connector which was based on WalletConnect as the QR Code would be cleared. This addresses that by calling the `reset` state method which will clear the modal state and properly. In addition, functionality to handle disconnect events during signature flows was added for modal close events.
