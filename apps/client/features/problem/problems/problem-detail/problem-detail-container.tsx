import { API, useGetProblemQuery } from '@code-judge/api-hooks';
import { ProblemDetailView } from './problem-detail-view';
import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { Loading } from 'apps/client/components';

export const ProblemDetailContainer = () => {
  const { problemId: id } = useParams();
  const problemId = Number(id);
  const { data: problem, isFetching, isLoading } = useGetProblemQuery({ problemId });

  //TODO: handle better this case `problem not found or any error`
  if (!problem) {
    return;
  }
  return (
    <Suspense fallback={<Loading />}>
      <ProblemDetailView problem={problem} isLoading={isLoading} />
    </Suspense>
  );
};
