import {Meta, StoryObj} from '@storybook/react';
import {addDays} from 'shared';

import {DefaultArgTypes, Template} from '../template';
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
  argTypes: DefaultArgTypes,
};

export const SoldOut: Story = {
  args: TokengatePropsNotConnectedFixture({
    reaction: DiscountReactionFixture(),
    isSoldOut: true,
  }),
  argTypes: DefaultArgTypes,
};

export const StartDate: Story = {
  args: TokengatePropsNotConnectedFixture({
    reaction: DiscountReactionFixture(),
    active: {start: addDays(new Date(), 1).toISOString()},
  }),
  argTypes: DefaultArgTypes,
};

export const NoEligibleToken: Story = {
  args: TokengatePropsConnectedFixture({
    reaction: DiscountReactionFixture(),
  }),
  argTypes: DefaultArgTypes,
};

export default TokengateStory;
