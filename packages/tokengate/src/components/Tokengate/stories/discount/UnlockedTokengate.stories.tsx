import {Meta, StoryObj} from '@storybook/react';

import {DefaultArgTypes, Template} from '../template';
import {
  TokengatePropsUnlockedFixture,
  TokengatePropsUnlockedWithOrderLimitFixture,
  TokengatePropsUnlockedWithOrderLimitMetFixture,
  DiscountReactionFixture,
} from '../../../../fixtures';

const TokengateStory: Meta<typeof Template> = {
  title: 'Tokengate/Discount/Unlocked',
  component: Template,
};

type Story = StoryObj<typeof Template>;

export const NoOrderLimit: Story = {
  args: TokengatePropsUnlockedFixture({
    reaction: DiscountReactionFixture(),
  }),
  argTypes: DefaultArgTypes,
};

export const OrderLimit: Story = {
  args: TokengatePropsUnlockedWithOrderLimitFixture({
    reaction: DiscountReactionFixture(),
  }),
  argTypes: DefaultArgTypes,
};

export const OrderLimitReached: Story = {
  args: TokengatePropsUnlockedWithOrderLimitMetFixture({
    reaction: DiscountReactionFixture(),
  }),
  argTypes: DefaultArgTypes,
};

export default TokengateStory;
