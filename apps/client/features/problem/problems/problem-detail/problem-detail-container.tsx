import { API } from '@code-judge/api-hooks';
import { ProblemDetailView } from './problem-detail-view';
import { Suspense } from 'react';

export const ProblemDetailContainer = async ({ problemId }: { problemId: number }) => {
  const response = await API.getProblemByProblemId({ problemId });
  if (!response.data || !response.success || response.error) return <>no data</>;
  return (
    <Suspense fallback={<>Loading</>}>
      <ProblemDetailView data={response.data} />
    </Suspense>
  );
};
