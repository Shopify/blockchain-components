/* eslint-disable @shopify/jsx-no-hardcoded-content */
import {ComponentStory, ComponentMeta, Parameters} from '@storybook/react';

import {Text} from '../Text';

import {Button} from './Button';
import type {ButtonProps} from './types';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const ButtonStory: ComponentMeta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
};

export default ButtonStory;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => {
  return (
    <>
      <div style={{marginBottom: '2rem'}}>
        <Text variant="headingMd">Small</Text>
        <Button {...args} size="Sm" />
      </div>
      <div style={{marginBottom: '2rem'}}>
        <Text variant="headingMd">Medium</Text>
        <Button {...args} size="Md" />
      </div>
      <div style={{marginBottom: '2rem'}}>
        <Text variant="headingMd">Large</Text>
        <Button {...args} size="Lg" />
      </div>
    </>
  );
};

const DefaultParameters: Parameters = {
  controls: {
    exclude: ['className', 'disabled', 'id', 'onClick', 'primary', 'size'],
  },
};

const DefaultArgs: Partial<ButtonProps> = {
  label: 'Connect Wallet',
  fullWidth: false,
  loading: false,
  disabled: false,
  link: undefined,
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  ...DefaultArgs,
  primary: true,
};
Primary.parameters = DefaultParameters;

export const Secondary = Template.bind({});
Secondary.args = {
  ...DefaultArgs,
  primary: false,
};
Secondary.parameters = DefaultParameters;

export const Disabled = Template.bind({});
Disabled.args = {
  ...DefaultArgs,
  disabled: true,
};
Disabled.parameters = DefaultParameters;
