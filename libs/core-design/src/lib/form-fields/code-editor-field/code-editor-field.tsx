import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Editor } from '@monaco-editor/react';
import { Language, Languages } from '@code-judge/api-hooks';
import { modelKey } from './code-editor-config';

interface CodeEditorProps {
  language: Language;
  defaultLanguage: Languages;
  height: string;
  theme: 'vs-dark' | 'light';
}

export const CodeEditorField: React.FC<CodeEditorProps> = ({
  language,
  defaultLanguage = 'c',
  height,
  theme,
}) => {
  const { control } = useFormContext();

  const getLanguageFullName = (language: Language): string => {
    const languageMap: { [key: string]: string } = {
      c: 'c',
      cpp: 'cpp',
      js: 'javascript',
      java: 'java',
      go: 'go',
    };
    return languageMap[language] || 'c';
  };

  return (
    <Controller
      name={modelKey}
      control={control}
      render={({ field }) => (
        <Editor
          height={height}
          defaultLanguage={defaultLanguage}
          language={getLanguageFullName(language)}
          theme={theme}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    ></Controller>
  );
};
