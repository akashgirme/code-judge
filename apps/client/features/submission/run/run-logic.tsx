'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useLocalStorage } from 'apps/client/features/hooks';
import { debounce } from 'apps/client/utils';
import { selectLanguageValidations } from '@code-judge/core-design';
import { RunView } from './run-view';

const RunSchema = z.object({
  ...selectLanguageValidations,
  sourceCode: z.string(),
});

export type RunModel = z.infer<typeof RunSchema>;

interface RunLogicProps {
  defaultValues: RunModel;
  onSubmit: (data: RunModel) => Promise<void>;
  isLoading: boolean;
}

export const RunLogic: React.FC<RunLogicProps> = ({
  defaultValues,
  onSubmit,
  isLoading,
}) => {
  const { problemId: id } = useParams();
  const problemId = Number(id);
  const localStorageKey = `submission-${problemId}`;
  const [storedValue, setStoredValue, clearStoredValue] = useLocalStorage<RunModel>(
    localStorageKey,
    defaultValues
  );

  const form = useForm<RunModel>({
    mode: 'onSubmit',
    defaultValues: storedValue as RunModel,
    resolver: zodResolver(RunSchema),
  });

  const watch = form.watch;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetStoredValue = useCallback(
    debounce((values: RunModel) => {
      setStoredValue(values);
    }, 1000),
    []
  );

  useEffect(() => {
    const subscription = watch((values) => {
      debouncedSetStoredValue(values as RunModel);
    });

    return () => {
      subscription.unsubscribe();
      clearStoredValue();
    };
  }, [watch, clearStoredValue, setStoredValue, debouncedSetStoredValue]);

  const handleSubmit: SubmitHandler<RunModel> = async (data) => {
    await onSubmit(data);
    clearStoredValue();
  };

  return <RunView form={form} onSubmit={handleSubmit} isLoading={isLoading} />;
};
