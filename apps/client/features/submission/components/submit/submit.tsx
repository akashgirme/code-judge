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

export const SubmitCode = () => {
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [pollRetries, setPollRetries] = useState<number>(0);

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

  const pollWithBackoff = async (retries: number) => {
    if (retries === 0) {
      setSubmissionId(null);
      return;
    }

    const { data } = await refetch();

    if (data) {
      dispatch(setSubmitResponse(data));
    }

    if (data?.state === 'Success') {
      setSubmissionId(null);
      return;
    }

    if (submissionId && retries > 0) {
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

      setSubmissionId(id);
      // Wait 1 sec before fetching first status
      setTimeout(() => pollWithBackoff(7), 1000);
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    //TODO: isActive={}  only when there is Code in editor
    <Button
      onClick={handleSubmit}
      variant="primary"
      // isActive={Boolean(sourceCode)}
      isLoading={isLoading}
    >
      {isLoading ? 'Pending...' : 'Submit'}
    </Button>
  );
};
