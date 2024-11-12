import { TextLinkButton } from '@code-judge/core-design';
import Link from 'next/link';
export const ForgotPassword = () => (
  <TextLinkButton
    component={Link}
    href="/auth/forgot-password"
    typographyProps={{ variant: 'body2' }}
    className="ml-auto"
  >
    Forgot Password?
  </TextLinkButton>
);
