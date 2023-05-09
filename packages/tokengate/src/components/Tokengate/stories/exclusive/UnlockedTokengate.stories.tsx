import {Meta, StoryObj} from '@storybook/react';

import {Template} from '../template';

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
  args: TokengatePropsUnlockedFixture(),
};

export const OrderLimit: Story = {
  args: TokengatePropsUnlockedWithOrderLimitFixture(),
};

export const OrderLimitReached: Story = {
  args: TokengatePropsUnlockedWithOrderLimitMetFixture(),
};

export default TokengateStory;
