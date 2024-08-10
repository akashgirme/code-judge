'use client';
import { useController, useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './problem-description-config';
import {
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextAreaField,
} from '@code-judge/ui';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

export const ProblemDescriptionField = () => {
  const {
    field: { value, onChange },
  } = useController({ name: modelKey });
  const [markdownInput, setMarkdownInput] = useState(value || '');

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleInputChange = (e) => {
    setMarkdownInput(e.target.value);
    onChange(e.target.value);
  };
  return (
    <Tabs defaultValue="editor" className="w-full">
      <TabsList className="grid w-[400px] grid-cols-2">
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="editor">
        <TextAreaField
          label={questionConfig.label}
          helperText={errors[modelKey]?.message?.toString()}
          hasError={!!errors[modelKey]}
          autoComplete="off"
          {...register(modelKey)}
          onChange={handleInputChange}
          value={markdownInput}
        />
      </TabsContent>
      <TabsContent value="preview">
        <Card>
          <CardContent>
            <ReactMarkdown children={markdownInput} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
