import {ComponentStory} from '@storybook/react';
import {Button, formatWalletAddress} from 'shared';

import {Tokengate} from '../Tokengate';

export const Template: ComponentStory<typeof Tokengate> = (args) => (
  <Tokengate
    {...args}
    connectButton={<Button label="Connect wallet" fullWidth primary />}
    connectedButton={
      <Button
        label={formatWalletAddress(args.wallet?.address || '')}
        fullWidth
      />
    }
  />
);
