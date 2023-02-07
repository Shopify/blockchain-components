import {ComponentStory} from '@storybook/react';
import {Button} from 'shared';

import {Tokengate} from '../Tokengate';

export const Template: ComponentStory<typeof Tokengate> = (args) => (
  <Tokengate
    {...args}
    connectButton={<Button label="Connect wallet" fullWidth primary />}
    connectedButton={<Button label="0xab...aec9b" fullWidth />}
  />
);
