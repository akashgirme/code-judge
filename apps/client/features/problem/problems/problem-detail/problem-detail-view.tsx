'use client';
import { ProblemDto } from '@code-judge/api-hooks';
import { ProblemDetails, ProblemHeroSection } from './components';
import { Loading } from 'apps/client/components';

interface ProblemDetailViewProps {
  problem: ProblemDto;
  isLoading: boolean;
}

export const ProblemDetailView = ({ problem, isLoading }: ProblemDetailViewProps) => {
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col w-full h-full items-left">
      <ProblemHeroSection title={problem.title} difficulty={problem.difficulty} />
      <div className="flex-1 overflow-auto">
        <ProblemDetails description={problem.description} />
      </div>
    </div>
  );
};
