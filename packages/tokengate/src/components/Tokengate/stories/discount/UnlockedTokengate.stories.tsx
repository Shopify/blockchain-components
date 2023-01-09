import {ComponentMeta} from '@storybook/react';

import {Template} from '../template';
import {Tokengate} from '../../Tokengate';
import {
  TokengatePropsUnlockedFixture,
  TokengatePropsUnlockedWithOrderLimitFixture,
  TokengatePropsUnlockedWithOrderLimitMetFixture,
} from '../../../../fixtures';

const TokengateStory: ComponentMeta<typeof Tokengate> = {
  title: 'Tokengate/Discount/Unlocked',
  component: Tokengate,
};

export default TokengateStory;

export const NoOrderLimit = Template.bind({});
NoOrderLimit.args = TokengatePropsUnlockedFixture({
  discount: 10,
});

export const OrderLimit = Template.bind({});
OrderLimit.args = TokengatePropsUnlockedWithOrderLimitFixture({
  discount: 10,
});

export const OrderLimitReached = Template.bind({});
OrderLimitReached.args = TokengatePropsUnlockedWithOrderLimitMetFixture({
  discount: 10,
});
