import { handleError } from 'apps/client/utils/handle-error';
import { ForgotPasswordLogic, ForgotPasswordModel } from './forgot-password-logic';
import { useForgotPasswordMutation } from '@code-judge/api-hooks';
import { handleSuccess } from 'apps/client/utils/handle-success';

export const ForgotPasswordContainer = () => {
  const [forgotPassword] = useForgotPasswordMutation({
    fixedCacheKey: 'forgot-password',
  });

  const handleSubmit = async (data: ForgotPasswordModel) => {
    const submitData = {
      email: data.email,
    };
    forgotPassword({ forgotPasswordDto: submitData })
      .unwrap()
      .then(handleSuccess)
      .catch(handleError);
  };

  const defaultValues = {
    email: '',
  };

  return <ForgotPasswordLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
