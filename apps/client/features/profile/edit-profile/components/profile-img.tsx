import { UserAvatar } from 'apps/client/components';
import React from 'react';

export const ProfileImg = () => {
  return (
    <div className=" py-6 flex items-center justify-center ">
      <div className="relative">
        <UserAvatar imgHeight={100} imgWidth={100} />
        <div className="size-7 flex items-center justify-center absolute right-1 bottom-1 bg-secondary-border-fill rounded-full"></div>
      </div>
    </div>
  );
};
