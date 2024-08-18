'use client';
import { useCreateSubmissionMutation } from '@code-judge/api-client';
import { handleError } from '../../../utils';
import { CreateSubmissionLogic, CreateSubmissionModel } from './create-submission-logic';
import { useParams } from 'react-router-dom';

export const CreateSubmissionContainer = () => {
  const [createProblem] = useCreateSubmissionMutation({
    fixedCacheKey: 'createSubmission',
  });
  const { problemId: pid } = useParams();
  const problemId = Number(pid);
  const handleSubmit = async (data: CreateSubmissionModel) => {
    try {
      const { id } = await createProblem({
        createSubmissionDto: {
          problemId,
          ...data,
        },
      }).unwrap();
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
