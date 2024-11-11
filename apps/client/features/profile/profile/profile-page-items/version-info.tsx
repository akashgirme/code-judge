import { Chip } from '@code-judge/core-design';
import React from 'react';

export const VersionInfo = () => {
  return (
    <div className="flex justify-center items-center py-3">
      <Chip size={'lg'} variant={'secondary-link'}>
        Build V.0.1
      </Chip>
    </div>
  );
};
