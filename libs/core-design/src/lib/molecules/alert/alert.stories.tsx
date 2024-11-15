import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './alert';
import { Button } from '../../atoms';

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'MOLECULES/Alert',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },

    severity: {
      control: {
        type: 'radio',
        options: ['error', 'warning', 'info', 'success'],
      },
    },
    variant: {
      control: {
        type: 'radio',
        options: ['default', 'filled', 'outlined'],
      },
    },
    title: {
      control: {
        type: 'text',
      },
    },
  },
};

type Story = StoryObj<typeof Alert>;

export default meta;

export const Default: Story = {
  args: {
    children: 'This is an alert!',
    severity: 'info',
    variant: 'default',
    title: '',
    action: (
      <Button variant="link" className="text-inherit">
        ACTION
      </Button>
    ),
  },
};
