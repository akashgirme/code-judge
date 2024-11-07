import { Button } from '@code-judge/core-design';
import { Logo } from '../logo';
import { useRouter } from 'next/navigation';
import { useAppSelector } from 'apps/client/app/store';
import { useAuth } from 'apps/client/features/auth/hooks/use-auth';

export const Header = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { handleLogout } = useAuth();
  const handleSignInClick = () => {
    router.push('/auth/sign-in');
  };

  return (
    <div className="px-8 py-4 flex justify-between items-center">
      <Logo />
      {isAuthenticated ? (
        <Button onClick={handleLogout}>Sign Out</Button>
      ) : (
        <Button onClick={handleSignInClick}>Sign In</Button>
      )}
    </div>
  );
};
