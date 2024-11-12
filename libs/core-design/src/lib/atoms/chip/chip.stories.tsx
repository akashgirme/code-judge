import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './chip';

const meta: Meta<typeof Chip> = {
  component: Chip,
  title: 'ATOMS/Chip',
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
          'primary-btn',
          'primary-link',
          'primary-outline',
          'secondary-btn',
          'secondary-link',
          'secondary-outline',
          'link',
        ],
      },
    },
    size: {
      control: {
        type: 'radio',
        options: ['sm', 'lg'],
      },
    },
    state: {
      control: {
        type: 'radio',
        options: ['active', 'disabled'],
      },
    },
  },
  args: {
    children: 'Chip Component',
  },
};

type Story = StoryObj<typeof Chip>;

export default meta;

export const Default: Story = {
  args: {},
};
