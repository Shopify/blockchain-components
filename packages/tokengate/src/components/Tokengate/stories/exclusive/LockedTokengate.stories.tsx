import {Meta, StoryObj} from '@storybook/react';
import {addDays} from '@shopify/blockchain-components';

import {Template} from '../template';
import {
  TokengatePropsNotConnectedFixture,
  TokengatePropsConnectedFixture,
} from '../../../../fixtures';

const TokengateStory: Meta<typeof Template> = {
  title: 'Tokengate/Exclusive/Locked',
  component: Template,
};

type Story = StoryObj<typeof Template>;

export const Locked: Story = {
  args: TokengatePropsNotConnectedFixture(),
};

export const SoldOut: Story = {
  args: TokengatePropsNotConnectedFixture({
    isSoldOut: true,
  }),
};

export const StartDate: Story = {
  args: TokengatePropsNotConnectedFixture({
    active: {start: addDays(new Date(), 1).toISOString()},
  }),
};

export const NoEligibleToken: Story = {
  args: TokengatePropsConnectedFixture(),
};

export default TokengateStory;
