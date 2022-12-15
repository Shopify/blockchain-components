---
id: tokengating-card
title: Tokengting Card
---

#### Description

Examples + Edit in CodeSandbox

Storybook link / inject storybook?

```
import {useState} from 'react';
import {
  TokengatingCard,
  GateRequirement,
  Wallet,
  UnlockingToken,
} from '@shopify/tokengating-card';

const mockGateRequirement: GateRequirement = {
  id: 'gateRequirementId',
  operator: 'OR' as const,
  tokenSeries: [
    {
      name: 'CommerceTown',
      conditionsDescription: 'Any token',
      contractAddress: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
      imageUrl:
        'https://i.seadn.io/gae/Ywa40DYuhA_QIsok7A8wOhHS8RXn_j0MVh_pqabfO_USbZzoViHh82ucJk35b2QlEqHRttU32F_0NvRZBxhaVzP4UgyUNEPzuEi2?auto=format&w=384',
    },
    {
      name: 'Squaddy',
      conditionsDescription: 'Any token',
      contractAddress: '0x33023E456aF4C186A32c57f8ad61c34cB33f5cC1',
      imageUrl:
        'https://i.seadn.io/gae/QM_-oRsm9DoB2GQ9iuMbJtdWaVJjrOwIkEVEjdPHdsSWTilWIfNOPgKSD502tv9NMTOCSP9kQve8b8h_jQahzs3a4EVH11Ck0l9iKw?auto=format&w=384',
    },
  ],
};

const mockWallet: Wallet = {
  address: '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
};

const mockUnlockingTokens: UnlockingToken[] = [
  {
    contractAddress: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
    contractName: 'CommerceTown',
    mediaUrl:
      'https://i.seadn.io/gae/k9HIMmZMIpgCM0PpaJJo3Lp1rzLKHgYBqehzihsFJ1EgP_xZVDCrqjVQJJyfkX0_HaFxf0IQgO8Ws-5lkqlIhCnh_cBlzOqa1xeVww?auto=format&w=1000',
    title: 'Townfolk #103',
    tokenId: '103',
  },
  {
    contractAddress: '0x33023E456aF4C186A32c57f8ad61c34cB33f5cC1',
    contractName: 'Squad',
    mediaUrl:
      'https://lh3.googleusercontent.com/ccbUlfwRAjrGj3OBdKI9mJL0sQqBc8kXloSrk-9dOuOmIbhGqMwCpAZp_kpqsFK-0s3SqOjb7qi-8Jo7kEhmxZ_gSub9MphvrHKwBA=w650',
    title: 'Squaddy #24',
    tokenId: '24',
  },
];

function TokengatingCardExample() {
  const [isLocked, setIsLocked] = useState(true);
  const [wallet, setWallet] = useState<Wallet>({});
  const [unlockingTokens, setUnlockingTokens] = useState<UnlockingToken[]>([]);

  const onConnectWallet = () => {
    setWallet(mockWallet);
    setIsLocked(false);
    setUnlockingTokens(mockUnlockingTokens);
  };

  return (
    <TokengatingCard
      isLocked={isLocked}
      gateRequirement={mockGateRequirement}
      onConnectWallet={onConnectWallet}
      wallet={wallet}
      unlockingTokens={unlockingTokens}
    />
  );
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
