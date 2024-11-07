'use client';
import { useRouter } from 'next/navigation';
import { CreateProblemLogic, CreateProblemModel } from './create-problem-logic';
import { useCreateProblemMutation } from '@code-judge/api-hooks';
import { handleError } from 'apps/client/utils';

export const CreateProblemContainer = () => {
  const router = useRouter();

  const [createProblem] = useCreateProblemMutation({
    fixedCacheKey: 'createProblem',
  });

  const handleSubmit = async (data: CreateProblemModel) => {
    try {
      const { id } = await createProblem({
        createProblemDto: {
          ...data,
          tagIds: data.tags.map((tag) => parseInt(tag.value)),
        },
      }).unwrap();
      router.push(`/problems/${id}`);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const defaultValues: CreateProblemModel = {
    title: '',
    remark: '',
    tags: [],
    description: '',
    difficulty: 'easy',
    status: 'unpublished',
    testCases: [{ input: '', output: '' }],
  };

  return <CreateProblemLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
