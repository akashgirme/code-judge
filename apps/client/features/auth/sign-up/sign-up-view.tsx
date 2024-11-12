import { FormProvider, UseFormReturn } from 'react-hook-form';
import { SignUpModel } from './sign-up-logic';
import {
  Button,
  EmailField,
  CardContent,
  FirstNameField,
  LastNameField,
  CreatePasswordField,
  ConfirmPasswordField,
  UsernameField,
} from '@code-judge/core-design';
import { OR, PasswordErrors, PolicyDisclaimer, SocialSignInButtons } from '../components';
import { useSignUpMutation } from '@code-judge/api-hooks';
import { PageHeader } from 'apps/client/components';

interface SignUpViewProps {
  form: UseFormReturn<SignUpModel>;
  onSubmit: (data: SignUpModel) => void;
}

export const SignUpView: React.FC<SignUpViewProps> = ({ form, onSubmit }) => {
  const [_signUp, { isLoading }] = useSignUpMutation({
    fixedCacheKey: 'sign-up',
  });

  const {
    formState: { isValid },
  } = form;

  return (
    <>
      <div>
        <FormProvider {...form}>
          <PageHeader
            title="Welcome! Join us."
            description="Sign up to access the Code Judge"
          />
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid py-6 space-y-7 ">
                <div>
                  <UsernameField />
                  <EmailField />
                  <CreatePasswordField />
                  <ConfirmPasswordField />
                </div>
                <Button
                  isActive={isValid}
                  variant="primary"
                  type="submit"
                  isLoading={isLoading}
                >
                  Continue
                </Button>
              </div>
              <OR />
              <div className="py-6">
                <SocialSignInButtons />
              </div>
              <div className="py-6">
                <PasswordErrors />
              </div>
            </form>
          </CardContent>
        </FormProvider>
      </div>
      <PolicyDisclaimer />
    </>
  );
};
