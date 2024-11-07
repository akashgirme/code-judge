import type { Meta, StoryObj } from '@storybook/react';
import { CreateUserContainer } from './create-user-container';

const meta: Meta<typeof CreateUserContainer> = {
  component: CreateUserContainer,
  title: 'MOLECULES/Create User Form',
};

type Story = StoryObj<typeof CreateUserContainer>;

export default meta;

export const Default: Story = {
  args: {},
};
