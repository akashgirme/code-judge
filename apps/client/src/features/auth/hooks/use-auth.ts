import { SignedInUserResponseDto, User, useLogoutMutation } from '@code-judge/api-client';
import {
  logout,
  setCredentials,
  updateUser as updateUserInRedux,
} from '@code-judge/api-client';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated, accessToken, user } = useAppSelector((state) => state.auth);

  const [onLogout] = useLogoutMutation();

  const handleLogin = (signedInUser: SignedInUserResponseDto) => {
    dispatch(setCredentials(signedInUser));

    const shouldGoToOnBoard = !signedInUser.user.hasOnboarded;

    navigate(shouldGoToOnBoard ? '/auth/onboard' : '/');
  };

  const handleLogout = async () => {
    await onLogout().unwrap();
    dispatch(logout());
    navigate('/auth/initiate-sign-in');
  };

  const updateUser = (newUser: User) => {
    dispatch(updateUserInRedux(newUser));
  };

  return {
    isAuthenticated,
    accessToken,
    user,
    handleLogin,
    handleLogout,
    updateUser,
  };
};
