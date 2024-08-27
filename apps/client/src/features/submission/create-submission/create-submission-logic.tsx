'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useLocalStorage } from '../../hooks';
import { debounce } from '../../../utils';
import { languageSelectValidations } from '../components/langauge-select/language-select-config';
import { CreateSubmissionView } from './create-submission-view';

const CreateSubmissionSchema = z.object({
  ...languageSelectValidations,
  code: z.string(),
});

export type CreateSubmissionModel = z.infer<typeof CreateSubmissionSchema>;

interface CreateSubmissionLogicProps {
  defaultValues: CreateSubmissionModel;
  onSubmit: (data: CreateSubmissionModel) => Promise<void>;
  isLoading: boolean;
}

export const CreateSubmissionLogic: React.FC<CreateSubmissionLogicProps> = ({
  defaultValues,
  onSubmit,
  isLoading,
}) => {
  const { problemId: id } = useParams();
  const problemId = Number(id);
  const localStorageKey = `submission-${problemId}`;
  const [storedValue, setStoredValue, clearStoredValue] =
    useLocalStorage<CreateSubmissionModel>(localStorageKey, defaultValues);

  const form = useForm<CreateSubmissionModel>({
    mode: 'onSubmit',
    defaultValues: storedValue as CreateSubmissionModel,
    resolver: zodResolver(CreateSubmissionSchema),
  });

  const watch = form.watch;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetStoredValue = useCallback(
    debounce((values: CreateSubmissionModel) => {
      setStoredValue(values);
    }, 1000),
    []
  );

  useEffect(() => {
    const subscription = watch((values) => {
      debouncedSetStoredValue(values as CreateSubmissionModel);
    });

    return () => {
      subscription.unsubscribe();
      clearStoredValue();
    };
  }, [watch, clearStoredValue, setStoredValue, debouncedSetStoredValue]);

  const handleSubmit: SubmitHandler<CreateSubmissionModel> = async (data) => {
    await onSubmit(data);
    clearStoredValue();
  };

  return (
    <CreateSubmissionView form={form} onSubmit={handleSubmit} isLoading={isLoading} />
  );
};
