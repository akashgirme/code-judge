'use client';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/store';
import { Button } from '@code-judge/ui';
import { useAuth } from '../../features/auth';
import { Action, Can, Subject } from '../../features/auth/ability';
import { handleComingSoonAlert } from '../../utils/coming-soon-alert';

export function AppBar() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { handleLogout } = useAuth();

  return (
    <header className="bg-gray-900 text-white px-4 md:px-6 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-lg font-bold">CodeJudge</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link
          to="#"
          className="hover:underline"
          onClick={(e) => {
            e.preventDefault();
            handleComingSoonAlert();
          }}
        >
          Contests
        </Link>
        <Link to="/problems" className="hover:underline">
          Problems
        </Link>
        <Link
          to="#"
          className="hover:underline"
          onClick={(e) => {
            e.preventDefault();
            handleComingSoonAlert();
          }}
        >
          Standings
        </Link>
        <Can I={Action.Manage} a={Subject.Problem}>
          <Link to="/admin/dashboard" className="hover:underline">
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
            <Link to="/auth/initiate-sign-in">Sign in</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
