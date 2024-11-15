import {
  useRequestSignInOtpMutation,
  useSignInWithOtpMutation,
} from '@code-judge/api-hooks';

import { SignInWithOtpLogic, SignInWithOtpModel } from './sign-in-with-otp-logic';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../hooks';
import { handleError, handleSuccess } from 'apps/client/utils';

export const SignInWithOtpContainer = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [signInWithOtp] = useSignInWithOtpMutation({
    fixedCacheKey: 'sign-in-with-otp',
  });

  const [requestSignInOtp] = useRequestSignInOtpMutation({
    fixedCacheKey: 're-request-sign-in-otp',
  });

  const { handleLogin } = useAuth();

  const handleSubmit = async (data: SignInWithOtpModel) => {
    signInWithOtp({
      signInWithOtpDto: { email, otp: data.otp },
    })
      .unwrap()
      .then((responseData) => {
        handleLogin(responseData);
      })
      .catch(handleError);
  };

  const handleRequestOtp = () => {
    requestSignInOtp({ requestSignInWithOtpDto: { email } })
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
    <SignInWithOtpLogic
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      handleRequestOtp={handleRequestOtp}
    />
  );
};
