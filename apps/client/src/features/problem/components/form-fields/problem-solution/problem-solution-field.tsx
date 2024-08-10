'use client';
import { useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './problem-solution-config';
import { TextAreaField } from '@code-judge/ui';

export const ProblemSolutionField = () => {
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
