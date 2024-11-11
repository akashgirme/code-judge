'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useLocalStorage } from 'apps/client/features/hooks';
import { debounce } from 'apps/client/utils';
import {
  codeEditorValidations,
  selectLanguageValidations,
} from '@code-judge/core-design';
import { CodeEditorPanelView } from './code-editor-panel-view';
import { useAppDispatch, useAppSelector } from 'apps/client/app/store';
import { setLanguage, setSourceCode } from '../services';

const CodeEditorPanelSchema = z.object({
  ...selectLanguageValidations,
  ...codeEditorValidations,
});

export type CodeEditorPanelModel = z.infer<typeof CodeEditorPanelSchema>;

interface CodeEditorPanelLogicProps {
  defaultValues: CodeEditorPanelModel;
}

export const CodeEditorPanelLogic: React.FC<CodeEditorPanelLogicProps> = ({
  defaultValues,
}) => {
  const dispatch = useAppDispatch();

  const { problemId: id } = useParams();
  const problemId = Number(id);
  const localStorageKey = `submission-${problemId}`;
  const [storedValue, setStoredValue, clearStoredValue] =
    useLocalStorage<CodeEditorPanelModel>(localStorageKey, defaultValues);

  const form = useForm<CodeEditorPanelModel>({
    mode: 'onChange',
    defaultValues: storedValue as CodeEditorPanelModel,
    resolver: zodResolver(CodeEditorPanelSchema),
  });

  const watch = form.watch;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetStoredValue = useCallback(
    debounce((values: CodeEditorPanelModel) => {
      setStoredValue(values);
    }, 1000),
    []
  );

  useEffect(() => {
    const subscription = watch((values) => {
      // Update Redux store immediately on field change
      dispatch(setSourceCode(values.sourceCode ?? ''));
      dispatch(setLanguage(values.language ?? 'c'));

      debouncedSetStoredValue(values as CodeEditorPanelModel);
    });

    return () => {
      subscription.unsubscribe();
      clearStoredValue();
    };
  }, [watch, clearStoredValue, setStoredValue, debouncedSetStoredValue]);

  return <CodeEditorPanelView form={form} />;
};
