import { Typography } from '@code-judge/core-design';

import { TitleSection } from './title-section';
import { ProblemDifficulty } from '@code-judge/api-hooks';

interface ProblemHeroSectionProps {
  title?: string;
  difficulty?: ProblemDifficulty;
  author?: string;
}

export const ProblemHeroSection = ({
  title,
  difficulty,
  author,
}: ProblemHeroSectionProps) => {
  return (
    <div className="max-w-screen flex flex-row flex-wrap-reverse sm:flex-col items-center justify-between gap-y-6 lg:gap-y-16 sm:px-4 lg:px-0 pb-6 sm:py-6 lg:py-0">
      <div className="flex flex-col gap-y-8 lg:w-3/4 xl:w-1/2 w-auto max-lg:items-center max-sm:px-4">
        <TitleSection title={title} />
        <div className="flex flex-col w-full" style={{ gap: '10px' }}>
          <Typography fontFamily={'helvetica'} fontSize={'body-l'} fontWeight={'regular'}>
            {difficulty}
          </Typography>
          <Typography fontFamily={'helvetica'} fontSize={'body-l'} fontWeight={'regular'}>
            {author}
          </Typography>
        </div>
      </div>
    </div>
  );
};
