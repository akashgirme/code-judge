import { Button, CardContent } from '@code-judge/core-design';
import { Mail, ChatBubbleEmpty } from 'iconoir-react';
import { useRouter } from 'next/navigation';
import {
  CreateAccountButton,
  OR,
  PolicyDisclaimer,
  SocialSignInButtons,
} from '../components';
import { PageHeader } from 'apps/client/components';

export const SignInView = () => {
  const router = useRouter();

  const handleContinueWithPassword = () => {
    router.push('/auth/sign-in-with-password');
  };

  const handleContinueWithOtp = () => {
    router.push('/auth/request-sign-in-otp');
  };

  return (
    <>
      <div className="max-md:pt-16">
        <PageHeader
          title="Hello there!"
          description={
            <>
              I&apos;m CodeJudge, Here to help you master problem solving. <br />
              Let&apos;s continue to challenge after you Login.
            </>
          }
          hideBackButton
        />
        <CardContent className="pb-0">
          <div className="grid gap-4 py-6">
            <SocialSignInButtons />
            <Button variant="primary-outline" onClick={handleContinueWithPassword}>
              <Mail />
              Continue with Password
            </Button>
            <Button variant="primary-outline" onClick={handleContinueWithOtp}>
              <ChatBubbleEmpty />
              Continue with OTP
            </Button>
          </div>
          <OR />
          <div className="py-6 ">
            <CreateAccountButton />
          </div>
        </CardContent>
      </div>
      <PolicyDisclaimer />
    </>
  );
};
