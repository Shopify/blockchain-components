import {Button} from 'shared';

import {Tokengate} from '../Tokengate';
import type {TokengateProps} from '../../../types';

export const Template = (args: TokengateProps) => (
  <Tokengate
    {...args}
    connectButton={<Button label="Connect wallet" fullWidth primary />}
    connectedButton={<Button label="0xab...aec9b" fullWidth />}
  />
);
