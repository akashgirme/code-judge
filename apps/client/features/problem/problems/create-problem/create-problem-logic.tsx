'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProblemView } from './create-problem-view';
import {
  problemActualTestCasesValidations,
  problemDescriptionValidations,
  problemDifficultyValidations,
  problemExampleTestCasesValidations,
  problemInternalNotesValidations,
  problemStatusValidations,
  problemTagsValidations,
  problemTitleValidations,
} from '@code-judge/core-design';
import { useLocalStorage } from 'apps/client/features/hooks/use-local-storage';
import { useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { debounce } from 'apps/client/utils';

const CreateProblemSchema = z.object({
  ...problemTitleValidations,
  ...problemDifficultyValidations,
  ...problemInternalNotesValidations,
  ...problemDescriptionValidations,
  ...problemTagsValidations,
  ...problemStatusValidations,
  ...problemExampleTestCasesValidations,
  ...problemActualTestCasesValidations,
});

export type CreateProblemModel = z.infer<typeof CreateProblemSchema>;

interface CreateProblemLogicProps {
  defaultValues: CreateProblemModel;
  onSubmit: (data: CreateProblemModel) => Promise<void>;
}

export const CreateProblemLogic: React.FC<CreateProblemLogicProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const { problemId } = useParams();
  const localStorageKey = problemId
    ? `editing-problem-${problemId}-form`
    : 'creating-problem-form';
  const [storedValue, setStoredValue, clearStoredValue] =
    useLocalStorage<CreateProblemModel>(localStorageKey, defaultValues);

  const form = useForm<CreateProblemModel>({
    mode: 'onSubmit',
    defaultValues: storedValue as CreateProblemModel,
    resolver: zodResolver(CreateProblemSchema),
  });

  const watch = form.watch;

  const debouncedSetStoredValue = useCallback(
    debounce((values: CreateProblemModel) => {
      setStoredValue(values);
    }, 1000),
    []
  );

  useEffect(() => {
    const subscription = watch((values) => {
      debouncedSetStoredValue(values as CreateProblemModel);
    });

    return () => {
      subscription.unsubscribe();
      clearStoredValue();
    };
  }, [watch, clearStoredValue, setStoredValue]);

  const handleSubmit: SubmitHandler<CreateProblemModel> = async (data) => {
    await onSubmit(data);
    clearStoredValue();
  };

  return <CreateProblemView form={form} onSubmit={handleSubmit} />;
};
