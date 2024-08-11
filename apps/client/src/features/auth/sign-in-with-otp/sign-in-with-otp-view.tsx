import { FormProvider, UseFormReturn } from 'react-hook-form';
import { SignInWithOtpModel } from './sign-in-with-otp-logic';
import { Button, Card, CardContent, CardHeader, Input } from '@code-judge/ui';
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
  email: string;
}

export const SignInWithOtpView: React.FC<SignInWithOtpViewProps> = ({
  form,
  onSubmit,
  handleRequestOtp,
  email,
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
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <FormProvider {...form}>
          <CardHeader>
            <PageHeader
              title="Verify"
              description={'Enter the code generated from the link sent to'}
              email={`${email}`}
              hideLogo={true}
              prevRoute="/auth/initiate-sign-in"
            />
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter verification code"
                  {...register('otp')}
                  className="w-full"
                />
                <Button
                  isActive={isValid}
                  variant="default"
                  type="submit"
                  isLoading={isLoading}
                  className="w-full"
                >
                  Continue
                </Button>
                <ResendOTPButton
                  {...{ isResendLoading, handleRequestOtp, OtpTimer: 30 }}
                />
              </div>
            </form>
          </CardContent>
        </FormProvider>
      </Card>
    </div>
  );
};
