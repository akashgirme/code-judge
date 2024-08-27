'use client';
import { useAddTestCasesToProblemMutation } from '@code-judge/api-client';
import { useNavigate, useParams } from 'react-router-dom';
import { AddTestCasesLogic, AddTestCasesModel } from './add-testcases-logic';
import { handleError } from '../../../utils';

export const AddTestCasesContainer = () => {
  const navigate = useNavigate();
  const { problemId: id } = useParams();
  const problemId = Number(id);

  const [addTestCases] = useAddTestCasesToProblemMutation({
    fixedCacheKey: 'addTestCases',
  });

  const handleSubmit = async (data: AddTestCasesModel) => {
    try {
      const { message } = await addTestCases({
        addTestCasesDto: {
          problemId,
          ...data,
        },
      }).unwrap();
      navigate(`/problems/${problemId}`);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const defaultValues: AddTestCasesModel = {
    input: '',
    output: '',
  };

  return <AddTestCasesLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
