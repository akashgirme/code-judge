import { Button, Typography } from '@skill-street-ui/core-design';
import { useMediaQuery } from 'apps/home/features/hooks';
import { formatDate } from 'apps/home/utils';
import { ShareAndroid } from 'iconoir-react';
import { toast } from 'sonner';

interface MetaDataProps {
  blogDate?: string;
}

const copyCurrentUrl = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('url copied');
  } catch (error) {
    console.log(error);
  }
};

export const MetaData: React.FC<MetaDataProps> = ({ blogDate }) => {
  const isMobileView = !useMediaQuery('(min-width:768px)');
  return (
    <div className="flex flex-wrap justify-between gap-2 items-center w-full">
      <Typography
        fontFamily={'helvetica'}
        fontWeight={'bold'}
        fontSize="h5"
        gradientColor
      >
        Career Guidance
      </Typography>
      <div className="flex gap-x-6 items-center">
        <Typography
          className="text-body-secondary"
          fontSize="label"
          fontFamily={'helvetica'}
          fontWeight={'regular'}
        >
          {blogDate && (
            <>
              {!isMobileView && 'Published on'} {formatDate(blogDate)}
            </>
          )}
        </Typography>
        {!isMobileView && (
          <Button onClick={copyCurrentUrl} variant={'ghost'} size={'icon'}>
            <ShareAndroid className="size-6 m-1" />
          </Button>
        )}
      </div>
    </div>
  );
};
