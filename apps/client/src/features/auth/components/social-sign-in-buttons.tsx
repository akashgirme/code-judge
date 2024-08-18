import { Button, Icon } from '@code-judge/ui';
import { GoogleIcon } from '../../../assets/icons';

export const SocialSignInButtons = () => {
  const onGoogleSignInClick = () => {
    // Redirect user to Google authentication page
    window.location.href = `${import.meta.env.VITE_API_SERVER_URL}/api/auth/google`;
  };

  return (
    <div className="grid gap-4">
      <Button variant="outline" onClick={onGoogleSignInClick}>
        {/* TODO: Remove this Icon component */}
        <Icon className="h-5 w-5 " icon={GoogleIcon} />
        Continue with Google
      </Button>
    </div>
  );
};
