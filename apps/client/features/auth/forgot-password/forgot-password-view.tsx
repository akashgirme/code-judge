import { FormProvider, UseFormReturn } from 'react-hook-form';
import { ForgotPasswordModel } from './forgot-password-logic';
import { Button, EmailField, CardContent } from '@code-judge/core-design';
import { useForgotPasswordMutation } from '@code-judge/api-hooks';
import { PageHeader } from 'apps/client/components';
import { PolicyDisclaimer } from '../components';

interface ForgotPasswordViewProps {
  form: UseFormReturn<ForgotPasswordModel>;
  onSubmit: (data: ForgotPasswordModel) => void;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({
  form,
  onSubmit,
}) => {
  const [_forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation({
    fixedCacheKey: 'forgot-password',
  });

  const {
    formState: { isValid },
  } = form;

  return (
    <>
      <div>
        <FormProvider {...form}>
          <PageHeader
            title="Forgot Password"
            description={
              <>
                We will send you an link on your Email to <br /> Reset Password.
              </>
            }
            prevRoute="/auth/sign-in-with-password"
          />
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-6 ">
                <EmailField />
                <Button
                  isActive={isValid}
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                >
                  Continue
                </Button>
                {isSuccess && (
                  <Button variant="secondary" type="submit">
                    Resend
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </FormProvider>
      </div>
      <PolicyDisclaimer />
    </>
  );
};
