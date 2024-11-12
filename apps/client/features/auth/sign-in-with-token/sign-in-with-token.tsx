import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSignInWithTokenMutation } from '@code-judge/api-hooks';
import { useAuth } from '../hooks';
import { useOnboard } from '../onboard';

export const SignInWithTokenContainer = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [signInWithToken] = useSignInWithTokenMutation();
  const { handleLogin } = useAuth();
  const { onOnboard } = useOnboard();
  useEffect(() => {
    if (token) {
      handleSignInWithToken();
    }
  }, [token]);

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
