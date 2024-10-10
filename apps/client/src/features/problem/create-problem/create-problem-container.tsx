'use client';
import { useCreateProblemMutation } from '@code-judge/api-client';
import { useNavigate } from 'react-router-dom';
import { CreateProblemLogic, CreateProblemModel } from './create-problem-logic';
import { handleError } from '../../../utils';
import { toast } from 'sonner';
import { Check } from 'iconoir-react';

export const CreateProblemContainer = () => {
  const navigate = useNavigate();

  const [createProblem] = useCreateProblemMutation({
    fixedCacheKey: 'createProblem',
  });

  const handleSubmit = async (data: CreateProblemModel) => {
    console.log('handle submit triggered');
    try {
      const { id } = await createProblem({
        createProblemDto: {
          ...data,
          tagIds: data.tags.map((tag) => tag.value),
        },
      }).unwrap();
      toast.success(
        <div className="flex items-center">
          <Check className="mr-4" /> Problem created successfully
        </div>
      );
      setTimeout(() => {
        navigate(`/admin/problems/${id}/add-testcases`);
      }, 2000);
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
