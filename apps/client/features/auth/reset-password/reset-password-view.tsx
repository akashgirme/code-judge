import { FormProvider, UseFormReturn } from 'react-hook-form';
import { ResetPasswordModel } from './reset-password-logic';
import {
  Button,
  CardContent,
  CreatePasswordField,
  ConfirmPasswordField,
} from '@code-judge/core-design';
import { PasswordErrors } from '../components';
import { useResetPasswordMutation } from '@code-judge/api-hooks';
import { PageHeader } from 'apps/client/components';

interface ResetPasswordViewProps {
  form: UseFormReturn<ResetPasswordModel>;
  onSubmit: (data: ResetPasswordModel) => void;
}

export const ResetPasswordView: React.FC<ResetPasswordViewProps> = ({
  form,
  onSubmit,
}) => {
  const [_resetPassword, { isLoading }] = useResetPasswordMutation({
    fixedCacheKey: 'reset-password',
  });

  const {
    formState: { isValid },
  } = form;

  return (
    <div>
      <FormProvider {...form}>
        <PageHeader
          title="Reset Password"
          description="Create a 8 character password to secure your Account."
          prevRoute="/auth/forgot-password"
        />
        <CardContent className="pb-0">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid py-6 gap-6">
              <div className="space-y-1">
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
            <div className="py-6">
              <PasswordErrors />
            </div>
          </form>
        </CardContent>
      </FormProvider>
    </div>
  );
};
