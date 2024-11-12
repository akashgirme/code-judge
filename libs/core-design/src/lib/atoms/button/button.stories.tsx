import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'ATOMS/new-Button',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    variant: {
      control: {
        type: 'radio',
        options: [
          'default',
          'destructive',
          'outline',
          'secondary',
          'ghost',
          'link',
          'primary',
        ],
      },
    },
    size: {
      control: {
        type: 'radio',
        options: ['default', 'sm', 'lg', 'icon'],
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    children: 'Click Me',
  },
};

type Story = StoryObj<typeof Button>;

export default meta;

export const Default: Story = {
  args: {},
};
