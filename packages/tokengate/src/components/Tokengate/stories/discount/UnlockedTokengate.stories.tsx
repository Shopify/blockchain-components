import {ComponentMeta} from '@storybook/react';

import {Template} from '../template';
import {Tokengate} from '../../Tokengate';
import {
  TokengatePropsUnlockedFixture,
  TokengatePropsUnlockedWithOrderLimitFixture,
  TokengatePropsUnlockedWithOrderLimitMetFixture,
  DiscountReactionFixture,
} from '../../../../fixtures';

const TokengateStory: ComponentMeta<typeof Tokengate> = {
  title: 'Tokengate/Discount/Unlocked',
  component: Tokengate,
};

export default TokengateStory;

export const NoOrderLimit = Template.bind({});
NoOrderLimit.args = TokengatePropsUnlockedFixture({
  reaction: DiscountReactionFixture(),
});

export const OrderLimit = Template.bind({});
OrderLimit.args = TokengatePropsUnlockedWithOrderLimitFixture({
  reaction: DiscountReactionFixture(),
});

export const OrderLimitReached = Template.bind({});
OrderLimitReached.args = TokengatePropsUnlockedWithOrderLimitMetFixture({
  reaction: DiscountReactionFixture(),
});
