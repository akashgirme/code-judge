import { handleError, handleSuccess } from '../../../utils';
import { OnboardLogic, OnboardModel } from './onboard-logic';
import { useOnboard } from './use-onboard';
import { useOnboardMutation } from '@code-judge/api-client';
import { useNavigate } from 'react-router-dom';

export const OnboardContainer = () => {
  const navigate = useNavigate();

  const [onboard] = useOnboardMutation({
    fixedCacheKey: 'onboard',
  });

  const handleSubmit = async (data: OnboardModel) => {
    // await onOnboard(data);
    const onboardData = {
      firstName: data.firstName,
      lastName: data.lastName,
    };

    onboard({ onboardUserDto: onboardData })
      .unwrap()
      .then((res) => {
        navigate('/');
        handleSuccess(res);
      })
      .catch(handleError);
  };

  const defaultValues = {
    firstName: '',
    lastName: '',
  };

  return <OnboardLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
