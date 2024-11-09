import { Typography } from '@code-judge/core-design';

interface TitleSectionProps {
  title?: string;
}

export const TitleSection = ({ title = '' }: TitleSectionProps) => {
  return (
    <div className="flex gap-y-6">
      <Typography fontFamily={'helvetica'} fontSize={'body-l'} fontWeight={'medium'}>
        {title}
      </Typography>
      {/* <Typography fontFamily={'helvetica'} fontSize={'body-l'} fontWeight={'regular'}>
        {description}
      </Typography> */}
    </div>
  );
};
