import { useParams, useRouter } from 'next/navigation';
import {
  useAddTestCasesToProblemMutation,
  useGetProblemForAdminQuery,
} from '@code-judge/api-hooks';
import {
  AddTestCasesLogic,
  AddTestCasesModel,
} from '../add-testcases/add-testcases-logic';
import { handleError } from 'apps/client/utils';

export const EditTestCasesContainer = () => {
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
    testCases: data?.actualTestCases || [{ input: '', output: '' }],
  };

  if (!isSuccess) return null;
  return <AddTestCasesLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
