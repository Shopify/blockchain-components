import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useConnect} from 'wagmi';
import {WalletConnectionProvider} from '../../providers/WalletConnectionProvider';

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
  argTypes: {
    backgroundColor: {control: 'color'},
  },
};

export default ButtonStory;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => {
  // Show buttons for all available connectors from useConnect.
  const {connect, connectors, isLoading} = useConnect();

  return (
    <>
      {connectors.map((connector) => (
        <Button
          {...args}
          key={connector.id}
          onClick={() => connect({connector})}
          label={isLoading ? 'Loading...' : connector.name}
        />
      ))}
    </>
  );
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

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
