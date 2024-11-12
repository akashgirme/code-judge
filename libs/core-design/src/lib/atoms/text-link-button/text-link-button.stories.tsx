import type { Meta, StoryObj } from '@storybook/react';
import { TextLinkButton } from './text-link-button';

const meta: Meta<typeof TextLinkButton> = {
  component: TextLinkButton,
  title: 'ATOMS/TextLinkButton',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    color: {
      control: {
        type: 'radio',
        options: ['primary', 'white'],
      },
    },
    isUnderlined: {
      control: {
        type: 'boolean',
      },
    },
    href: {
      control: {
        type: 'text',
      },
    },
    onClick: {
      control: {
        type: 'select',
      },
    },
    typographyProps: {
      control: {
        type: 'object',
      },
    },
  },
  args: {
    children: 'Click Me',
    color: 'primary',
    isUnderlined: true,
    href: 'https://www.google.com',
    target: '_blank',
  },
};

type Story = StoryObj<typeof TextLinkButton>;

export default meta;

export const Default: Story = {
  args: {},
};
