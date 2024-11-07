import React, { CSSProperties } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Card } from '@code-judge/core-design';
import { Editor } from '@monaco-editor/react';
import { Languages } from '@code-judge/api-hooks';

interface CodeEditorProps {
  language: string;
  defaultValue: string;
  defaultLanguage: Languages;
  height: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  defaultValue = '',
  defaultLanguage = 'c',
  height = '78vh',
}) => {
  const { control } = useFormContext();

  const getLanguageFullName = (lang: string): string => {
    const languageMap: { [key: string]: string } = {
      c: 'c',
      cpp: 'cpp',
      js: 'javascript',
      java: 'java',
      go: 'go',
    };
    return languageMap[lang] || '';
  };

  return (
    <Card>
      <Controller
        name="code"
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Editor
            height={height}
            defaultLanguage={defaultLanguage}
            language={getLanguageFullName(language)}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </Card>
  );
};
