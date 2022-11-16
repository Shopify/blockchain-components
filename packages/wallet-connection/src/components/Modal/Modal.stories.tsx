import {ComponentStory, ComponentMeta} from '@storybook/react';
import {WalletConnectionProvider} from '../../providers/WalletConnectionProvider';

import Modal from './Modal';

const ModalStory: ComponentMeta<typeof Modal> = {
  title: 'Wallet Connection/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <WalletConnectionProvider>
        <Story />
      </WalletConnectionProvider>
    ),
  ],
  argTypes: {
    screen: {
      control: 'select',
      options: ['Connect', 'WhatAreWallets', 'Connecting', 'Scan'],
    },
  },
};

export default ModalStory;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const ConnectModal = Template.bind({});
ConnectModal.args = {
  screen: 'Connect',
  open: true,
  onClose: () => {}
};
