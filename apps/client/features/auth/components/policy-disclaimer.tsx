import { TextLinkButton, Typography } from '@code-judge/core-design';
import Link from 'next/link';

export const PolicyDisclaimer = () => {
  return (
    <div className="flex-1 flex items-end pb-4 md:pb-20">
      <Typography
        fontFamily={'roboto'}
        fontSize={'caption'}
        className="text-left px-4 text-body-tertiary bg-background"
      >
        By clicking “Continue” or third party authentication, you agree to{' '}
        <TextLinkButton
          component={Link}
          href="/terms-conditions"
          target="_blank"
          className="text-xs"
        >
          Terms and Conditions
        </TextLinkButton>{' '}
        and{' '}
        <TextLinkButton
          component={Link}
          href="/privacy-policy"
          target="_blank"
          className="text-xs"
        >
          Privacy Policy
        </TextLinkButton>{' '}
        of CodeJudge.
      </Typography>
    </div>
  );
};
