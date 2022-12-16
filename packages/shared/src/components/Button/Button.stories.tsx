import {ComponentStory, ComponentMeta} from '@storybook/react';

import {RootProvider} from '../../providers/RootProvider';

import {Button} from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const ButtonStory: ComponentMeta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  decorators: [
    (Story) => (
      <RootProvider>
        <Story />
      </RootProvider>
    ),
  ],
};

export default ButtonStory;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} label="Connect Wallet" />;
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
