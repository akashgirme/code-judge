'use client';
import { useEffect } from 'react';
import { PageHeader } from '../components';
import { Button } from '@code-judge/core-design';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex md:items-center justify-center relative">
      <div className="flex flex-col gap-7 text-center">
        <PageHeader
          title={
            <span className="max-md:font-semibold text-xl">
              404. Oops! Something went amiss.
            </span>
          }
          description="The link seems to be on a break. Apologies for any inconvenience."
          hideBackButton
        />
        <Button variant="link" onClick={() => router.back()} className="text-xl">
          Back to previous page
        </Button>
      </div>
    </div>
  );
}
