import { useRouter, useSearchParams } from 'next/navigation';
import { ResetPasswordLogic, ResetPasswordModel } from './reset-password-logic';
import { useResetPasswordMutation } from '@code-judge/api-hooks';
import { handleError, handleSuccess } from 'apps/client/utils';

export const ResetPasswordContainer = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [resetPassword] = useResetPasswordMutation({
    fixedCacheKey: 'reset-password',
  });

  const router = useRouter();

  const handleSubmit = async (data: ResetPasswordModel) => {
    if (!token) return;
    const submitData = {
      password: data.password,
      verificationToken: token,
    };
    resetPassword({
      resetPasswordDto: submitData,
    })
      .then((res) => {
        if ('data' in res) {
          handleSuccess(res.data);
          router.push(`/auth/sign-in-with-password`);
        } else {
          handleError(res.error as Error);
        }
      })
      .catch(handleError);
  };

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  return <ResetPasswordLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
