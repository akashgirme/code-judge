'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { modelKey } from './otp-config';
import { HelperText } from '../../atoms';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../ui';

export const OtpField = () => {
  const { control } = useFormContext();
  return (
    <Controller
      name={modelKey}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="h-20 flex flex-col gap-1 justify-between overflow-hidden p-1">
          <InputOTP
            maxLength={6}
            minLength={6}
            {...field}
            render={({ slots }) => (
              <InputOTPGroup className="w-full justify-between ">
                {slots.map((slot, idx) => (
                  <InputOTPSlot
                    key={idx}
                    className="border-body-tertiary"
                    {...slot}
                  />
                ))}
              </InputOTPGroup>
            )}
          />
          {!!error && (
            <HelperText severity={'error'}>{error.message}</HelperText>
          )}
        </div>
      )}
    />
  );
};
