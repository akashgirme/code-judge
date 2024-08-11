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
          topicIds: data.topics.map((topic) => topic.value),
        },
      }).unwrap();
      navigate(`/problems/${id}`);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const defaultValues: CreateProblemModel = {
    title: '',
    internalNotes: '',
    topics: [],
    description: '',
    difficulty: 'EASY',
    solution: '',
    solutionLanguage: 'c',
    testCasesInput: '',
    testCasesOutput: '',
  };

  return <CreateProblemLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
