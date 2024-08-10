'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { CreateProblemView } from './create-problem-view';
import { useLocalStorage } from '../../hooks';
import { debounce } from '../../../utils';
import {
  problemTitleValidations,
  problemInternalNotesValidations,
  problemTopicsValidations,
  problemDescriptionValidations,
  problemSolutionLangaugeValidations,
  problemSolutionValidations,
  problemInputTestCasesValidations,
  problemExpectedOutputValidations,
  problemDifficultyValidations,
} from '../components/form-fields';

const CreateProblemSchema = z.object({
  ...problemTitleValidations,
  ...problemDifficultyValidations,
  ...problemTopicsValidations,
  ...problemDescriptionValidations,
  ...problemSolutionLangaugeValidations,
  ...problemSolutionValidations,
  ...problemInputTestCasesValidations,
  ...problemExpectedOutputValidations,
  ...problemInternalNotesValidations,
});

export type CreateProblemModel = z.infer<typeof CreateProblemSchema>;

interface CreatePostLogicProps {
  defaultValues: CreateProblemModel;
  onSubmit: (data: CreateProblemModel) => Promise<void>;
}

export const CreateProblemLogic: React.FC<CreatePostLogicProps> = ({
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
    // if (!data[imageUploadModalKey].publicId) {
    //   toast.error('A cover image is compulsory!');
    // } else {
    await onSubmit(data);
    clearStoredValue();
    // }
  };

  return <CreateProblemView form={form} onSubmit={handleSubmit} />;
};
