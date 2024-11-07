'use client';
import { Button } from '@code-judge/ui';
import { useTimer } from '../../hooks';
import { RefreshDouble } from 'iconoir-react';

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
  const { timer, isTimerActive, startTimer } = useTimer(OtpTimer || 10);
  return (
    <>
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          handleRequestOtp();
          startTimer();
        }}
        disabled={isTimerActive}
        isLoading={isResendLoading}
      >
        {isTimerActive ? (
          `You can request again in ${timer} seconds`
        ) : (
          <>
            <RefreshDouble className="size-5" /> Didn&apos;t receive an OTP ?
          </>
        )}
      </Button>
    </>
  );
};
