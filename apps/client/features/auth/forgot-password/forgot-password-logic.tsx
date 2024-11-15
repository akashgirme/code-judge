import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordView } from './forgot-password-view';
import { emailValidations } from '@code-judge/core-design';

const ForgotPasswordSchema = z.object({
  ...emailValidations,
});

export type ForgotPasswordModel = z.infer<typeof ForgotPasswordSchema>;

interface ForgotPasswordLogicProps {
  defaultValues: ForgotPasswordModel;
  onSubmit: (data: ForgotPasswordModel) => Promise<void>;
}

export const ForgotPasswordLogic: React.FC<ForgotPasswordLogicProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const form = useForm<ForgotPasswordModel>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const handleSubmit: SubmitHandler<ForgotPasswordModel> = async (data) => {
    onSubmit(data);
  };

  return <ForgotPasswordView form={form} onSubmit={handleSubmit} />;
};
