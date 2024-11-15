import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalProps } from './modal';
import { Button, Typography } from '../../atoms';
import { useState } from 'react';
import { cn } from '../../utils';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui';

interface SBModalProps extends ModalProps {}

const SBModal: React.FC<SBModalProps> = ({
  isLocked,
  className,
}: SBModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Show Modal</Button>
      <Modal
        className={cn('w-3/4', className)}
        isOpen={isOpen}
        isLocked={isLocked}
        onClose={onClose}
      >
        <Card className="bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Sample Header{' '}
              <button onClick={onClose} className="text-sm">
                X
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography>Sample Modal Text Content</Typography>
            <Button className="mt-3" onClick={onClose}>
              Close
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

const meta: Meta<typeof SBModal> = {
  component: SBModal,
  title: 'MOLECULES/Modal',
  argTypes: {
    isLocked: {
      control: {
        type: 'boolean',
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SBModal>;

export const Default: Story = {
  args: {},
};
