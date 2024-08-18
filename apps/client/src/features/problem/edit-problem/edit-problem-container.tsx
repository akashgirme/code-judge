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
  const { problemId = ' ' } = useParams();
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
        topicIds: data.topics.map((topic) => topic.value),
      },
    }).unwrap();
    navigate(`/problems/${id}`);
  };

  const defaultValues: CreateProblemModel = {
    title: data?.title || '',
    internalNotes: data?.internalNotes || '',
    topics: data?.topics.map((topic) => ({ value: topic.id, label: topic.name })) || [],
    description: data?.description || '',
    difficulty: data?.difficulty || 'EASY',
    status: data?.status || 'unpublished',
    solution: data?.solution || '',
    solutionLanguage: data?.solutionLanguage || 'c',
    testCasesInput: data?.testCasesInput || '',
    testCasesOutput: data?.testCasesOutput || '',
  };

  if (!isSuccess) return null;
  return <CreateProblemLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
