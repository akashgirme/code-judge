import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifyEmailView } from './verify-email-view';
import { otpValidations } from '@code-judge/core-design';

const VerifyEmailSchema = z.object({
  ...otpValidations,
});

export type VerifyEmailModel = z.infer<typeof VerifyEmailSchema>;

interface VerifyEmailLogicProps {
  email: string;
  defaultValues: VerifyEmailModel;
  onSubmit: (data: VerifyEmailModel) => Promise<void>;
  handleRequestOtp: () => void;
}

export const VerifyEmailLogic: React.FC<VerifyEmailLogicProps> = ({
  email,
  defaultValues,
  onSubmit,
  handleRequestOtp,
}) => {
  const form = useForm<VerifyEmailModel>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(VerifyEmailSchema),
  });

  const handleSubmit: SubmitHandler<VerifyEmailModel> = async (data) => {
    onSubmit(data);
  };

  return (
    <VerifyEmailView
      email={email}
      form={form}
      onSubmit={handleSubmit}
      handleRequestOtp={handleRequestOtp}
    />
  );
};
