import {ComponentStory, ComponentMeta} from '@storybook/react';
import {WalletConnectionProvider} from '../../providers/WalletConnectionProvider';

import ConnectWalletButton from './ConnectWalletButton';
import { useModal } from '../../hooks';

const ConnectWalletButtonStory: ComponentMeta<typeof ConnectWalletButton> = {
  title: 'Wallet Connection/ConnectWalletButton',
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

const Template: ComponentStory<typeof ConnectWalletButton> = () => {
    const [isModalOpen, toggleModal] = useModal();

  return (
        <ConnectWalletButton
          onClick={toggleModal}
          label='Connect wallet'
        />
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: 'Connect wallet',
};
