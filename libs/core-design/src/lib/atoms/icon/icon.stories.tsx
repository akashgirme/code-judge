import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon';
import { UserIcon } from '../../icons';

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'ATOMS/Icon',
  argTypes: {
    icon: {
      control: {
        type: 'text',
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
  },
};
type Story = StoryObj<typeof Icon>;

export default meta;

export const Default: Story = {
  args: {
    icon: UserIcon,
    className: 'bg-cn-primary w-14 h-14 rounded-full p-2',
  },
};
