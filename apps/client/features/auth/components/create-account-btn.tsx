import { Button } from '@code-judge/core-design';
import { UserPlus } from 'iconoir-react';
import Link from 'next/link';

export const CreateAccountButton = () => {
  return (
    <Link href="/auth/sign-up">
      <Button className="w-full" variant="secondary">
        <UserPlus className="w-5 h-5" />
        Create an account
      </Button>
    </Link>
  );
};
