'use client';
import {
  useCreateSubmissionMutation,
  useGetSubmissionByIdQuery,
} from '@code-judge/api-client';
import { handleError } from '../../../utils';
import { CreateSubmissionLogic, CreateSubmissionModel } from './create-submission-logic';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { setSubmission } from '../submissionSlice';
import { useAppDispatch } from '../../../app/store';

export const CreateSubmissionContainer = () => {
  const navigate = useNavigate();
  const [createSubmission] = useCreateSubmissionMutation({
    fixedCacheKey: 'createSubmission',
  });
  const getSubmission = useGetSubmissionByIdQuery;
  const { problemId: pid } = useParams();
  const problemId = Number(pid);

  const dispatch = useAppDispatch();

  const handleSubmit = async (data: CreateSubmissionModel) => {
    try {
      const { id } = await createSubmission({
        createSubmissionDto: {
          problemId,
          ...data,
        },
      }).unwrap();
      pollWithBackoff(id, 10, getSubmission, navigate, dispatch);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const defaultValues: CreateSubmissionModel = {
    code: '// Write full code, you also need to read testcases manually',
    language: 'c',
  };

  return <CreateSubmissionLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};

const pollWithBackoff = async (
  id: number,
  retries: number,
  getSubmission: any,
  navigate: any,
  dispatch: any
) => {
  if (retries === 0) {
    toast.error('Not able to get status');
    return;
  }

  const { data } = await getSubmission({ submissionId: id }).unwrap();

  try {
    if (data?.state !== 'Success') {
      await new Promise((resolve) => setTimeout(resolve, 1 * 1000));
      await pollWithBackoff(id, retries - 1, getSubmission, navigate, dispatch);
    } else {
      dispatch(setSubmission(data));
    }
  } catch (error) {
    toast.error('Error fetching submission status');
  }
};
