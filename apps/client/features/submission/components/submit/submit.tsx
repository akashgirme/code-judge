'use client';
import {
  useCreateSubmissionMutation,
  useGetSubmitStatusQuery,
} from '@code-judge/api-hooks';
import { handleError } from 'apps/client/utils';
import { useParams } from 'next/navigation';
import { setSubmitResponse } from '../../services';
import { useAppDispatch, useAppSelector } from 'apps/client/app/store';
import { useState } from 'react';
import { Button } from '@code-judge/core-design';
import { toast } from 'sonner';

export const SubmitCode = () => {
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const { problemId: pid } = useParams();
  const problemId = Number(pid);

  const dispatch = useAppDispatch();
  const { sourceCode, language } = useAppSelector((state) => state.submission);

  const [submit, { isLoading }] = useCreateSubmissionMutation({
    fixedCacheKey: 'submit',
  });

  const { refetch } = useGetSubmitStatusQuery(
    { id: submissionId || '' },
    {
      skip: !submissionId,
    }
  );

  const pollWithBackoff = async (retries: number): Promise<void> => {
    if (retries === 0) {
      setSubmissionId(null);
      toast.error('Internal server error. Please try again.');
      return;
    }

    try {
      const { data } = await refetch();

      if (data) {
        dispatch(setSubmitResponse(data));

        // Check for terminal states
        if (data?.state === 'Success') {
          setSubmissionId(null);
          return;
        }
      }

      // Continue polling if we haven't reached a terminal state
      if (submissionId && retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return pollWithBackoff(retries - 1);
      }
    } catch (error) {
      handleError(error as Error);
      setSubmissionId(null);
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

      setSubmissionId(id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await pollWithBackoff(7);
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    <Button onClick={handleSubmit} variant="primary" isActive isLoading={isLoading}>
      {isLoading ? 'Pending...' : 'Submit'}
    </Button>
  );
};
