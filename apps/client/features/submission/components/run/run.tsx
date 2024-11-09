'use client';
import { useCreateRunMutation, useGetRunStatusQuery } from '@code-judge/api-hooks';
import { handleError } from 'apps/client/utils';
import { useParams } from 'next/navigation';
import { setRunResponse } from '../../services';
import { useAppDispatch, useAppSelector } from 'apps/client/app/store';
import { useEffect, useState } from 'react';
import { Button } from '@code-judge/core-design';

export const RunCode = () => {
  const [runId, setRunId] = useState<string | null>(null);
  const [pollRetries, setPollRetries] = useState<number>(0);

  const { problemId: pid } = useParams();
  const problemId = Number(pid);

  const dispatch = useAppDispatch();
  const { sourceCode, language } = useAppSelector((state) => state.submission);

  console.log('Source Code: ', sourceCode);
  console.log('Langugae:', language);

  const [submit, { isLoading }] = useCreateRunMutation({
    fixedCacheKey: 'run',
  });

  const { refetch } = useGetRunStatusQuery(
    { id: runId || '' },
    {
      skip: !runId,
    }
  );

  useEffect(() => {
    const pollWithBackoff = async (id: string, retries: number) => {
      if (retries === 0) {
        setRunId(null);
        return;
      }

      const { data } = await refetch();
      if (data) {
        dispatch(setRunResponse(data));
      } else {
        setTimeout(() => pollWithBackoff(id, retries - 1), 1000);
        return;
      }

      if (data.state === 'Success') {
        setRunId(null);
        return;
      }

      if (runId && pollRetries > 0) {
        setTimeout(() => pollWithBackoff(runId, pollRetries), 1000);
      }
    };
  }, [runId, pollRetries, refetch, dispatch]);

  const handleSubmit = async () => {
    try {
      const { id } = await submit({
        createSubmissionDto: {
          problemId,
          sourceCode: sourceCode ?? '',
          language,
        },
      }).unwrap();

      setRunId(id);
      setPollRetries(7);
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      variant="primary-outline"
      // isActive={isValid}
      isLoading={isLoading}
    >
      {isLoading ? 'Pending...' : 'Run Code'}
    </Button>
  );
};
