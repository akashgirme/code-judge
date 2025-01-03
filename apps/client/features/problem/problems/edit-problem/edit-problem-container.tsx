import { useParams, useRouter } from 'next/navigation';
import {
  CreateProblemLogic,
  CreateProblemModel,
} from '../create-problem/create-problem-logic';
import {
  useGetProblemForAdminQuery,
  useUpdateProblemMutation,
} from '@code-judge/api-hooks';

export const EditProblemContainer = () => {
  const router = useRouter();
  const { problemId: id } = useParams();
  const problemId = Number(id);
  const { data, isSuccess } = useGetProblemForAdminQuery({ problemId });

  const [updatePost] = useUpdateProblemMutation({
    fixedCacheKey: 'createPost',
  });

  const handleSubmit = async (data: CreateProblemModel) => {
    console.log(data);
    const { id } = await updatePost({
      problemId,
      updateProblemDto: {
        ...data,
        tagIds: data.tags.map((tag) => parseInt(tag.value)),
      },
    }).unwrap();
    // revalidator(`post-${id}`);
    router.push(`/problems/${id}`);
  };

  const defaultValues: CreateProblemModel = {
    title: data?.title || '',
    description: data?.description || '',
    internalNotes: data?.internalNotes || '',
    difficulty: data?.difficulty || 'easy',
    tags: data?.tags.map((tag) => ({ value: `${tag.id}`, label: tag.name })) || [],
    status: data?.status || 'unpublished',
    exampleTestCases: data?.exampleTestCases || [{ input: '', output: '' }],
    actualTestCases: data?.actualTestCases || [{ input: '', output: '' }],
  };

  if (!isSuccess) return null;
  return <CreateProblemLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
