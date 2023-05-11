import {Meta, StoryObj} from '@storybook/react';
import {addDays} from 'shared';

import {defaultCustomDiscountTitles, Template} from '../template';

import {
  TokengatePropsNotConnectedFixture,
  TokengatePropsConnectedFixture,
  DiscountReactionFixture,
} from '~/fixtures';

const TokengateStory: Meta<typeof Template> = {
  title: 'Tokengate/Discount/Locked',
  component: Template,
};

type Story = StoryObj<typeof Template>;

export const Locked: Story = {
  args: TokengatePropsNotConnectedFixture({
    reaction: DiscountReactionFixture(),
    ...defaultCustomDiscountTitles,
  }),
};

export const SoldOut: Story = {
  args: TokengatePropsNotConnectedFixture({
    reaction: DiscountReactionFixture(),
    isSoldOut: true,
    ...defaultCustomDiscountTitles,
  }),
};

export const EndDate: Story = {
  args: TokengatePropsNotConnectedFixture({
    reaction: DiscountReactionFixture(),
    active: {end: addDays(new Date(), 1).toISOString()},
    ...defaultCustomDiscountTitles,
  }),
};

export const StartDate: Story = {
  args: TokengatePropsNotConnectedFixture({
    reaction: DiscountReactionFixture(),
    active: {start: addDays(new Date(), 1).toISOString()},
    ...defaultCustomDiscountTitles,
  }),
};

export const NoEligibleToken: Story = {
  args: TokengatePropsConnectedFixture({
    reaction: DiscountReactionFixture(),
    unlockingTokens: [],
    ...defaultCustomDiscountTitles,
  }),
};

export default TokengateStory;
