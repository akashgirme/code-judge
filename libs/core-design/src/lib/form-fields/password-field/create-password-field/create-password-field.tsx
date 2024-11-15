'use client';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { modelKey, questionConfig } from '../password-config';
import { SecretField } from '../../../atoms';
import { extractErrorMessages } from '../../../utils';

const endAdornment = {
  default: undefined,
  success: <span className=" text-success text-sm font-semibold">STRONG</span>,
  error: <span className=" text-error text-sm font-semibold">WEAK</span>,
  warning: <span className=" text-warning text-sm font-semibold">MEDIUM</span>,
};

export const CreatePasswordField = () => {
  const {
    watch,
    register,
    formState: { errors, isSubmitted, touchedFields },
  } = useFormContext();
  const fieldError = errors[modelKey];
  const passwordValue = watch(modelKey);
  const fieldTouched = touchedFields[modelKey];

  const variant = useMemo(() => {
    // @ts-ignore
    const errorMessages = extractErrorMessages(fieldError?.types);
    if (passwordValue || isSubmitted || fieldTouched) {
      if (errorMessages.length === 0) return 'success';
      return errorMessages.length >= 3 ? 'error' : 'warning';
    }
    return 'default';
  }, [fieldError, passwordValue, isSubmitted, fieldTouched]);

  return (
    <SecretField
      label={questionConfig.label}
      helperText={fieldError?.message?.toString()}
      hasError={!!fieldError}
      variant={variant}
      forceVariant={true}
      endAdornment={passwordValue && endAdornment[variant]}
      {...register(modelKey)}
    />
  );
};
