'use client';
import { useAppSelector } from 'apps/client/app/store';
import { Button, Typography } from '@code-judge/core-design';
import { useAuth } from 'apps/client/features/auth';
import { Action, Can, Subject } from 'apps/client/features/auth';
import { handleComingSoonAlert } from 'apps/client/utils/coming-soon-alert';
import Link from 'next/link';

export function AppBar() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { handleLogout } = useAuth();

  return (
    <header className="bg-gray-900 text-white px-4 md:px-4 py-2 flex items-center justify-between">
      <Link href="/home" className="flex items-center gap-2">
        <Typography fontSize={'h4'} fontWeight={'bold'}>
          CodeJudge
        </Typography>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="#"
          className="hover:underline"
          onClick={(e) => {
            e.preventDefault();
            handleComingSoonAlert();
          }}
        >
          Contests
        </Link>
        <Link href="/problems" className="hover:underline">
          Problems
        </Link>
        <Link
          href="#"
          className="hover:underline"
          onClick={(e) => {
            e.preventDefault();
            handleComingSoonAlert();
          }}
        >
          Standings
        </Link>
        <Can I={Action.Manage} a={Subject.Problem}>
          <Link href="/admin/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </Can>
      </nav>
      {isAuthenticated && user ? (
        <div className="flex items-center gap-4">
          <Button onClick={handleLogout}>Logout ({user.firstName})</Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button>
            <Link href="/auth/sign-in">Sign in</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
