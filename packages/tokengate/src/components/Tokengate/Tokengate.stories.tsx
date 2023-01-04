import {ComponentStory, ComponentMeta} from '@storybook/react';
import {RootProvider} from 'shared/src';

import {TokenSeriesArrayFixture} from '../../fixtures';

import {Tokengate} from './Tokengate';

const tokenSeries = TokenSeriesArrayFixture();

const unlockingTokenCommerceTown = {
  token: {
    contractAddress: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
    contractName: 'CommerceTown',
    mediaUrl:
      'https://i.seadn.io/gae/k9HIMmZMIpgCM0PpaJJo3Lp1rzLKHgYBqehzihsFJ1EgP_xZVDCrqjVQJJyfkX0_HaFxf0IQgO8Ws-5lkqlIhCnh_cBlzOqa1xeVww?auto=format&w=1000',
    title: 'Townfolk #103',
    tokenId: '103',
  },
};

const unlockingTokenCommerceTownWithOrderLimit = {
  token: {
    ...unlockingTokenCommerceTown.token,
    consumedOrderLimit: 0,
    totalOrderLimit: 2,
  },
};

const unlockingTokenCommerceTownWithOrderLimitMet = {
  token: {
    ...unlockingTokenCommerceTown.token,
    consumedOrderLimit: 2,
    totalOrderLimit: 2,
  },
};

const unlockingTokenSquad = {
  token: {
    contractAddress: '0x33023E456aF4C186A32c57f8ad61c34cB33f5cC1',
    contractName: 'Squad',
    mediaUrl:
      'https://lh3.googleusercontent.com/ccbUlfwRAjrGj3OBdKI9mJL0sQqBc8kXloSrk-9dOuOmIbhGqMwCpAZp_kpqsFK-0s3SqOjb7qi-8Jo7kEhmxZ_gSub9MphvrHKwBA=w650',
    title: 'Squaddy #24',
    tokenId: '24',
  },
};

const unlockingTokenSquadWithOrderLimit = {
  token: {
    ...unlockingTokenSquad.token,
    consumedOrderLimit: 0,
    totalOrderLimit: 2,
  },
};

const unlockingTokenSquadWithOrderLimitMet = {
  token: {
    ...unlockingTokenSquad.token,
    consumedOrderLimit: 2,
    totalOrderLimit: 2,
  },
};

const TokengateStory: ComponentMeta<typeof Tokengate> = {
  title: 'Tokengate',
  component: Tokengate,
  decorators: [
    (Story) => (
      <RootProvider>
        <Story />
      </RootProvider>
    ),
  ],
};

export default TokengateStory;

const Template: ComponentStory<typeof Tokengate> = (args) => {
  return <Tokengate {...args} />;
};

export const LockedWithoutWallet = Template.bind({});
LockedWithoutWallet.args = {
  isLoading: false,
  isLocked: true,
  gateRequirement: {
    id: 'gateRequirement-id',
    tokenSeries,
    operator: 'OR',
  },
  onConnectWallet: () => {},
  onConnectedWalletActions: () => {},
};

export const LockedWithoutUnlockingTokens = Template.bind({});
LockedWithoutUnlockingTokens.args = {
  isLoading: false,
  isLocked: true,
  wallet: {
    address: '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
  },
  gateRequirement: {
    id: 'gateRequirement-id',
    tokenSeries,
    operator: 'OR',
  },
  unlockingTokens: [unlockingTokenCommerceTown],
  onConnectWallet: () => {},
  onConnectedWalletActions: () => {},
};

export const Unlocked = Template.bind({});
Unlocked.args = {
  isLoading: false,
  isLocked: false,
  wallet: {
    address: '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
  },
  gateRequirement: {
    id: 'gateRequirement-id',
    tokenSeries,
    operator: 'OR',
  },
  unlockingTokens: [unlockingTokenCommerceTown, unlockingTokenSquad],
  onConnectWallet: () => {},
  onConnectedWalletActions: () => {},
};

export const UnlockedWithOrderLimits = Template.bind({});
UnlockedWithOrderLimits.args = {
  isLoading: false,
  isLocked: false,
  wallet: {
    address: '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
  },
  gateRequirement: {
    id: 'gateRequirement-id',
    tokenSeries,
    operator: 'OR',
  },
  unlockingTokens: [
    unlockingTokenCommerceTownWithOrderLimit,
    unlockingTokenSquadWithOrderLimit,
  ],
  onConnectWallet: () => {},
  onConnectedWalletActions: () => {},
};

export const UnlockedWithOrderLimitsMet = Template.bind({});
UnlockedWithOrderLimitsMet.args = {
  isLoading: false,
  isLocked: false,
  wallet: {
    address: '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
  },
  gateRequirement: {
    id: 'gateRequirement-id',
    tokenSeries,
    operator: 'OR',
  },
  unlockingTokens: [
    unlockingTokenCommerceTownWithOrderLimitMet,
    unlockingTokenSquadWithOrderLimitMet,
  ],
  onConnectWallet: () => {},
  onConnectedWalletActions: () => {},
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  isLocked: true,
  onConnectWallet: () => {},
  onConnectedWalletActions: () => {},
};
