import { useRouter } from 'next/navigation';
import { SignUpLogic, SignUpModel } from './sign-up-logic';
import { useSignUpMutation } from '@code-judge/api-hooks';
import { handleError, handleSuccess } from 'apps/client/utils';

export const SignUpContainer = () => {
  const router = useRouter();
  const [signUp] = useSignUpMutation({ fixedCacheKey: 'sign-up' });

  // * In case of wrong Email ??
  const handleSubmit = async (data: SignUpModel) => {
    const submitData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    signUp({ signUpUserDto: submitData })
      .unwrap()
      .then((res) => {
        handleSuccess(res);
        const { userId } = res;
        router.push(`/auth/verify-email?email=${res.email}&userId=${userId}`);
      })
      .catch(handleError);
  };

  const defaultValues: SignUpModel = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  return <SignUpLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
