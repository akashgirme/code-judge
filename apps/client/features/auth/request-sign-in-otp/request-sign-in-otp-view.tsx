import { FormProvider, UseFormReturn } from 'react-hook-form';
import { RequestSignInOtpModel } from './request-sign-in-otp-logic';
import { Button, EmailField, CardContent } from '@code-judge/core-design';
import { useRequestSignInOtpMutation } from '@code-judge/api-hooks';
import { PageHeader } from 'apps/client/components';
import { CreateAccountButton, OR, PolicyDisclaimer } from '../components';

interface RequestSignInOtpViewProps {
  form: UseFormReturn<RequestSignInOtpModel>;
  onSubmit: (data: RequestSignInOtpModel) => void;
}

export const RequestSignInOtpView: React.FC<RequestSignInOtpViewProps> = ({
  form,
  onSubmit,
}) => {
  const [_signIn, { isLoading }] = useRequestSignInOtpMutation({
    fixedCacheKey: 'request-sign-in-otp',
  });
  const {
    formState: { isValid },
  } = form;
  return (
    <>
      <div>
        <FormProvider {...form}>
          <PageHeader prevRoute="/auth/sign-in" />
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <EmailField />
                <Button
                  isActive={isValid}
                  variant="primary"
                  type="submit"
                  isLoading={isLoading}
                >
                  Get OTP
                </Button>
                <OR />
                <CreateAccountButton />
              </div>
            </form>
          </CardContent>
        </FormProvider>
      </div>
      <PolicyDisclaimer />
    </>
  );
};
