'use client';
import { useAppSelector } from 'apps/client/app/store';
import { Button, Typography } from '@code-judge/core-design';
import { Action, Can, Subject } from 'apps/client/features/auth';
import { handleComingSoonAlert } from 'apps/client/utils/coming-soon-alert';
import Link from 'next/link';
import { UserAvatar } from '../user-avatar';

export function AppBar() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <header className="border-b bg-background">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/home" className="flex items-center gap-2">
          <Typography fontSize={'h4'} fontWeight={'bold'} className="text-foreground">
            CodeJudge
          </Typography>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.preventDefault();
              handleComingSoonAlert();
            }}
          >
            Contests
          </Link>
          <Link
            href="/problems"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Problems
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.preventDefault();
              handleComingSoonAlert();
            }}
          >
            Standings
          </Link>
          <Can I={Action.Create} a={Subject.Problem}>
            <Link
              href="/admin"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
          </Can>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <Link href={'/profile'}>
                <UserAvatar variant="circle" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/sign-in">
                <Button variant="ghost" isActive>
                  Log in
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button variant="primary" isActive>
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
