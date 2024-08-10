import { Chip, Typography } from '@skill-street-ui/core-design';
import { Sparks } from 'iconoir-react';
import { MetaData } from './meta-data';
import { TitleSection } from './title-section';
import { CldImage } from 'next-cloudinary';

interface BlogHeroSectionProps {
  title?: string;
  description?: string;
  imgSrc?: string;
  blogDate?: string;
}

export const BlogHeroSection = ({
  imgSrc = '',
  title,
  description,
  blogDate,
}: BlogHeroSectionProps) => {
  return (
    <div className="max-w-screen flex flex-row flex-wrap-reverse sm:flex-col items-center justify-between gap-y-6 lg:gap-y-16 sm:px-4 lg:px-0 pb-6 sm:py-6 lg:py-0">
      <div className="flex flex-col gap-y-8 lg:w-3/4 xl:w-1/2 w-auto max-lg:items-center max-sm:px-4">
        <MetaData blogDate={blogDate} />
        <TitleSection title={title} description={description} />
        <div className="flex flex-col w-full" style={{ gap: '10px' }}>
          <Typography
            fontFamily={'helvetica'}
            fontSize={'label'}
            fontWeight={'regular'}
          >
            Access your personalised plan to become a Full Stack Developer
          </Typography>
          <Chip state="active" variant={'primary-btn'} size={'lg'}>
            <Sparks className="w-5 h-5  fill-white" />
            Get Learning Plan
          </Chip>
        </div>
      </div>
      <CldImage
        className=" w-auto lg:w-3/5 aspect-video lg:rounded-lg overflow-hidden"
        alt="_image"
        src={imgSrc}
        width={0}
        height={0}
      />
    </div>
  );
};
