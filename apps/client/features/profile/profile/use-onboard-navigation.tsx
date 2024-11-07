import { useWhoAmIQuery } from '@skill-street-ui/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useOnboardNavigation = () => {
  const { data, isFetching } = useWhoAmIQuery();
  const [isReady, setIsReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (data && !isFetching) {
      if (data.user.hasOnboarded) {
        setIsReady(true);
      } else {
        router.push('/auth/onboard');
      }
    }
  }, [data, isFetching]);

  return { isReady };
};
