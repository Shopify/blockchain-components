import {ComponentMeta} from '@storybook/react';

import {Template} from '../template';
import {Tokengate} from '../../Tokengate';
import {
  TokengatePropsUnlockedFixture,
  TokengatePropsUnlockedWithOrderLimitFixture,
  TokengatePropsUnlockedWithOrderLimitMetFixture,
} from '../../../../fixtures';

const TokengateStory: ComponentMeta<typeof Tokengate> = {
  title: 'Tokengate/Exclusive/Unlocked',
  component: Tokengate,
};

export default TokengateStory;

export const NoOrderLimit = Template.bind({});
NoOrderLimit.args = TokengatePropsUnlockedFixture();

export const OrderLimit = Template.bind({});
OrderLimit.args = TokengatePropsUnlockedWithOrderLimitFixture();

export const OrderLimitReached = Template.bind({});
OrderLimitReached.args = TokengatePropsUnlockedWithOrderLimitMetFixture();
