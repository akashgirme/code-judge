import { Chip, Typography } from '@skill-street-ui/core-design';
import { SocialLinks } from 'apps/home/constants';
import { useMediaQuery } from 'apps/home/features/hooks';
import { IconType } from 'apps/home/types';

export const CopyrightContainer = () => {
  const isWebView = useMediaQuery('(min-width:1030px)');
  return (
    <div className="flex bg-background justify-between py-4 px-4 lg:px-20 flex-wrap-reverse items-center gap-4">
      <div className="flex gap-3 w-full lg:w-max justify-between">
        <Typography
          fontSize={isWebView ? 'h6' : 'body-l'}
          className="text-body-tertiary"
          fontWeight={'medium'}
          fontFamily={'helvetica'}
        >
          © 2024 SkillStreet.io
        </Typography>
        <Typography
          fontSize={isWebView ? 'h6' : 'body-l'}
          className="text-body-tertiary"
          fontWeight={'medium'}
          fontFamily={'helvetica'}
        >
          Terms & Conditions
        </Typography>
        <Typography
          fontSize={isWebView ? 'h6' : 'body-l'}
          className="text-body-tertiary"
          fontWeight={'medium'}
          fontFamily={'helvetica'}
        >
          Privacy Policy
        </Typography>
      </div>
      <div className="flex w-full lg:w-max max-lg:justify-between gap-6 items-center">
        <div className="flex gap-2 lg:gap-6 items-center">
          {SocialLinks.map((link) => (
            <SingleLink key={link.title} {...link} />
          ))}
        </div>
        <Chip variant={'primary-btn'} size={'sm'} state="active">
          Investor&apos;s Corner
        </Chip>
      </div>
    </div>
  );
};

interface SingleLinkProps {
  title: string;
  Icon: IconType;
}

const SingleLink = ({ title, Icon }: SingleLinkProps) => {
  const isWebView = useMediaQuery('(min-width:1030px)');

  return (
    <Typography
      fontSize={'body-m'}
      className="text-body-tertiary"
      fontWeight={'semibold'}
      fontFamily={'helvetica'}
    >
      {isWebView ? title : <Icon className="size-6 " />}
    </Typography>
  );
};
