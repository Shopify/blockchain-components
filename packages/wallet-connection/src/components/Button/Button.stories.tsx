import {ComponentStory, ComponentMeta} from '@storybook/react';
import {WalletConnectionProvider} from '../../providers/WalletConnectionProvider';
import {useModal} from '../../providers/ModalProvider';

import {Button} from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const ButtonStory: ComponentMeta<typeof Button> = {
  title: 'Wallet Connection/Button',
  component: Button,
  decorators: [
    (Story) => (
      <WalletConnectionProvider>
        <Story />
      </WalletConnectionProvider>
    ),
  ],
};

export default ButtonStory;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => {
  // Show buttons for all available connectors from useConnect.
  const {openModal} = useModal();

  return <Button {...args} onClick={openModal} label={'Connect Wallet'} />;
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};
