'use client';
import { useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './problem-title-config';
import { Input, TextAreaField } from '@code-judge/ui';

export const ProblemTitleField = () => {
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
