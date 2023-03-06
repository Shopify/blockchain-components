import {Meta, StoryObj} from '@storybook/react';

import {DefaultArgTypes, Template} from '../template';
import {
  TokengatePropsUnlockedFixture,
  TokengatePropsUnlockedWithOrderLimitFixture,
  TokengatePropsUnlockedWithOrderLimitMetFixture,
} from '../../../../fixtures';

const TokengateStory: Meta<typeof Template> = {
  title: 'Tokengate/Exclusive/Unlocked',
  component: Template,
};

type Story = StoryObj<typeof Template>;

export const NoOrderLimit: Story = {
  args: TokengatePropsUnlockedFixture(),
  argTypes: DefaultArgTypes,
};

export const OrderLimit: Story = {
  args: TokengatePropsUnlockedWithOrderLimitFixture(),
  argTypes: DefaultArgTypes,
};

export const OrderLimitReached: Story = {
  args: TokengatePropsUnlockedWithOrderLimitMetFixture(),
  argTypes: DefaultArgTypes,
};

export default TokengateStory;
