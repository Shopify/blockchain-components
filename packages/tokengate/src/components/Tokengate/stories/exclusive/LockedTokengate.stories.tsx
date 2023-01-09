import {ComponentMeta} from '@storybook/react';
import {addDays} from 'shared';

import {Template} from '../template';
import {Tokengate} from '../../Tokengate';
import {
  TokengatePropsNotConnectedFixture,
  TokengatePropsConnectedFixture,
} from '../../../../fixtures';

const TokengateStory: ComponentMeta<typeof Tokengate> = {
  title: 'Tokengate/Exclusive/Locked',
  component: Tokengate,
};

export default TokengateStory;

export const Locked = Template.bind({});
Locked.args = TokengatePropsNotConnectedFixture();

export const SoldOut = Template.bind({});
SoldOut.args = TokengatePropsNotConnectedFixture({
  isSoldOut: true,
});

export const StartDate = Template.bind({});
StartDate.args = TokengatePropsNotConnectedFixture({
  availableDate: addDays(new Date(), 1).toISOString(),
});

export const NoEligibleToken = Template.bind({});
NoEligibleToken.args = TokengatePropsConnectedFixture();
