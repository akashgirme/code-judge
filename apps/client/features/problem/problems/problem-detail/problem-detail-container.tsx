import { useGetProblemQuery } from '@code-judge/api-hooks';
import { ProblemDetailView } from './problem-detail-view';
import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { Loading } from 'apps/client/components';
import { Typography } from '@code-judge/core-design';

export const ProblemDetailContainer = () => {
  const { problemId: id } = useParams();
  const problemId = Number(id);
  const { data: problem, isLoading } = useGetProblemQuery({ problemId });

  //TODO: handle better this case `problem not found or any error`
  if (!problem) {
    return <Typography variant="h2">Problem Not Found!</Typography>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProblemDetailView problem={problem} isLoading={isLoading} />
    </Suspense>
  );
};
