import {
  useInitiateSignInMutation,
  useSignInWithOtpMutation,
} from '@code-judge/api-client';

import { SignInWithOtpLogic, SignInWithOtpModel } from './sign-in-with-otp-logic';
import { useAuth } from '../hooks';
import { handleError, handleSuccess } from '../../../utils';
import { useLocation } from 'react-router-dom';

export const SignInWithOtpContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || '';

  const [signInWithOtp] = useSignInWithOtpMutation({
    fixedCacheKey: 'sign-in-with-otp',
  });

  const [requestSignInOtp] = useInitiateSignInMutation({
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
    requestSignInOtp({ initiateSignInDto: { email } })
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
    email: '',
    otp: '',
  };

  return (
    <SignInWithOtpLogic
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      handleRequestOtp={handleRequestOtp}
      email={email}
    />
  );
};
