import { Wrench } from 'iconoir-react';
import { toast } from 'sonner';

export const handleComingSoonAlert = () => {
  toast(
    <div className="flex items-center">
      <Wrench className="mr-4" /> This feature is coming soon!
    </div>,
    { position: 'bottom-right' }
  );
};
