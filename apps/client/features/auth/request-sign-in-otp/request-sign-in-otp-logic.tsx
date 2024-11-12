import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RequestSignInOtpView } from './request-sign-in-otp-view';
import { emailValidations } from '@code-judge/core-design';

const RequestSignInOtpSchema = z.object({
  ...emailValidations,
});

export type RequestSignInOtpModel = z.infer<typeof RequestSignInOtpSchema>;

interface RequestSignInOtpLogicProps {
  defaultValues: RequestSignInOtpModel;
  onSubmit: (data: RequestSignInOtpModel) => Promise<void>;
}

export const RequestSignInOtpLogic: React.FC<RequestSignInOtpLogicProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const form = useForm<RequestSignInOtpModel>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(RequestSignInOtpSchema),
  });

  const handleSubmit: SubmitHandler<RequestSignInOtpModel> = async (data) => {
    onSubmit(data);
  };

  return <RequestSignInOtpView form={form} onSubmit={handleSubmit} />;
};
