import { Typography } from '@code-judge/core-design';

interface TitleSectionProps {
  title?: string;
}

export const TitleSection = ({ title = '' }: TitleSectionProps) => {
  return (
    <div className="flex flex-col gap-y-6">
      <Typography fontFamily={'helvetica'} fontSize={'h1'} fontWeight={'bold'}>
        {title}
      </Typography>
      {/* <Typography fontFamily={'helvetica'} fontSize={'body-l'} fontWeight={'regular'}>
        {description}
      </Typography> */}
    </div>
  );
};
