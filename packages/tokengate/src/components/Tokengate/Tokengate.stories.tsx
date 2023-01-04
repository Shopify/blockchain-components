import {ComponentStory, ComponentMeta} from '@storybook/react';
import {RootProvider} from 'shared/src';

import {
  TokenSeriesArrayFixture,
  UnlockingTokenFixture,
  UnlockingTokenFixtureType,
  UnlockingTokenWithOrderLimitFixture,
  UnlockingTokenWithOrderLimitMetFixture,
} from '../../fixtures';

import {Tokengate} from './Tokengate';

const tokenSeries = TokenSeriesArrayFixture();

const unlockingTokenCommerceTown = UnlockingTokenFixture();

const unlockingTokenCommerceTownWithOrderLimit =
  UnlockingTokenWithOrderLimitFixture();

const unlockingTokenCommerceTownWithOrderLimitMet =
  UnlockingTokenWithOrderLimitMetFixture();

const unlockingTokenSquad = UnlockingTokenFixture(
  {},
  UnlockingTokenFixtureType.Squaddy,
);

const unlockingTokenSquadWithOrderLimit = UnlockingTokenWithOrderLimitFixture(
  {},
  UnlockingTokenFixtureType.Squaddy,
);

const unlockingTokenSquadWithOrderLimitMet =
  UnlockingTokenWithOrderLimitMetFixture({}, UnlockingTokenFixtureType.Squaddy);

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
