import { Button } from '@skill-street-ui/core-design';
import { useAuth } from 'apps/home/features/auth';
import React from 'react';

export const Logout = () => {
  const { handleLogout } = useAuth();
  return (
    <div className="py-3 px-4 ">
      <Button onClick={handleLogout} variant={'destructive'} size={'lg'}>
        Logout
      </Button>
    </div>
  );
};
