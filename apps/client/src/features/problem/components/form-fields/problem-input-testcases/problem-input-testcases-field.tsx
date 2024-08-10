'use client';
import { useFormContext } from 'react-hook-form';
import { TextAreaField } from '@code-judge/ui';
import { questionConfig, modelKey } from './problem-input-testcases-config';

export const ProblemInputTestCasesField = () => {
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
