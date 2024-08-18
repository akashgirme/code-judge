'use client';
import { useCreateProblemMutation } from '@code-judge/api-client';
import { useNavigate } from 'react-router-dom';
import { CreateProblemLogic, CreateProblemModel } from './create-problem-logic';
import { handleError } from '../../../utils';

export const CreateProblemContainer = () => {
  const navigate = useNavigate();

  const [createProblem] = useCreateProblemMutation({
    fixedCacheKey: 'createProblem',
  });

  const handleSubmit = async (data: CreateProblemModel) => {
    try {
      const { id } = await createProblem({
        createProblemDto: {
          ...data,
          tagIds: data.tags.map((tag) => tag.value),
        },
      }).unwrap();
      navigate(`/problems/${id}`);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const defaultValues: CreateProblemModel = {
    title: '',
    tags: [],
    description: '',
    difficulty: 'Easy',
  };

  return <CreateProblemLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
