import {ComponentStory, ComponentMeta} from '@storybook/react';
import {WalletConnectionProvider} from '../../providers/WalletConnectionProvider';
import WalletConnectionDemo from './WalletConnectionDemo'

const WalletConnectionDemoStory: ComponentMeta<typeof WalletConnectionDemo> = {
  title: 'Wallet Connection/Wallet Connection Demo',
  component: WalletConnectionDemo,
  decorators: [
    (Story) => (
      <WalletConnectionProvider>
        <Story />
      </WalletConnectionProvider>
    ),
  ],
};

export default WalletConnectionDemoStory;

const Template: ComponentStory<typeof WalletConnectionDemo> = () => <WalletConnectionDemo/>;

export const WalletConnectionDemoComponent = Template.bind({});
