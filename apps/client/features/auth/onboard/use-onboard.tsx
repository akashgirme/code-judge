import { useRouter } from 'next/navigation';
import { OnboardModel } from './onboard-logic';
import { useOnboardMutation } from '@code-judge/api-hooks';
import { handleError } from 'apps/client/utils';

export const useOnboard = () => {
  const router = useRouter();
  const [onboard] = useOnboardMutation({ fixedCacheKey: 'onboard' });

  const onOnboard = async (data: OnboardModel) => {
    try {
      await onboard({
        onboardUserDto: {
          ...data,
        },
      }).unwrap();
      router.push('/home');
    } catch (error) {
      handleError(error as Error);
    }
  };

  return { onOnboard };
};
