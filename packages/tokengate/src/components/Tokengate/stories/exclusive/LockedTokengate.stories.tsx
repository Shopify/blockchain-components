import {Meta, StoryObj} from '@storybook/react';
import {addDays} from 'shared';

import {DefaultArgTypes, Template} from '../template';
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
  argTypes: DefaultArgTypes,
};

export const SoldOut: Story = {
  args: TokengatePropsNotConnectedFixture({
    isSoldOut: true,
  }),
  argTypes: DefaultArgTypes,
};

export const StartDate: Story = {
  args: TokengatePropsNotConnectedFixture({
    active: {start: addDays(new Date(), 1).toISOString()},
  }),
  argTypes: DefaultArgTypes,
};

export const NoEligibleToken: Story = {
  args: TokengatePropsConnectedFixture(),
  argTypes: DefaultArgTypes,
};

export default TokengateStory;
