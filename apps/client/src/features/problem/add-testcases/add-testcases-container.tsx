'use client';
import {
  useAddTestCasesToProblemMutation,
  useGetProblemForAdminQuery,
} from '@code-judge/api-client';
import { useNavigate, useParams } from 'react-router-dom';
import { AddTestCasesLogic, AddTestCasesModel } from './add-testcases-logic';
import { handleError } from '../../../utils';
import { toast } from 'sonner';
import { Check } from 'iconoir-react';

export const AddTestCasesContainer = () => {
  const navigate = useNavigate();
  const { problemId: id } = useParams();
  const problemId = Number(id);

  const { data, isSuccess } = useGetProblemForAdminQuery({ problemId });

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
      toast.success(
        <div className="flex items-center">
          <Check className="mr-4" /> {message}
        </div>
      );
      setTimeout(() => {
        navigate(`/problems/${problemId}`);
      }, 2000);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const defaultValues: AddTestCasesModel = {
    input: data?.testCasesInput || '',
    output: data?.testCasesOutput || '',
  };

  if (!isSuccess) return null;
  return <AddTestCasesLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
