import {Meta, StoryObj} from '@storybook/react';

import {defaultCustomExclusiveAccessTitles, Template} from '../template';

import {
  TokengatePropsUnlockedFixture,
  TokengatePropsUnlockedWithOrderLimitFixture,
  TokengatePropsUnlockedWithOrderLimitMetFixture,
} from '~/fixtures';

const TokengateStory: Meta<typeof Template> = {
  title: 'Tokengate/Exclusive/Unlocked',
  component: Template,
};

type Story = StoryObj<typeof Template>;

export const NoOrderLimit: Story = {
  args: TokengatePropsUnlockedFixture(defaultCustomExclusiveAccessTitles),
};

export const OrderLimit: Story = {
  args: TokengatePropsUnlockedWithOrderLimitFixture(
    defaultCustomExclusiveAccessTitles,
  ),
};

export const OrderLimitReached: Story = {
  args: TokengatePropsUnlockedWithOrderLimitMetFixture(
    defaultCustomExclusiveAccessTitles,
  ),
};

export default TokengateStory;
