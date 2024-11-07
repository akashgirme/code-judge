'use client';
import {
  useCreateSubmissionMutation,
  useGetSubmissionByIdQuery,
  useGetSubmitStatusQuery,
} from '@code-judge/api-hooks';
import { handleError } from '../../../utils';
import { CreateSubmissionLogic, CreateSubmissionModel } from './create-submission-logic';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { setSubmission } from '../services/submission-slice';
import { useAppDispatch } from '../../../app/store';
import { useEffect, useState } from 'react';
import { Check, CircleX } from 'lucide-react';

interface CreateSubmissionContainerProps {
  onSubmissionSuccess: () => void;
}

export const CreateSubmissionContainer: React.FC<CreateSubmissionContainerProps> = ({
  onSubmissionSuccess,
}) => {
  const [submissionId, setSubmissionId] = useState<number | null>(null);
  const [pollRetries, setPollRetries] = useState<number>(0);

  const { problemId: pid } = useParams();
  const problemId = Number(pid);

  const dispatch = useAppDispatch();

  const [createSubmission, { isLoading }] = useCreateSubmissionMutation({
    fixedCacheKey: 'createSubmission',
  });

  const { refetch } = useGetSubmitStatusQuery(
    { submissionId: submissionId || '' },
    {
      skip: !submissionId,
    }
  );
  useEffect(() => {
    const pollWithBackoff = async (id: number, retries: number) => {
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

  const handleSubmit = async (data: CreateSubmissionModel) => {
    try {
      const { id } = await createSubmission({
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

  const defaultValues: CreateSubmissionModel = {
    sourceCode: `// You've to manually read the test cases,
    //Input them yourself, and print the outputs for verification.
    `,
    language: 'cpp',
  };

  return (
    <CreateSubmissionLogic
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};
