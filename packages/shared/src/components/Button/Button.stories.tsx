import {Meta, StoryObj} from '@storybook/react';

import {Text} from '../Text';

import {Button} from './Button';
import type {ButtonProps} from './types';

const Variants = [
  {
    key: 'Sm',
    title: 'Small',
  },
  {
    key: 'Md',
    title: 'Medium',
  },
  {
    key: 'Lg',
    title: 'Large',
  },
];

const ButtonStory: Meta<ButtonProps> = {
  title: 'Shared/Button',
  component: (args: ButtonProps) => {
    return (
      <>
        {Variants.map(({key, title}) => {
          return (
            <div key={key} style={{marginBottom: '2rem'}}>
              <Text variant="headingMd">{title}</Text>
              <Button {...args} size={key as ButtonProps['size']} />
            </div>
          );
        })}
      </>
    );
  },
};

type Story = StoryObj<ButtonProps>;

const DefaultArgTypes = {
  className: {
    table: {
      disable: true,
    },
  },
  disabled: {
    table: {
      disable: true,
    },
  },
  link: {
    table: {
      disable: true,
    },
  },
  primary: {
    table: {
      disable: true,
    },
  },
};

const DefaultArgs = {
  label: 'Connect Wallet',
  fullWidth: false,
  loading: false,
  disabled: false,
  link: undefined,
};

export const Primary: Story = {
  args: {
    ...DefaultArgs,
    primary: true,
  },
  argTypes: DefaultArgTypes,
};

export const Secondary: Story = {
  args: {
    ...DefaultArgs,
    primary: false,
  },
  argTypes: DefaultArgTypes,
};

export const Disabled: Story = {
  args: {
    ...DefaultArgs,
    disabled: true,
  },
  argTypes: DefaultArgTypes,
};

export default ButtonStory;
