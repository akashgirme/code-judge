import { useNavigate } from 'react-router-dom';
import { useAuth } from './use-auth';
import { useEffect } from 'react';

export const withAuth = (Component: React.ComponentType) => {
  return function AuthenticatedComponent(props: {}) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/auth/initiate-sign-in');
      }
    }, [isAuthenticated]);

    return isAuthenticated ? <Component {...props} /> : null;
  };
};
