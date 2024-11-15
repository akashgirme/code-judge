'use client';
import { useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './agree-terms-config';
import { TextLinkButton } from '../../atoms';
import { Checkbox } from '../../atoms/checkbox';

interface AgreeTermsFieldProps {
  termsUrl: string;
  linkComponent: React.ElementType;
}

export const AgreeTermsField: React.FC<AgreeTermsFieldProps> = ({
  termsUrl,
  linkComponent,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Checkbox
      label={
        <>
          {questionConfig.label}
          &nbsp;
          <TextLinkButton
            typographyProps={{ variant: 'body2' }}
            component={linkComponent}
            href={termsUrl}
            target="_blank"
          >
            Terms & Conditions
          </TextLinkButton>
        </>
      }
      labelProps={{ variant: 'body2' }}
      helperText={errors[modelKey]?.message?.toString()}
      hasError={!!errors[modelKey]}
      {...register(modelKey)}
    />
  );
};
