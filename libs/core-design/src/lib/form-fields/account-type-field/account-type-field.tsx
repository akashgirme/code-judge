'use client';
import { useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './account-type-config';
import { Radio } from '../../atoms/radio';
import { HelperText, Typography } from '../../atoms';

export const AccountTypeField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorText = errors[modelKey]?.message?.toString();
  return (
    <div className="grid gap-3">
      <Typography className="text-left">{questionConfig.label}</Typography>
      <div className="grid grid-cols-2">
        {questionConfig.options.map((option) => (
          <Radio
            key={option.value}
            label={option.label}
            labelProps={{ variant: 'body2' }}
            {...register(modelKey)}
            value={option.value}
          />
        ))}
      </div>
      {errorText && <HelperText hasError={true}>{errorText}</HelperText>}
    </div>
  );
};
