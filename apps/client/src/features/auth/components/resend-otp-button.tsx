'use client';
import { Button } from '@code-judge/ui';
import { useTimer } from '../hooks';

interface ResendOTPButtonProps {
  OtpTimer: number;
  isResendLoading: boolean;
  handleRequestOtp: () => void;
}

export const ResendOTPButton = ({
  OtpTimer,
  handleRequestOtp,
  isResendLoading,
}: ResendOTPButtonProps) => {
  const { timer, isTimerActive, startTimer } = useTimer(OtpTimer || 30);
  return (
    <Button
      type="button"
      variant="link"
      onClick={() => {
        handleRequestOtp();
        startTimer();
      }}
      disabled={isTimerActive}
      isLoading={isResendLoading}
      className="w-full"
    >
      {isTimerActive ? (
        `You can request again in ${timer} seconds`
      ) : (
        // <>
        //   <RefreshDouble className="size-5" /> Didn&apos;t receive an OTP ?
        // </>
        <h1>Not seeing the email in your inbox? Try Sending Again</h1>
      )}
    </Button>
  );
};
