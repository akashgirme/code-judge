'use client';
import React from 'react';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import { CodeEditorField, SelectLanguageField } from '@code-judge/core-design';
import { CodeEditorPanelModel } from './code-editor-panel-logic';
import { useTheme } from 'next-themes';

interface CodeEditorPanelViewProps {
  form: UseFormReturn<CodeEditorPanelModel>;
}

export const CodeEditorPanelView: React.FC<CodeEditorPanelViewProps> = ({ form }) => {
  const { control } = form;

  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  return (
    <FormProvider {...form}>
      <form className="w-full h-full">
        <div>
          <div className="border-b p-4 flex items-center justify-between">
            <Controller
              name="language"
              control={control}
              render={({ field: { onChange, value } }) => <SelectLanguageField />}
            />
          </div>
          <div className="relative">
            <div>
              <Controller
                name="sourceCode"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CodeEditorField
                    language={value || 'c'}
                    defaultLanguage="c"
                    height="70vh"
                    theme={editorTheme}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CodeEditorPanelView;
