'use client';
import { useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './problem-internal-notes-config';
import { TextAreaField } from '../../../atoms';

export const ProblemInternalNotesField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextAreaField
      label={questionConfig.label}
      helperText={errors[modelKey]?.message?.toString()}
      hasError={!!errors[modelKey]}
      autoComplete="off"
      {...register(modelKey)}
    />
  );
};
