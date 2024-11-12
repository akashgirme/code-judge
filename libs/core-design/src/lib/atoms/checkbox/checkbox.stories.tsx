import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'ATOMS/Checkbox',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    checked: {
      control: {
        type: 'boolean',
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
  },
};
type Story = StoryObj<typeof Checkbox>;

export default meta;

export const Default: Story = {
  args: {
    id: 'acceptTerms',
    name: 'acceptTerms',
    label: 'Accept Terms & Conditions',
  },
};
