import { FormProvider, UseFormReturn } from 'react-hook-form';
import { SignInWithOtpModel } from './sign-in-with-otp-logic';
import { Button, CardContent, Input } from '@code-judge/ui';
import { PageHeader } from '../../../components';
import { ResendOTPButton } from '../components';
import {
  useInitiateSignInMutation,
  useSignInWithOtpMutation,
} from '@code-judge/api-client';

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

  const [_requestSignInOtp, { isLoading: isResendLoading }] = useInitiateSignInMutation({
    fixedCacheKey: 'resend-verification-email',
  });

  const {
    formState: { isValid },
    register,
    handleSubmit,
  } = form;

  return (
    <div>
      <FormProvider {...form}>
        <PageHeader
          title="Verify"
          description="We've sent an 6-digit OTP to you email, please enter."
          hideLogo={true}
          prevRoute="/auth/initiate-sign-in"
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid py-6 ">
              <Input placeholder="OTP" {...register('otp')} />
              <div className="flex flex-col py-6 gap-4 ">
                <Button
                  isActive={isValid}
                  variant="default"
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
