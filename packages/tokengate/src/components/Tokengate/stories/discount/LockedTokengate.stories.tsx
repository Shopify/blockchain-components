import {Meta, StoryObj} from '@storybook/react';
import {addDays} from 'shared';

import {Template} from '../template';
import {
  TokengatePropsNotConnectedFixture,
  TokengatePropsConnectedFixture,
  DiscountReactionFixture,
} from '../../../../fixtures';

const TokengateStory: Meta<typeof Template> = {
  title: 'Tokengate/Discount/Locked',
  component: Template,
};

type Story = StoryObj<typeof Template>;

export const Locked: Story = {
  args: TokengatePropsNotConnectedFixture({
    reaction: DiscountReactionFixture(),
  }),
};

export const SoldOut: Story = {
  args: TokengatePropsNotConnectedFixture({
    reaction: DiscountReactionFixture(),
    isSoldOut: true,
  }),
};

export const StartDate: Story = {
  args: TokengatePropsNotConnectedFixture({
    reaction: DiscountReactionFixture(),
    active: {start: addDays(new Date(), 1).toISOString()},
  }),
};

export const NoEligibleToken: Story = {
  args: TokengatePropsConnectedFixture({
    reaction: DiscountReactionFixture(),
  }),
};

export default TokengateStory;
