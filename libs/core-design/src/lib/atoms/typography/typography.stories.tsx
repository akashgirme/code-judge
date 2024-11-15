import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './typography';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'ATOMS/Typography',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    variant: {
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body1',
        'body2',
        'caption',
      ],
      control: {
        type: 'select',
      },
    },
    component: {
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: {
        type: 'select',
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    children: 'Sample Text',
    variant: 'body1',
    component: 'p',
    className: 'text-white',
  },
};

type Story = StoryObj<typeof Typography>;

export default meta;

export const Default = {
  args: {},
};
