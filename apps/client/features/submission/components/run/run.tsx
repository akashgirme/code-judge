'use client';
import { useCreateRunMutation, useGetRunStatusQuery } from '@code-judge/api-hooks';
import { handleError } from 'apps/client/utils';
import { useParams } from 'next/navigation';
import { setRunResponse } from '../../services';
import { useAppDispatch, useAppSelector } from 'apps/client/app/store';
import { useState } from 'react';
import { Button } from '@code-judge/core-design';

export const RunCode = () => {
  const [runId, setRunId] = useState<string | null>(null);

  const { problemId: pid } = useParams();
  const problemId = Number(pid);

  const dispatch = useAppDispatch();
  const { sourceCode, language } = useAppSelector((state) => state.submission);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const isButtonActive = isAuthenticated && Boolean(sourceCode);

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
    if (retries === 0) {
      setRunId(null);
      return;
    }

    const { data } = await refetch();

    if (data) {
      dispatch(setRunResponse(data));
    }

    if (data?.state === 'Success') {
      // dispatch(setRunResponse(data));
      setRunId(null);
      return;
    }

    //TODO: if state == 'Error' toast 'Server Error' in both run & submit

    if (runId && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return pollWithBackoff(retries - 1);
    }
  };

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
      // Wait 1 sec before fetching first status
      setTimeout(() => pollWithBackoff(7), 1000);
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      variant="primary-outline"
      isActive={isButtonActive}
      isLoading={isLoading}
    >
      {isLoading ? 'Running...' : 'Run Code'}
    </Button>
  );
};
