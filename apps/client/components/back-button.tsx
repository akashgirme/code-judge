'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'iconoir-react';

import { Button } from '@code-judge/core-design';

export const BackButton = ({ prevRoute = '/auth/sign-in' }: { prevRoute?: string }) => {
  const router = useRouter();
  const goBack = () => router.push(prevRoute);
  return (
    <Button onClick={goBack} rounded={'full'} variant={'ghost'} className="h-14">
      <ArrowLeft className="w-6 h-6" />
    </Button>
  );
};
