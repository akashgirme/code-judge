import { OnboardModel } from './onboard-logic';
import { useOnboardMutation } from '@code-judge/api-client';
import { handleError } from '../../../utils';
import { useNavigate } from 'react-router-dom';

export const useOnboard = () => {
  const navigate = useNavigate();
  const [onboard] = useOnboardMutation({ fixedCacheKey: 'onboard' });

  const onOnboard = async (data: OnboardModel) => {
    try {
      await onboard({
        onboardUserDto: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      }).unwrap();
      navigate('/');
    } catch (error) {
      handleError(error as Error);
    }
  };

  return { onOnboard };
};
