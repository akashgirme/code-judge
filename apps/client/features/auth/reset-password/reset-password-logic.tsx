import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordView } from './reset-password-view';
import { passwordValidations, confirmPasswordValidations } from '@code-judge/core-design';

const ResetPasswordSchema = z
  .object({
    ...passwordValidations,
    ...confirmPasswordValidations,
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type ResetPasswordModel = z.infer<typeof ResetPasswordSchema>;

interface ResetPasswordLogicProps {
  defaultValues: ResetPasswordModel;
  onSubmit: (data: ResetPasswordModel) => Promise<void>;
}

export const ResetPasswordLogic: React.FC<ResetPasswordLogicProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const form = useForm<ResetPasswordModel>({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues,
    resolver: zodResolver(ResetPasswordSchema),
  });

  const handleSubmit: SubmitHandler<ResetPasswordModel> = async (data) => {
    onSubmit(data);
  };

  return <ResetPasswordView form={form} onSubmit={handleSubmit} />;
};
