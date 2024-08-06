import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from '@code-judge/ui';
import { useNavigate } from 'react-router-dom';
import { OR, SocialSignInButtons } from '../components';
// import { PageHeader } from 'apps/home/components';

export const SignInView = () => {
  const navigate = useNavigate();

  const handleContinueWithOtp = () => {
    navigate('/auth/request-sign-in-otp');
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        {/* <CardTitle className="text-2xl">Login</CardTitle> */}
        <CardDescription className="text-body-secondary h-5 text-center w-full">
          <Typography variant="h4">Login to start using online Judge</Typography>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <SocialSignInButtons />
        <OR />
        <div className="grid gap-2">
          <Input id="email" type="email" placeholder="name@email.com" />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full" onClick={handleContinueWithOtp}>
          Continue with email
        </Button>
      </CardFooter>
    </Card>
  );
};
