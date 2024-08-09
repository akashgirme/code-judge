import { useEffect } from 'react';
import { useSignInWithTokenMutation } from '@code-judge/api-client';
import { useAuth } from '../hooks';
import { useLocation } from 'react-router-dom';

export const SignInWithTokenContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token') || '';

  const [signInWithToken] = useSignInWithTokenMutation();
  const { handleLogin } = useAuth();

  useEffect(() => {
    if (token) {
      handleSignInWithToken();
    }
  });

  const handleSignInWithToken = async () => {
    if (!token) return;
    const responseData = await signInWithToken({
      verifyTokenDto: { verificationToken: token },
    }).unwrap();
    console.log({ responseData });
    handleLogin(responseData);
  };

  return null;
};
