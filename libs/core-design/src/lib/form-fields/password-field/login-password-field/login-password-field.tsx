'use client';
import { useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from '../password-config';
import { SecretField } from '@code-judge/core-design';

export const LoginPasswordField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <SecretField
      label={questionConfig.label}
      helperText={errors[modelKey]?.message?.toString()}
      hasError={!!errors[modelKey]}
      {...register(modelKey)}
    />
  );
};
