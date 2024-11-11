import { useWhoAmIQuery } from '@code-judge/api-hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useOnboardNavigation = () => {
  const { data, isFetching } = useWhoAmIQuery();
  const [isReady, setIsReady] = useState(false);

  console.log('data form onbaord hook: ', data);
  console.log('isready from hook: ', isReady);

  const router = useRouter();

  useEffect(() => {
    console.log('Effect triggered:', {
      data,
      isFetching,
      hasOnboarded: data?.hasOnboarded,
      isReady,
    });

    if (data && !isFetching) {
      if (data.hasOnboarded) {
        setIsReady(true);
      } else {
        router.push('/auth/onboard');
      }
    }
  }, [data, isFetching]);

  return { isReady };
};
