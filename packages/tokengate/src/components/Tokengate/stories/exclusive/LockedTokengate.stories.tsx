import {Meta, StoryObj} from '@storybook/react';
import {addDays} from 'shared';

import {defaultCustomExclusiveAccessTitles, Template} from '../template';

import {
  TokengatePropsNotConnectedFixture,
  TokengatePropsConnectedFixture,
} from '~/fixtures';

const TokengateStory: Meta<typeof Template> = {
  title: 'Tokengate/Exclusive/Locked',
  component: Template,
};

type Story = StoryObj<typeof Template>;

export const Locked: Story = {
  args: TokengatePropsNotConnectedFixture(defaultCustomExclusiveAccessTitles),
};

export const SoldOut: Story = {
  args: TokengatePropsNotConnectedFixture({
    isSoldOut: true,
    ...defaultCustomExclusiveAccessTitles,
  }),
};

export const EndDate: Story = {
  args: TokengatePropsNotConnectedFixture({
    active: {end: addDays(new Date(), 1).toISOString()},
    ...defaultCustomExclusiveAccessTitles,
  }),
};

export const StartDate: Story = {
  args: TokengatePropsNotConnectedFixture({
    active: {start: addDays(new Date(), 1).toISOString()},
    ...defaultCustomExclusiveAccessTitles,
  }),
};

export const NoEligibleToken: Story = {
  args: TokengatePropsConnectedFixture(defaultCustomExclusiveAccessTitles),
};

export default TokengateStory;
