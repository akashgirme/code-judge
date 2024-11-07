'use client';
import {
  useAddTestCasesToProblemMutation,
  useGetProblemForAdminQuery,
} from '@code-judge/api-hooks';
import { useParams } from 'react-router-dom';
import { AddTestCasesLogic, AddTestCasesModel } from './add-testcases-logic';
import { handleError } from 'apps/client/utils';
import { useRouter } from 'next/router';

export const AddTestCasesContainer = () => {
  const router = useRouter();

  const { problemId: id } = useParams();
  const problemId = Number(id);

  const { data, isSuccess } = useGetProblemForAdminQuery({ problemId });

  const [addTestCases] = useAddTestCasesToProblemMutation({
    fixedCacheKey: 'addTestCases',
  });

  const handleSubmit = async (data: AddTestCasesModel) => {
    try {
      const {} = await addTestCases({
        problemId,
        createTestCasesDto: {
          ...data,
        },
      }).unwrap();
      router.push(`/admin/problems`);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const defaultValues: AddTestCasesModel = {
    testCases: [{ input: '', output: '' }],
  };

  if (!isSuccess) return null;
  return <AddTestCasesLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
