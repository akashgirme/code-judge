import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Card } from '@code-judge/ui';
import { Editor } from '@monaco-editor/react';

interface CodeEditorProps {
  language: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ language }) => {
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
        defaultValue="// some comment"
        render={({ field }) => (
          <Editor
            height="78vh"
            defaultLanguage=""
            language={getLanguageFullName(language)}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </Card>
  );
};
