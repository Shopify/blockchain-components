import {Meta, StoryObj} from '@storybook/react';

import {defaultCustomDiscountTitles, Template} from '../template';

import {
  TokengatePropsUnlockedFixture,
  TokengatePropsUnlockedWithOrderLimitFixture,
  TokengatePropsUnlockedWithOrderLimitMetFixture,
  DiscountReactionFixture,
} from '~/fixtures';

const TokengateStory: Meta<typeof Template> = {
  title: 'Tokengate/Discount/Unlocked',
  component: Template,
};

type Story = StoryObj<typeof Template>;

export const NoOrderLimit: Story = {
  args: TokengatePropsUnlockedFixture({
    reaction: DiscountReactionFixture(),
    ...defaultCustomDiscountTitles,
  }),
};

export const OrderLimit: Story = {
  args: TokengatePropsUnlockedWithOrderLimitFixture({
    reaction: DiscountReactionFixture(),
    ...defaultCustomDiscountTitles,
  }),
};

export const OrderLimitReached: Story = {
  args: TokengatePropsUnlockedWithOrderLimitMetFixture({
    reaction: DiscountReactionFixture(),
    ...defaultCustomDiscountTitles,
  }),
};

export default TokengateStory;
