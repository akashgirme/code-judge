'use client';
import { Code2, Trophy, Users } from 'lucide-react';
import { Button } from '@code-judge/core-design';
import { useRouter } from 'next/navigation';
import { useAppSelector } from 'apps/client/app/store';

export function Hero() {
  const router = useRouter();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleViewProblemOnClick = () => {
    router.push('/problems');
  };

  const handleStartNowOnClick = () => {
    if (isAuthenticated) {
      router.push('/problems');
    } else {
      router.push('/auth/sign-in');
    }
  };

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

      <section className="relative">
        <div className="container px-4 py-16 md:px-6 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Master Your Code.
                  <span className="text-primary-active block">Shape Your Future.</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join CodeJudge to enhance your programming skills, compete in
                  challenges, and prove your expertise through real-world coding problems.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={handleStartNowOnClick}
                  isActive
                >
                  Start Coding Now →
                </Button>
                <Button
                  variant="primary-outline"
                  size="lg"
                  onClick={handleViewProblemOnClick}
                  isActive
                >
                  View Problems
                </Button>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl" />
              <div className="relative space-y-4 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
                    <Code2 className="h-6 w-6 text-primary-active" />
                    <div>
                      <h3 className="font-semibold">Practice</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        500+ Problems
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
                    <Trophy className="h-6 w-6 text-primary-active" />
                    <div>
                      <h3 className="font-semibold">Compete</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Weekly Contests
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
                  <Users className="h-6 w-6 text-primary-active" />
                  <div>
                    <h3 className="font-semibold">Community</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Join thousands of developers
                    </p>
                  </div>
                </div>
                <div className="relative mt-8">
                  <div className="rounded-lg border bg-card p-4 shadow-lg">
                    <pre className="text-sm text-primary-active">
                      <code>{`function solve(input) {
  // Your code here
  return solution;
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
