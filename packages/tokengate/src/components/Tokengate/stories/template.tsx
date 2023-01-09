import {ComponentStory} from '@storybook/react';
import {Button, formatWalletAddress} from 'shared';

import {Tokengate} from '../Tokengate';

export const Template: ComponentStory<typeof Tokengate> = (args) => {
  const connectButton = args.wallet?.address ? (
    <Button label={formatWalletAddress(args.wallet.address)} fullWidth />
  ) : (
    <Button label="Connect wallet" fullWidth primary />
  );

  return <Tokengate {...args} connectButton={connectButton} />;
};
