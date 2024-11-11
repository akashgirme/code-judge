import React from 'react';
import { useController } from 'react-hook-form';
import { Editor } from '@monaco-editor/react';
import { Languages } from '@code-judge/api-hooks';
import { modelKey } from './code-editor-config';

interface CodeEditorProps {
  language: string;
  defaultLanguage: Languages;
  height?: string;
}

//TODO: Issue with useController instead use `useFormContext`
export const CodeEditorField: React.FC<CodeEditorProps> = ({
  language,
  defaultLanguage = 'c',
  height = '78vh',
}) => {
  const {
    field: { value, onChange },
  } = useController({ name: modelKey });

  const getLanguageFullName = (language: string): string => {
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
    <Editor
      height={height}
      defaultLanguage={defaultLanguage}
      language={getLanguageFullName(language)}
      value={value}
      onChange={onChange}
    />
  );
};
