import { CardDescription, CardHeader, CardTitle, Typography } from '@code-judge/ui';
import { BackButton } from '../back-button';
import { ReactNode } from 'react';
import { HeaderData } from '../../constant';

interface PageHeaderProps {
  title?: string | ReactNode;
  description?: string | ReactNode;
  hideBackButton?: boolean;
  hideLogo?: boolean;
  SkipButton?: ReactNode;
  prevRoute?: string;
  email?: string;
}
export const PageHeader = ({
  title = HeaderData.title,
  description = HeaderData.description,
  hideBackButton = false,
  hideLogo = false,
  SkipButton,
  prevRoute,
  email,
}: PageHeaderProps) => {
  return (
    <div>
      {!hideBackButton && (
        <div className="h-16 flex items-center w-full relative">
          {!hideBackButton && <BackButton prevRoute={prevRoute} />}
          {SkipButton}
        </div>
      )}
      <div className="flex flex-col items-start py-6 ">
        <CardHeader className="flex flex-col items-center w-full p-0 gap-4 ">
          <div className="flex flex-col items-center gap-2 w-full">
            <CardTitle>
              <Typography
                component={'h2'}
                fontFamily={'helvetica'}
                fontSize={'h2'}
                fontWeight={'bold'}
                // Only `bold` , `regular` & `medium` for helvetica neue
              >
                {title}
              </Typography>
            </CardTitle>
            <CardDescription className="w-max">
              <Typography
                fontFamily={'roboto'}
                fontSize={'body-m'}
                fontWeight={'regular'}
                className="text-center text-body-secondary"
              >
                <>
                  {description}
                  <br /> {email}
                </>
              </Typography>
            </CardDescription>
          </div>
        </CardHeader>
      </div>
    </div>
  );
};
