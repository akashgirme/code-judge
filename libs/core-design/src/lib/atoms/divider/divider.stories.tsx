import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './divider';

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: 'ATOMS/Divider',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    children: 'I am a divider',
    typographyProps: {},
  },
};

export default meta;

export const Default = {
  args: {},
};
