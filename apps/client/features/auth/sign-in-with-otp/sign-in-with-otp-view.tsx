import { FormProvider, UseFormReturn } from 'react-hook-form';
import { SignInWithOtpModel } from './sign-in-with-otp-logic';
import { Button, OtpField, CardContent } from '@code-judge/core-design';
import {
  useRequestSignInOtpMutation,
  useSignInWithOtpMutation,
} from '@code-judge/api-hooks';
import { PageHeader } from 'apps/client/components';
import { ResendOTPButton } from '../components';

interface SignInWithOtpViewProps {
  form: UseFormReturn<SignInWithOtpModel>;
  onSubmit: (data: SignInWithOtpModel) => void;
  handleRequestOtp: () => void;
}

export const SignInWithOtpView: React.FC<SignInWithOtpViewProps> = ({
  form,
  onSubmit,
  handleRequestOtp,
}) => {
  const [_signIn, { isLoading }] = useSignInWithOtpMutation({
    fixedCacheKey: 'sign-in-with-otp',
  });

  const [_requestSignInOtp, { isLoading: isResendLoading }] = useRequestSignInOtpMutation(
    {
      fixedCacheKey: 're-request-sign-in-otp',
    }
  );

  const {
    formState: { isValid },
  } = form;
  return (
    <div>
      <FormProvider {...form}>
        <PageHeader
          title="Verify"
          description="We've sent an 6-digit OTP to you email, please enter."
          prevRoute="/auth/request-sign-in-otp"
        />
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid py-6 ">
              <OtpField />
              <div className="flex flex-col py-6 gap-4 ">
                <Button
                  isActive={isValid}
                  variant="primary"
                  type="submit"
                  isLoading={isLoading}
                >
                  Continue
                </Button>
                <ResendOTPButton
                  {...{ isResendLoading, handleRequestOtp, OtpTimer: 30 }}
                />
              </div>
            </div>
          </form>
        </CardContent>
      </FormProvider>
    </div>
  );
};
