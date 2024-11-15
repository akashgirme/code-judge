'use client';
import { useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './confirm-password-config';
import { SecretField } from '../../atoms/secret-field/secret-field';

export const ConfirmPasswordField = () => {
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
      enableToggle={false}
    />
  );
};
