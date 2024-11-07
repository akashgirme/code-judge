import { OptionWrapper } from '@skill-street-ui/core-design';
import { handleComingSoonAlert } from 'apps/home/utils';
import React from 'react';
import { Key } from 'iconoir-react';

export const UpdatePassword = () => {
  return (
    <OptionWrapper
      title="Update Password"
      Icon={<Key className="size-4" />}
      onClick={handleComingSoonAlert}
    />
  );
};
