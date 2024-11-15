import type { Meta, StoryObj } from '@storybook/react';
import { Toaster, ToasterProps } from './toaster';
import { Button } from '../../atoms';
import { toast } from 'sonner';

interface SBToasterProps extends ToasterProps {}

const SBToaster: React.FC<SBToasterProps> = ({ ...props }) => {
  const onClick = () => {
    toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    });
  };

  return (
    <div>
      <Toaster {...props} />
      <Button onClick={onClick}>Toast!</Button>
    </div>
  );
};

const meta: Meta<typeof SBToaster> = {
  component: SBToaster,
  title: 'UI/Toaster',
  argTypes: {
    closeButton: {
      control: { type: 'boolean' },
    },
    richColors: { control: { type: 'boolean' } },
    expand: { control: { type: 'boolean' } },
    position: {
      control: {
        type: 'radio',
        options: [
          'top-left',
          'top-center',
          'top-right',
          'bottom-left',
          'bottom-center',
          'bottom-right',
        ],
      },
    },
  },
};

type Story = StoryObj<typeof SBToaster>;

export default meta;

export const Default: Story = {
  args: {
    closeButton: false,
    richColors: false,
    expand: false,
    position: 'bottom-right',
  },
};
