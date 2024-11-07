import { ProfileDto } from '@skill-street-ui/auth-client';
import { Chip, Typography } from '@skill-street-ui/core-design';
import { UserAvatar } from 'apps/home/components';
import Link from 'next/link';
import React from 'react';
import { EditPencil } from 'iconoir-react';

export const ProfileData = ({ data }: { data: ProfileDto | undefined }) => {
  return (
    <div className="py-6 px-4 flex items-center gap-x-4">
      <UserAvatar imgHeight={44} imgWidth={44} variant="circle" />
      <div className="flex-1 overflow-hidden max-w-full">
        <Typography
          fontFamily={'helvetica'}
          fontSize={'body-l'}
          fontWeight={'medium'}
        >
          {data?.user.firstName} {data?.user.lastName}
        </Typography>
        <Typography
          fontFamily={'helvetica'}
          fontSize={'body-s'}
          fontWeight={'regular'}
          className="max-w-full text-ellipsis"
        >
          {data?.user.email}
        </Typography>
      </div>
      <Link href={'/profile/edit'}>
        <Chip variant="secondary-btn">
          <EditPencil className="size-4 fill-secondary" />
          Edit
        </Chip>
      </Link>
    </div>
  );
};
