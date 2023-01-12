import {ComponentMeta} from '@storybook/react';
import {addDays} from 'shared';

import {Template} from '../template';
import {Tokengate} from '../../Tokengate';
import {
  TokengatePropsNotConnectedFixture,
  TokengatePropsConnectedFixture,
} from '../../../../fixtures';

const TokengateStory: ComponentMeta<typeof Tokengate> = {
  title: 'Tokengate/Discount/Locked',
  component: Tokengate,
};

export default TokengateStory;

export const Locked = Template.bind({});
Locked.args = TokengatePropsNotConnectedFixture({
  reaction: {
    type: 'discount',
  },
});

export const SoldOut = Template.bind({});
SoldOut.args = TokengatePropsNotConnectedFixture({
  reaction: {
    type: 'discount',
  },
  isSoldOut: true,
});

export const StartDate = Template.bind({});
StartDate.args = TokengatePropsNotConnectedFixture({
  reaction: {
    type: 'discount',
  },
  active: {start: addDays(new Date(), 1).toISOString()},
});

export const NoEligibleToken = Template.bind({});
NoEligibleToken.args = TokengatePropsConnectedFixture({
  reaction: {
    type: 'discount',
  },
});
