'use client';
import { useGetProblemQuery } from '@code-judge/api-client';
import { Card, Typography } from '@code-judge/ui';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

export const ProblemDetailView = () => {
  const { problemId: id } = useParams();
  const problemId = Number(id);
  const { data, isFetching, isLoading } = useGetProblemQuery({ problemId });
  if (isFetching || isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Card className="h-full">
      <div className="flex flex-col w-full h-full pl-4 items-left">
        <div>
          <Typography variant="h2">
            <b>{data?.title}</b>
          </Typography>
        </div>
        <div>
          <ReactMarkdown>{data?.description}</ReactMarkdown>
        </div>
      </div>
    </Card>
  );
};
