import { SignInWithPasswordLogic, SignInModel } from './sign-in-with-password-logic';
import { useSignInMutation } from '@code-judge/api-hooks';
import { useAuth } from '../hooks';
import { handleError } from 'apps/client/utils/handle-error';

export const SignInWithPasswordContainer = () => {
  const [signIn] = useSignInMutation({ fixedCacheKey: 'sign-in' });
  const { handleLogin } = useAuth();

  const handleSubmit = async (data: SignInModel) => {
    const submitData = {
      email: data.email,
      password: data.password,
    };

    signIn({
      signInUserDto: submitData,
    })
      .unwrap()
      .then(handleLogin)
      .catch(handleError);
  };

  const defaultValues = {
    email: '',
    password: '',
  };

  return (
    <SignInWithPasswordLogic defaultValues={defaultValues} onSubmit={handleSubmit} />
  );
};
