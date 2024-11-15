import type { Meta, StoryObj } from '@storybook/react';
import { HelperText } from './helper-text';

const meta: Meta<typeof HelperText> = {
  component: HelperText,
  title: 'ATOMS/HelperText',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    hasError: {
      control: {
        type: 'boolean',
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
    children: 'Sample Helper Text',
    hasError: false,
  },
};

export default meta;

export const Default = {
  args: {},
};
