'use client';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { Button } from '@code-judge/ui';
import { logout } from '@code-judge/api-client';
import { useAuth } from '../../features/auth';

export function AppBar() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { handleLogout } = useAuth();

  return (
    <header className="bg-gray-900 text-white px-4 md:px-6 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-lg font-bold">CodeJudge</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link to="#" className="hover:underline">
          Contests
        </Link>
        <Link to="/problems/create" className="hover:underline">
          Problems
        </Link>
        <Link to="#" className="hover:underline">
          Standings
        </Link>
      </nav>
      {isAuthenticated && user && (
        <div className="flex items-center gap-4">
          <Button onClick={handleLogout}>Logout ({user.firstName})</Button>
        </div>
      )}

      {!isAuthenticated && !user && (
        <div className="flex items-center gap-4">
          <Button>
            <Link to="/auth/initiate-sign-in">Sign in</Link>
          </Button>
        </div>
      )}

      {/* {isLoading && <div className="flex items-center gap-4"></div>} */}
    </header>
  );
}
