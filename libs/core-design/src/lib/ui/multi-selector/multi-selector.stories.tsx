import type { Meta, StoryObj } from '@storybook/react';
import MultipleSelector from './multi-selector';

const meta: Meta<typeof MultipleSelector> = {
  component: MultipleSelector,
  title: 'ATOMS/MultipleSelector',
  argTypes: {},
};
type Story = StoryObj<typeof MultipleSelector>;

export default meta;

export const Default: Story = {
  args: {
    value: [
      { value: 'val2', label: 'Value 2' },
      { value: 'val1', label: 'Value 1' },
    ],
    options: [
      { value: 'val1', label: 'Value 1' },
      { value: 'val2', label: 'Value 2' },
      { value: 'val3', label: 'Value 3' },
      { value: 'val4', label: 'Value 4' },
    ],
    defaultOptions: [
      { value: 'val1', label: 'Value 1' },
      { value: 'val2', label: 'Value 2' },
      { value: 'val3', label: 'Value 3' },
      { value: 'val4', label: 'Value 4' },
    ],
  },
};
