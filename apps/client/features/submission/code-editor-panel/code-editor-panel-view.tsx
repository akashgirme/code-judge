'use client';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import { CodeEditorField, SelectLanguageField } from '@code-judge/core-design';
import { CodeEditorPanelModel } from './code-editor-panel-logic';

interface CodeEditorPanelViewProps {
  form: UseFormReturn<CodeEditorPanelModel>;
}

export const CodeEditorPanelView: React.FC<CodeEditorPanelViewProps> = ({ form }) => {
  const { control } = form;
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
          <div>
            <Controller
              name="sourceCode"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CodeEditorField
                  language={value || 'c'} // Pass current language
                  defaultLanguage="c"
                  height="75vh"
                />
              )}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
