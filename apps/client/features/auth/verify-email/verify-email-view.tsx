'use client';
import { Button, OtpField, CardContent } from '@code-judge/core-design';
import {
  useResendVerificationEmailMutation,
  useVerifyEmailMutation,
} from '@code-judge/api-hooks';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { VerifyEmailModel } from './verify-email-logic';
import { PageHeader } from 'apps/client/components';
import { ResendOTPButton } from '../components';

interface VerifyEmailViewProps {
  email: string;
  form: UseFormReturn<VerifyEmailModel>;
  onSubmit: (data: VerifyEmailModel) => void;
  handleRequestOtp: () => void;
}

export const VerifyEmailView: React.FC<VerifyEmailViewProps> = ({
  email,
  form,
  onSubmit,
  handleRequestOtp,
}) => {
  const [_verifyEmail, { isLoading }] = useVerifyEmailMutation({
    fixedCacheKey: 'verify-email',
  });

  const [_resendVerificationEmail, { isLoading: isResendLoading }] =
    useResendVerificationEmailMutation({
      fixedCacheKey: 'resend-verification-email',
    });

  const {
    formState: { isValid },
  } = form;

  return (
    <FormProvider {...form}>
      <PageHeader
        title="Verify yourself"
        description="We've sent an 6-digit OTP to you email, please enter."
        prevRoute="/auth/sign-up"
      />

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <OtpField />
            <Button
              isActive={isValid}
              type="submit"
              variant="primary"
              isLoading={isLoading}
            >
              Continue
            </Button>
            <ResendOTPButton {...{ isResendLoading, handleRequestOtp, OtpTimer: 30 }} />
          </div>
        </form>
      </CardContent>
    </FormProvider>
  );
};
