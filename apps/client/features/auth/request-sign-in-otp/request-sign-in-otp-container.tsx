import { useRequestSignInOtpMutation } from '@code-judge/api-hooks';

import {
  RequestSignInOtpLogic,
  RequestSignInOtpModel,
} from './request-sign-in-otp-logic';
import { useRouter } from 'next/navigation';
import { handleSuccess, handleError } from 'apps/client/utils';

export const RequestSignInOtpContainer = () => {
  const router = useRouter();
  const [requestSignInOtp] = useRequestSignInOtpMutation({
    fixedCacheKey: 'request-sign-in-otp',
  });

  const handleSubmit = async (data: RequestSignInOtpModel) => {
    const submitData = {
      email: data.email,
    };
    requestSignInOtp({ requestSignInWithOtpDto: submitData })
      .unwrap()
      .then((res) => {
        router.push(`/auth/sign-in-with-otp?email=${data.email}`);
        handleSuccess(res);
      })
      .catch(handleError);
  };

  const defaultValues = {
    email: '',
  };

  return <RequestSignInOtpLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
