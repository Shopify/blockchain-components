---
id: tokengating-card
title: Tokengting Card
---

#### Description

Examples + Edit in CodeSandbox

Storybook link / inject storybook?

```
import {
  TokengatingCard,
  GateRequirement,
  UnlockingToken,
} from '@shopify/tokengating-card';

function TokengatingCardExample(){
  return <TokengatingCard />
}
```

### Props

#### TokengatingCard

| interface TokengatingCard  | Type                                   | Description |
| -------------------------- | -------------------------------------- | ----------- |
| `isLocked`                 | `boolean`                              |             |
| `onConnectWallet`          | `() => void`                           |             |
| `onConnectedWalletActions` | `() => void`                           |             |
| `isLoading?`               | `boolean`                              |             |
| `wallet?`                  | [Wallet](#wallet)                      |             |
| `gateRequirement?`         | [GateRequirement](#gate-requirement)   |             |
| `unlockingTokens?`         | [`UnlockingToken`](#unlocking-token)[] |             |
| `exclusiveCustomTitles?`   | [CustomTitles](#custom-titles)         |             |
| `discountCustomTitles?`    | [CustomTitles](#custom-titles)         |             |
| `isSoldOut?`               | `boolean`                              |             |
| `availableDate?`           | `ISODate string`                       |             |

#### Wallet

| interface Wallet | Type              | Description |
| ---------------- | ----------------- | ----------- |
| `address?`       | `string`          |             |
| `ensName`        | `string`          |             |
| `icon`           | `React.ReactNode` |             |

#### Gate Requirement

| interface GateRequirement | Type                             | Description |
| ------------------------- | -------------------------------- | ----------- |
| `id`                      | `string`                         |             |
| `tokenSeries`             | [`TokenSeries`](#token-series)[] |             |
| `operator`                | `'OR'` \| `'AND'`                |             |

#### Token Series

| interface TokenSeries   | Type     | Description |
| ----------------------- | -------- | ----------- |
| `name`                  | `string` |             |
| `conditionsDescription` | `string` |             |
| `imageUrl`              | `string` |             |
| `contractAddress`       | `string` |             |

#### Unlocking Token

| interface UnlockingToken | Type     | Description |
| ------------------------ | -------- | ----------- |
| `title`                  | `string` |             |
| `mediaUrl`               | `string` |             |
| `contractName`           | `string` |             |
| `contractAddress`        | `string` |             |

#### Custom Titles

| interface CustomTitles | Type     | Description |
| ---------------------- | -------- | ----------- |
| `lockedTitle?`         | `string` |             |
| `lockedSubtitle?`      | `string` |             |
| `unlockedTitle?`       | `string` |             |
| `unlockedSubtitle?`    | `string` |             |
