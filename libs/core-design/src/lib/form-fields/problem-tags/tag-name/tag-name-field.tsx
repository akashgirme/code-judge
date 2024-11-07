'use client';
import { useFormContext } from 'react-hook-form';
import { TextField } from '../../../atoms/text-field/text-field';
import { modelKey, questionConfig } from './tag-name-config';

export const TagNameField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      label={questionConfig.label}
      helperText={errors[modelKey]?.message?.toString()}
      hasError={!!errors[modelKey]}
      autoComplete="off"
      {...register(modelKey)}
    />
  );
};
