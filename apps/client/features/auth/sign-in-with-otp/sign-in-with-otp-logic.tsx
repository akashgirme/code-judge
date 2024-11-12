import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInWithOtpView } from './sign-in-with-otp-view';
import { otpValidations } from '@code-judge/core-design';

const SignInWithOtpSchema = z.object({
  ...otpValidations,
});

export type SignInWithOtpModel = z.infer<typeof SignInWithOtpSchema>;

interface SignInWithOtpLogicProps {
  defaultValues: SignInWithOtpModel;
  onSubmit: (data: SignInWithOtpModel) => Promise<void>;
  handleRequestOtp: () => void;
}

export const SignInWithOtpLogic: React.FC<SignInWithOtpLogicProps> = ({
  defaultValues,
  onSubmit,
  handleRequestOtp,
}) => {
  const form = useForm<SignInWithOtpModel>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(SignInWithOtpSchema),
  });

  const handleSubmit: SubmitHandler<SignInWithOtpModel> = async (data) => {
    onSubmit(data);
  };
  return (
    <SignInWithOtpView
      form={form}
      onSubmit={handleSubmit}
      handleRequestOtp={handleRequestOtp}
    />
  );
};
