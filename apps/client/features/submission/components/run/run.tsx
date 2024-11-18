'use client';
import { useCreateRunMutation, useGetRunStatusQuery } from '@code-judge/api-hooks';
import { handleError } from 'apps/client/utils';
import { useParams } from 'next/navigation';
import { setRunResponse } from '../../services';
import { useAppDispatch, useAppSelector } from 'apps/client/app/store';
import { useEffect, useState } from 'react';
import { Button } from '@code-judge/core-design';
import { toast } from 'sonner';

export const RunCode = () => {
  const [runId, setRunId] = useState<string | null>(null);

  const { problemId: pid } = useParams();
  const problemId = Number(pid);

  const dispatch = useAppDispatch();
  const { sourceCode, language } = useAppSelector((state) => state.submission);

  const [submit, { isLoading }] = useCreateRunMutation({
    fixedCacheKey: 'run',
  });

  const { refetch } = useGetRunStatusQuery(
    { id: runId || '' },
    {
      skip: !runId,
    }
  );

  const pollWithBackoff = async (retries: number): Promise<void> => {
    console.log('remaining retries: ', retries);
    if (retries === 0) {
      setRunId(null);
      toast.error('Internal server error. Please try again.');
      return;
    }

    try {
      const { data } = await refetch();

      console.log('data: ', data);

      if (data) {
        dispatch(setRunResponse(data));

        // Check for terminal states
        if (data.state === 'Success' || data.state === 'Error') {
          setRunId(null);
          return;
        }
      }

      console.log(`Poll number ${7 - retries} completed`);

      // Continue polling if we haven't reached a terminal state
      if (runId && retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return pollWithBackoff(retries - 1);
      }
    } catch (error) {
      handleError(error as Error);
      setRunId(null);
    }
  };

  const handleSubmit = async () => {
    if (!sourceCode || sourceCode == '') {
      toast.error('Code should not be empty.');
      return;
    }
    try {
      const { id } = await submit({
        createSubmissionDto: {
          problemId,
          sourceCode,
          language,
        },
      }).unwrap();
      setRunId(id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await pollWithBackoff(7);
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      variant="primary-outline"
      isActive={true}
      isLoading={isLoading}
    >
      {isLoading ? 'Running...' : 'Run Code'}
    </Button>
  );
};
