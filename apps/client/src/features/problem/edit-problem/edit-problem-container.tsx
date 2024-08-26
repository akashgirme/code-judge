import {
  useGetProblemForAdminQuery,
  useUpdateProblemMutation,
} from '@code-judge/api-client';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CreateProblemLogic,
  CreateProblemModel,
} from '../create-problem/create-problem-logic';

export const EditProblemContainer = () => {
  const navigate = useNavigate();
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
        tagIds: data.tags.map((topic) => topic.value),
      },
    }).unwrap();
    navigate(`/admin/problems/${id}/add-testcases`);
  };

  const defaultValues: CreateProblemModel = {
    title: data?.title || '',
    tags: data?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    description: data?.description || '',
    difficulty: data?.difficulty || 'Easy',
  };

  if (!isSuccess) return null;
  return <CreateProblemLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
