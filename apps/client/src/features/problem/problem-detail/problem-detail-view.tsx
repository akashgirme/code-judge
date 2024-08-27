'use client';
import { useGetProblemQuery } from '@code-judge/api-client';
import { Card, Typography } from '@code-judge/ui';
import { MarkdownView } from '../../../components';
import { useParams } from 'react-router-dom';

export const ProblemDetailView = () => {
  const { problemId: id } = useParams();
  const problemId = Number(id);
  const { data: problem, isFetching, isLoading } = useGetProblemQuery({ problemId });
  if (isFetching || isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Card className="h-full">
      <div className="flex flex-col grid gap-4 p-5">
        <div>
          {' '}
          <Typography variant="h2">
            <b>{problem?.title}</b>
          </Typography>
        </div>
        <div>
          {' '}
          <MarkdownView content={problem?.description ?? ''} />
        </div>
      </div>
    </Card>
  );
};
