import {ComponentStory, ComponentMeta} from '@storybook/react';
import {WalletConnectionProvider} from '../../providers/WalletConnectionProvider';
import WalletConnect from './WalletConnect'

const WalletConnectStory: ComponentMeta<typeof WalletConnect> = {
  title: 'Wallet Connection/WalletConnectStory',
  component: WalletConnect,
  decorators: [
    (Story) => (
      <WalletConnectionProvider>
        <Story />
      </WalletConnectionProvider>
    ),
  ],
};

export default WalletConnectStory;

const Template: ComponentStory<typeof WalletConnect> = () => <WalletConnect/>;

export const WalletConnectComponent = Template.bind({});
