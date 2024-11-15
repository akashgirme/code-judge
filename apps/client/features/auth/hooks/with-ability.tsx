import { useRouter } from 'next/navigation';
import { useAuth } from './use-auth';
import { useEffect } from 'react';
import { Action, Subjects, ability } from '../ability/ability-factory';

export const withAbility = (
  Component: React.ComponentType,
  action: Action,
  subject: Subjects
) => {
  return function AuthenticatedComponent(props: {}) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (!isAuthenticated || !ability.can(action, subject)) {
        router.push('/auth/sign-in');
      }
    }, [isAuthenticated]);

    return isAuthenticated && ability.can(action, subject) ? (
      <Component {...props} />
    ) : null;
  };
};
