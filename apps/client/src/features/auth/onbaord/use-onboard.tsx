import { useRouter } from 'next/navigation';
import { OnboardModel } from './onboard-logic';
import {
  useOnboardMutation,
  useStartConversationMutation,
} from '@skill-street-ui/auth-client';
import { handleError } from 'apps/home/utils';
import { getUserCountry } from 'apps/home/utils/get-user-country';

export const useOnboard = () => {
  const router = useRouter();
  const [onboard] = useOnboardMutation({ fixedCacheKey: 'onboard' });
  const [startConversation] = useStartConversationMutation();

  const onOnboard = async (data: OnboardModel) => {
    try {
      const { country, region, timezone } = getUserCountry();

      await onboard({
        onboardDto: {
          ...data,
          country,
          region,
          timezone,
          password: data.password ? data.password : undefined,
        },
      }).unwrap();
      const { conversation } = await startConversation().unwrap();
      router.push(`/conversations/${conversation.id}`);
    } catch (error) {
      handleError(error as Error);
    }
  };

  return { onOnboard };
};
