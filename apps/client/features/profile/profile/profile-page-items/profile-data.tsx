import { User } from '@code-judge/api-hooks';
import { Chip, Typography } from '@code-judge/core-design';
import { UserAvatar } from 'apps/client/components';
import Link from 'next/link';
import React from 'react';
import { EditPencil } from 'iconoir-react';

export const ProfileData = ({ data }: { data: User | undefined }) => {
  return (
    <div className="py-6 px-4 flex items-center gap-x-4">
      <UserAvatar imgHeight={44} imgWidth={44} variant="circle" />
      <div className="flex-1 overflow-hidden max-w-full">
        <Typography fontFamily={'helvetica'} fontSize={'body-l'} fontWeight={'medium'}>
          {data?.firstName} {data?.lastName}
        </Typography>
        <Typography
          fontFamily={'helvetica'}
          fontSize={'body-s'}
          fontWeight={'regular'}
          className="max-w-full text-ellipsis"
        >
          {data?.email}
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
