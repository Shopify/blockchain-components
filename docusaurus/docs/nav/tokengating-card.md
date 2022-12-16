---
id: tokengating-card
title: Tokengating Card
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export const stories = [
  'locked-without-wallet',
  'locked-without-unlocking-tokens',
  'unlocked',
  'loading'
];

export const getTabTitleFromStory = (story) => story.replaceAll('-', ' ');

export const StorybookTabs = () => (
  <Tabs>
    {stories.map((story) => (
      <TabItem value={story} label={getTabTitleFromStory(story)} default>
        <iframe
          title="locked-without-wallet"
          src={`https://main--639b1f308693132693d9b82c.chromatic.com/iframe.html?path=/story/tokengatingcard--${story}`}
          width="400"
          height="400"
        />
      </TabItem>
      )
    )}
  </Tabs>
)

#### Description

<StorybookTabs />

```typescript
import {useState} from 'react';
import {
  TokengatingCard,
  GateRequirement,
  Wallet,
  UnlockingToken,
} from '@shopify/tokengating-card';

function TokengatingCardExample() {
  const [isLocked, setIsLocked] = useState(true);
  const [wallet, setWallet] = useState<Wallet>({});
  const [unlockingTokens, setUnlockingTokens] = useState<UnlockingToken[]>([]);

  const onConnectWallet = () => {
    setWallet(getMockWallet());
    setIsLocked(false);
    setUnlockingTokens(getMockUnlockingTokens());
  };

  return (
    <TokengatingCard
      isLocked={isLocked}
      gateRequirement={getMockGateRequirement()}
      onConnectWallet={onConnectWallet}
      wallet={wallet}
      unlockingTokens={unlockingTokens}
    />
  );
}

const getMockGateRequirement = (): GateRequirement => ({
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
});

const getMockWallet = (): Wallet => ({
  address: '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
});

const getMockUnlockingTokens = (): UnlockingToken[] => [
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
