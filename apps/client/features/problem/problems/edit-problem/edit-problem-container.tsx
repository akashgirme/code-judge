import { useParams, useRouter } from 'next/navigation';
import {
  CreateProblemLogic,
  CreateProblemModel,
} from '../create-problem/create-problem-logic';
import { useGetProblemQuery, useUpdateProblemMutation } from '@code-judge/api-hooks';

export const EditProblemContainer = () => {
  const router = useRouter();
  const { problemId } = useParams();
  const probId = parseInt(Array.isArray(problemId) ? problemId[0] : problemId, 10);
  // const probId = parseInt(problemId);
  const { data, isSuccess } = useGetProblemQuery({ problemId: probId });

  const [updatePost] = useUpdateProblemMutation({
    fixedCacheKey: 'createPost',
  });

  const handleSubmit = async (data: CreateProblemModel) => {
    console.log(data);
    const { id } = await updatePost({
      problemId: probId,
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
    remark: data?.remark || '',
    difficulty: data?.difficulty || 'easy',
    tags: data?.tags.map((tag) => ({ value: `${tag.id}`, label: tag.name })) || [],
    status: data?.status || 'unpublished',
    testCases: data?.exampleTestCases || [{ input: '', output: '' }],
  };

  if (!isSuccess) return null;
  return <CreateProblemLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
