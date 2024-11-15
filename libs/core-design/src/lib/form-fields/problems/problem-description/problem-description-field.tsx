'use client';
import { useController } from 'react-hook-form';
import { modelKey, questionConfig } from './problem-description-config';
import { Typography } from '../../../atoms';
import { MarkdownEditor } from '../../markdown';

export const ProblemDescriptionField = () => {
  const {
    field: { value, onChange },
  } = useController({ name: modelKey });

  const handleMarkdownChange = (newContent: string) => {
    onChange(newContent);
  };

  return (
    <div className="flex flex-col gap-3">
      <Typography>{questionConfig.label}</Typography>
      <MarkdownEditor
        initialValue={value || '# Problem Description\n\nDescribe your problem here...'}
        onChange={handleMarkdownChange}
      />
    </div>
  );
};
