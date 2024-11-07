'use client';
import { ProblemDto } from '@code-judge/api-hooks';
import { ProblemDetails, ProblemHeroSection } from './components';

interface ProblemDetailViewProps {
  data: ProblemDto;
}

export const ProblemDetailView = ({ data }: ProblemDetailViewProps) => {
  return (
    <div className="flex flex-col w-full items-center lg:gap-y-16 bg-surface-container">
      <ProblemHeroSection
        title={data.title}
        difficulty={data.difficulty}
        author={data.author.username}
      />
      <ProblemDetails description={data.description} />
    </div>
  );
};
