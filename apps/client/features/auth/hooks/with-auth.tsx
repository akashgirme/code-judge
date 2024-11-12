import { useRouter } from 'next/navigation';
import { useAuth } from './use-auth';
import { useEffect } from 'react';

export const withAuth = (Component: React.ComponentType) => {
  return function AuthenticatedComponent(props: {}) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/auth/sign-in');
      }
    }, [isAuthenticated]);

    return isAuthenticated ? <Component {...props} /> : null;
  };
};
