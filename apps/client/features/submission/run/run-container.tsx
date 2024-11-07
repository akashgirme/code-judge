'use client';
import { useCreateRunMutation, useGetSubmitStatusQuery } from '@code-judge/api-hooks';
import { handleError } from '../../../utils';
import { RunLogic, RunModel } from './run-logic';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { setSubmission } from '../services/submission-slice';
import { useAppDispatch } from '../../../app/store';
import { useEffect, useState } from 'react';
import { Check, CircleX } from 'lucide-react';

interface RunContainerProps {
  onSubmissionSuccess: () => void;
}

export const RunContainer: React.FC<RunContainerProps> = ({ onSubmissionSuccess }) => {
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [pollRetries, setPollRetries] = useState<number>(0);

  const { problemId: pid } = useParams();
  const problemId = Number(pid);

  const dispatch = useAppDispatch();

  const [submit, { isLoading }] = useCreateRunMutation({
    fixedCacheKey: 'createRun',
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
        toast.error('Unable to retrieve the result');
        setSubmissionId(null);
        return;
      }

      const { data } = await refetch();

      if (!data) {
        setTimeout(() => pollWithBackoff(id, retries - 1), 1000);
        return;
      }

      if (data.state === 'Success') {
        dispatch(setSubmission(data));
        setSubmissionId(null);
        if (data.status === 'Accepted') {
          toast.success(
            <div className="flex items-center">
              <Check className="mr-4" /> Accepted
            </div>
          );
        } else if (data.status === 'Wrong Answer') {
          toast.success(
            <div className="flex items-center">
              <CircleX className="mr-4" /> Wrong Answer
            </div>
          );
        }
        return;
      } else if (data.state === 'Error') {
        toast.error('Error in code execution');
        setSubmissionId(null);
        return;
      }
      setTimeout(() => pollWithBackoff(id, retries - 1), 2000);
    };

    if (submissionId && pollRetries > 0) {
      pollWithBackoff(submissionId, pollRetries);
    }
  }, [submissionId, pollRetries, refetch, dispatch]);

  const handleSubmit = async (data: RunModel) => {
    try {
      const { id } = await submit({
        createSubmissionDto: {
          problemId,
          ...data,
        },
      }).unwrap();
      if (id) {
        setSubmissionId(id);
        onSubmissionSuccess();
        setPollRetries(7);
      } else {
        toast.error('Invalid submission response');
      }
    } catch (error) {
      handleError(error as Error);
    }
  };

  const defaultValues: RunModel = {
    sourceCode: `// You've to manually read the test cases,
    //Input them yourself, and print the outputs for verification.
    `,
    language: 'cpp',
  };

  return (
    <RunLogic
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};
