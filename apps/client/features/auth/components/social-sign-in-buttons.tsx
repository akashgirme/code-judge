import { Button, Icon } from '@code-judge/core-design';
import { useRouter } from 'next/navigation';
import { GoogleIcon } from '@code-judge/core-design';

export const SocialSignInButtons = () => {
  const router = useRouter();

  const onGoogleSignInClick = () => {
    router.push(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/api/auth/google`);
  };

  const onAppleSignInClick = () => {
    router.push(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/api/auth/apple`);
  };

  return (
    <div className="grid gap-4">
      <Button variant="google-btn" onClick={onGoogleSignInClick}>
        {/* TODO: Remove this Icon component */}
        <Icon className="h-5 w-5 " icon={GoogleIcon} />
        Continue with Google
      </Button>
      {/* <Button variant="apple-btn" onClick={onAppleSignInClick}>
        <Icon className="h-5 w-5 mx-2 mb-1 " icon={AppleIcon} />
        Continue with Apple
      </Button> */}
    </div>
  );
};
