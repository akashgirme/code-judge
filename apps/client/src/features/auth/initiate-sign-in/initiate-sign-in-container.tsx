import { useNavigate } from 'react-router-dom';
import { InitiateSignInLogic, InitiateSignInModel } from './initiate-sign-in-logic';
import { useInitiateSignInMutation } from '@code-judge/api-client';
import { handleError, handleSuccess } from '../../../utils';

export const InitiateSignInContainer = () => {
  const navigate = useNavigate();
  const [initiateSignIn] = useInitiateSignInMutation({
    fixedCacheKey: 'initiate-sign-in',
  });

  const handleSubmit = async (data: InitiateSignInModel) => {
    const submitData = {
      email: data.email,
    };
    initiateSignIn({ initiateSignInDto: submitData })
      .unwrap()
      .then((res) => {
        navigate(`/auth/sign-in-with-otp?email=${data.email}`);
        handleSuccess(res);
      })
      .catch(handleError);
  };

  const defaultValues = {
    email: '',
  };

  return <InitiateSignInLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
