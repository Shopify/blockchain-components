import {Meta, StoryObj} from '@storybook/react';

import {Template} from '../template';
import {TokengatePropsNotConnectedFixture} from '../../../../fixtures';

const TokengateStory: Meta<typeof Template> = {
  title: 'Tokengate/NoSegments',
  component: Template,
};

type Story = StoryObj<typeof Template>;

export const NoSegments: Story = {
  args: TokengatePropsNotConnectedFixture({
    requirements: {
      conditions: [],
      logic: 'ANY',
    },
  }),
};

export default TokengateStory;
