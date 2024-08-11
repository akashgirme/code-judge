import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInWithOtpView } from './sign-in-with-otp-view';

const SignInWithOtpSchema = z.object({
  otp: z.string().length(6, { message: 'Otp should be 6 characters' }),
});

export type SignInWithOtpModel = z.infer<typeof SignInWithOtpSchema>;

interface SignInWithOtpLogicProps {
  defaultValues: SignInWithOtpModel;
  onSubmit: (data: SignInWithOtpModel) => Promise<void>;
  handleRequestOtp: () => void;
  email: string;
}

export const SignInWithOtpLogic: React.FC<SignInWithOtpLogicProps> = ({
  defaultValues,
  onSubmit,
  handleRequestOtp,
  email,
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
      email={email}
    />
  );
};
