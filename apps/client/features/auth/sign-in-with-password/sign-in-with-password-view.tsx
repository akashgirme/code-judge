import { FormProvider, UseFormReturn } from 'react-hook-form';
import {
  Button,
  EmailField,
  LoginPasswordField,
  CardContent,
} from '@code-judge/core-design';
import { useSignInMutation } from '@code-judge/api-hooks';

import { SignInModel } from './sign-in-with-password-logic';
import { PageHeader } from 'apps/client/components';
import { CreateAccountButton, ForgotPassword, OR } from '../components';

interface SignInWithPasswordViewProps {
  form: UseFormReturn<SignInModel>;
  onSubmit: (data: SignInModel) => void;
}

export const SignInWithPasswordView: React.FC<SignInWithPasswordViewProps> = ({
  form,
  onSubmit,
}) => {
  const [_signIn, { isLoading }] = useSignInMutation({
    fixedCacheKey: 'sign-in',
  });

  const {
    formState: { isValid },
  } = form;

  return (
    <>
      <div>
        <FormProvider {...form}>
          <PageHeader prevRoute="/auth/sign-in" />
          <CardContent className="pb-0">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col py-6 gap-y-7 ">
                <div className="flex flex-col gap-2">
                  <EmailField />
                  <LoginPasswordField />
                </div>
                <div className="space-y-3 flex flex-col ">
                  <Button
                    isActive={isValid}
                    variant="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Continue
                  </Button>
                  <ForgotPassword />
                </div>
              </div>
              <OR />
              <div className="py-6">
                <CreateAccountButton />
              </div>
            </form>
          </CardContent>
        </FormProvider>
      </div>
    </>
  );
};
