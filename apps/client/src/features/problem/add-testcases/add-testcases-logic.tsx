'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useLocalStorage } from '../../hooks';
import { debounce } from '../../../utils';
import { AddTestCasesView } from './add-testcases-view';
import {
  problemExpectedOutputValidations,
  problemInputTestCasesValidations,
} from '../components/form-fields';

const AddTestCasesSchema = z.object({
  ...problemInputTestCasesValidations,
  ...problemExpectedOutputValidations,
});

export type AddTestCasesModel = z.infer<typeof AddTestCasesSchema>;

interface AddTestCasesLogicProps {
  defaultValues: AddTestCasesModel;
  onSubmit: (data: AddTestCasesModel) => Promise<void>;
}

export const AddTestCasesLogic: React.FC<AddTestCasesLogicProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const { problemId } = useParams();
  const localStorageKey = `add-testcases-for-problem-${problemId}-form`;
  const [storedValue, setStoredValue, clearStoredValue] =
    useLocalStorage<AddTestCasesModel>(localStorageKey, defaultValues);

  const form = useForm<AddTestCasesModel>({
    mode: 'onSubmit',
    defaultValues: storedValue as AddTestCasesModel,
    resolver: zodResolver(AddTestCasesSchema),
  });

  const watch = form.watch;

  const debouncedSetStoredValue = useCallback(
    debounce((values: AddTestCasesModel) => {
      setStoredValue(values);
    }, 1000),
    []
  );

  useEffect(() => {
    const subscription = watch((values) => {
      debouncedSetStoredValue(values as AddTestCasesModel);
    });

    return () => {
      subscription.unsubscribe();
      clearStoredValue();
    };
  }, [watch, clearStoredValue, setStoredValue]);

  const handleSubmit: SubmitHandler<AddTestCasesModel> = async (data) => {
    await onSubmit(data);
    clearStoredValue();
  };

  return <AddTestCasesView form={form} onSubmit={handleSubmit} />;
};
