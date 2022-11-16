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
};

export default ModalStory;

/**
 * I believe we are able to mock context in Storybook to show the modal by default.
 * Need to look into that some more.
 */
const Template: ComponentStory<typeof Modal> = () => <Modal />;

export const ConnectModal = Template.bind({});
