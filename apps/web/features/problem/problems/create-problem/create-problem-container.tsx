'use client';
import { useRouter } from 'next/navigation';
import { CreateProblemLogic, CreateProblemModel } from './create-problem-logic';
import { useCreateProblemMutation } from '@algo-forge/api-hooks';
import { handleError } from 'apps/web/utils';

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
    internalNotes: '',
    tags: [],
    description: '',
    difficulty: 'easy',
    status: 'unpublished',
    exampleTestCases: [{ input: '', output: '' }],
    actualTestCases: [{ input: '', output: '' }],
  };

  return <CreateProblemLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
