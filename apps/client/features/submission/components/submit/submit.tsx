'use client';
import {
  useCreateSubmissionMutation,
  useGetSubmitStatusQuery,
} from '@code-judge/api-hooks';
import { handleError } from 'apps/client/utils';
import { useParams } from 'next/navigation';
import { setSubmitResponse } from '../../services';
import { useAppDispatch, useAppSelector } from 'apps/client/app/store';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const pollWithBackoff = async (id: string, retries: number) => {
      if (retries === 0) {
        setSubmissionId(null);
        return;
      }

      const { data } = await refetch();
      if (data) {
        dispatch(setSubmitResponse(data));
      } else {
        setTimeout(() => pollWithBackoff(id, retries - 1), 1000);
        return;
      }

      if (data.state === 'Success') {
        setSubmissionId(null);
        return;
      }

      if (submissionId && pollRetries > 0) {
        setTimeout(() => pollWithBackoff(submissionId, pollRetries), 1000);
      }
    };
  }, [submissionId, pollRetries, refetch, dispatch]);

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
      setPollRetries(7);
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      variant="primary"
      // isActive={isValid}
      isLoading={isLoading}
    >
      {isLoading ? 'Pending...' : 'Submit'}
    </Button>
  );
};
