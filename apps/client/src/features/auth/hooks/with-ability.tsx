import { useAuth } from './use-auth';
import { useEffect } from 'react';
import { Action, Subjects, ability } from '../ability/ability-factory';
import { useNavigate } from 'react-router-dom';

export const withAbility = (
  Component: React.ComponentType,
  action: Action,
  subject: Subjects
) => {
  return function AuthenticatedComponent(props: {}) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (!isAuthenticated || !ability.can(action, subject)) {
        navigate('/');
      }
    }, [isAuthenticated]);

    return isAuthenticated && ability.can(action, subject) ? (
      <Component {...props} />
    ) : null;
  };
};
