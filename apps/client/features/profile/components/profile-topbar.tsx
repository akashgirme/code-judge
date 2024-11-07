import { Typography } from '@skill-street-ui/core-design';
import React, { FC } from 'react';
import { ArrowLeft, Xmark } from 'iconoir-react';
import { useMediaQuery } from '../../hooks';
import Link from 'next/link';

interface ProfileTopbarProps {
  backURL: string;
}

export const ProfileTopbar: FC<ProfileTopbarProps> = ({ backURL }) => {
  const isMobileView = useMediaQuery('(max-width:1030px)');
  const BackIcon = isMobileView ? ArrowLeft : Xmark;
  return (
    <div
      style={{ height: '68px' }}
      className="flex items-center max-md:h-16 gap-4 py-3 md:py-6 p-4 max-lg:bg-secondary-border-fill"
    >
      <Link href={backURL}>
        <BackIcon className="h-6 w-6" />
      </Link>
      <Typography
        className="flex-1"
        fontSize={isMobileView ? 'h4' : 'h3'}
        fontWeight={isMobileView ? 'regular' : 'bold'}
        fontFamily={'helvetica'}
      >
        Profile
      </Typography>
    </div>
  );
};
