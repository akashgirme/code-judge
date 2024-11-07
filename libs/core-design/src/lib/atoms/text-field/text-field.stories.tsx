import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './text-field';

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: 'ATOMS/TextField',
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
    variant: {
      control: {
        type: 'radio',
        options: ['default', 'success', 'error', 'warning'],
      },
    },
  },
};
type Story = StoryObj<typeof TextField>;

export default meta;

export const Default: Story = {
  args: {
    id: 'firstName',
    name: 'firstName',
    label: 'First Name',
    variant: 'success',
    // endAdornment:<span className='text-error'>x</span>,
    helperText: 'test',
    hasError: true,
    className: 'w-[300px]',
  },
};
