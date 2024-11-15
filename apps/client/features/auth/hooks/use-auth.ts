import {
  SignedInUserResponseDto,
  User,
  logout,
  setCredentials,
  updateUser as updateUserInRedux,
  useLogoutMutation,
} from '@code-judge/api-hooks';
import { useAppDispatch, useAppSelector } from 'apps/client/app/store';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isAuthenticated, accessToken, user } = useAppSelector((state) => state.auth);

  const [onLogout] = useLogoutMutation();

  const handleLogin = (
    signedInUser: SignedInUserResponseDto,
    shouldAutoNavigate: boolean = true
  ) => {
    dispatch(setCredentials(signedInUser));
    if (shouldAutoNavigate) {
      router.push(!signedInUser.user.hasOnboarded ? '/auth/onboard' : '/home');
    }
  };

  const handleLogout = async () => {
    await onLogout().unwrap();
    dispatch(logout({}));
    router.push('/auth/sign-in');
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
