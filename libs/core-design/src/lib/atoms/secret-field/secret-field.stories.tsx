import type { Meta, StoryObj } from '@storybook/react';
import { SecretField } from './secret-field';
import { UserIcon } from '../../icons';

const meta: Meta<typeof SecretField> = {
  component: SecretField,
  title: 'ATOMS/SecretField',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    value: {
      control: {
        type: 'text',
      },
    },
    name: {
      control: {
        type: 'text',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    hasError: {
      control: {
        type: 'boolean',
      },
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    enableToggle: {
      control: {
        type: 'boolean',
      },
    },
  },
};
type Story = StoryObj<typeof SecretField>;

export default meta;

export const Default: Story = {
  args: {
    id: 'password',
    name: 'password',
    label: 'Password',
    icon: UserIcon,
    showIcon: true,
    enableToggle: true,
    hideLabel: true,
    placeholder: 'enter a strong password',
  },
};
