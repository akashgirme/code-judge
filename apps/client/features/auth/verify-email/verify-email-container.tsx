import {
  useResendVerificationEmailMutation,
  useVerifyEmailMutation,
} from '@code-judge/api-hooks';
import { VerifyEmailLogic, VerifyEmailModel } from './verify-email-logic';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../hooks';
import { handleError, handleSuccess } from 'apps/client/utils';

export const VerifyEmailContainer = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const userId = parseInt(searchParams.get('userId') || '0');

  const { handleLogin } = useAuth();

  const [resendVerificationEmail] = useResendVerificationEmailMutation({
    fixedCacheKey: 'resend-verification-email',
  });

  const [verifyEmail] = useVerifyEmailMutation({
    fixedCacheKey: 'verify-email',
  });

  const handleSubmit = async (data: VerifyEmailModel) => {
    verifyEmail({
      verifyEmailDto: { userId, email, otp: data.otp },
    })
      .unwrap()
      .then((responseData) => {
        handleLogin(responseData, true);
      })
      .catch(handleError);
  };

  const handleRequestOtp = () => {
    resendVerificationEmail({
      resendVerificationEmailDto: { email, userId },
    })
      .then((res) => {
        if ('data' in res) {
          handleSuccess(res.data);
        } else {
          handleError(res.error as Error);
        }
      })
      .catch(handleError);
  };

  const defaultValues = {
    otp: '',
  };

  return (
    <VerifyEmailLogic
      email={email}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      handleRequestOtp={handleRequestOtp}
    />
  );
};
