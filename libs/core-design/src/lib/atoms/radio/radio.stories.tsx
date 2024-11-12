import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './radio';

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: 'ATOMS/Radio',
  argTypes: {
    label: {
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
  },
};
type Story = StoryObj<typeof Radio>;

export default meta;

export const Default: Story = {
  args: {
    id: 'sampleRadio',
    name: 'sampleRadio',
    label: 'Sample Radio',
  },
};
