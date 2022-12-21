---
id: connect-wallet
title: Connect Wallet
---

### Description

<!-- Embedded component to go here -->

### useConnectWallet

```typescript
// Code sample to go here...
```

#### Return Value

| Return value      | Type         | Description |
| ----------------- | ------------ | ----------- |
| `onConnect`       | `() => void` |             |
| `onDisconnect`    | `() => void` |             |
| `onMessageSigned` | `() => void` |             |
| `signOnConnect?`  | `boolean`    |             |

#### Configuration

| Parameters         | Type                    | Description |
| ------------------ | ----------------------- | ----------- |
| `chains`           | [Chain[]](#chain[])     |             |
| `connecting`       | `boolean`               |             |
| `disconnect`       | `() => void`            |             |
| `pendingConnector` | [Connector](#connector) |             |
| `signing`          | `boolean`               |             |
| `signMessage`      | `() => void`            |             |
| `signOnConnect`    | `() => void`            |             |
| `wallet`           | [Wallet](#wallet)       |             |

### useConnectionModal

```typescript
// Code sample to go here...
```

#### Return Value

| Return value | Type         | Description |
| ------------ | ------------ | ----------- |
| `closeModal` | `() => void` |             |
| `openModal`  | `() => void` |             |
