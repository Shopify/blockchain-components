/* eslint-disable @shopify/jsx-no-hardcoded-content */

import {Meta, StoryObj} from '@storybook/react';
import {Button} from 'shared';

import {Template} from '../template';
import {ReactionFixture, TokengatePropsFixture} from '../../../../fixtures';
import {Tokengate} from '../../Tokengate';

const TokengateStory: Meta<typeof Tokengate> = {
  title: 'Tokengate/AllowList',
  component: Tokengate,
};

export default TokengateStory;

const defaultArgs = TokengatePropsFixture({
  isConnected: false,
  isLocked: true,
  reaction: ReactionFixture(),
  requirements: {
    logic: 'ANY' as const,
    conditions: [
      {
        name: 'Best wallet holders',
        description: 'Optional description',
      },
    ],
  },
  redemptionLimit: {total: 4, perToken: 4},
  discountCustomTitles: getCustomTitles(),
  exclusiveCustomTitles: getCustomTitles(),
});

const AllowListComponent = (args: typeof defaultArgs) => {
  const {
    isConnected,
    isLocked,
    requirements: originalRequirements,
    discountCustomTitles: originalDiscountCustomTitles,
    exclusiveCustomTitles: originalExclusiveCustomTitles,
  } = args;
  const isNotOnAllowList = isConnected && isLocked;

  const connectButton = <Button label="Connect wallet" fullWidth primary />;
  const connectedButton = <Button label="0xab...aec9b" fullWidth />;

  // Customize display of the case where the user is not on the allow list
  const requirements = isNotOnAllowList
    ? {
        ...originalRequirements!,
        conditions: [
          {
            name: "You're not on the list!",
            description: "You're not on the list!",
          },
        ],
      }
    : originalRequirements!;
  const overrideTitles = isNotOnAllowList
    ? {lockedSubtitle: "You're not on the list!"}
    : {};
  const discountCustomTitles = {
    ...originalDiscountCustomTitles!,
    ...overrideTitles,
  };
  const exclusiveCustomTitles = {
    ...originalExclusiveCustomTitles!,
    ...overrideTitles,
  };

  return (
    <Template
      {...args}
      requirements={requirements}
      connectButton={isConnected ? connectedButton : connectButton}
      exclusiveCustomTitles={exclusiveCustomTitles}
      discountCustomTitles={discountCustomTitles}
    />
  );
};

type Story = StoryObj<typeof AllowListComponent>;

export const AllowList: Story = {
  args: defaultArgs,
  render: (args) => <AllowListComponent {...args} />,
  argTypes: {
    connectButton: {
      table: {
        disable: true,
      },
    },
    connectedButton: {
      table: {
        disable: true,
      },
    },
    redemptionLimit: {
      table: {
        disable: true,
      },
    },
    theme: {
      table: {
        disable: true,
      },
    },
    unlockingTokens: {
      table: {
        disable: true,
      },
    },
  },
};

function getCustomTitles() {
  return {
    lockedTitle: `Exclusive product`,
    lockedSubtitle: `On the allow list? You're in!`,
    unlockedTitle: `You're in!`,
    unlockedSubtitleWithRedemptionLimit: (
      <>
        You can <b>buy up to 4</b> with your tokens
      </>
    ),
  };
}
