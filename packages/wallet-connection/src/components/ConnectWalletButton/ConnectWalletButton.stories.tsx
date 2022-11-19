import {ComponentStory, ComponentMeta} from '@storybook/react';
import {WalletConnectionProvider} from '../../providers/WalletConnectionProvider';

import {ConnectWalletButton} from './ConnectWalletButton';

const ConnectWalletButtonStory: ComponentMeta<typeof ConnectWalletButton> = {
  title: 'Wallet Connection/Connect Wallet Button',
  component: ConnectWalletButton,
  decorators: [
    (Story) => (
      <WalletConnectionProvider>
        <Story />
      </WalletConnectionProvider>
    ),
  ],
};

export default ConnectWalletButtonStory;

const Template: ComponentStory<typeof ConnectWalletButton> = (args) => {
  return <ConnectWalletButton {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {
  label: 'Connect wallet',
  onClick: () => {},
};
