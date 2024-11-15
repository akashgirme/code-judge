import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInWithPasswordView } from './sign-in-with-password-view';
import { emailValidations, passwordValidationsLoose } from '@code-judge/core-design';

const SignInSchema = z.object({
  ...emailValidations,
  ...passwordValidationsLoose,
});

export type SignInModel = z.infer<typeof SignInSchema>;

interface SignInWithPasswordLogicProps {
  defaultValues: SignInModel;
  onSubmit: (data: SignInModel) => Promise<void>;
}

export const SignInWithPasswordLogic: React.FC<SignInWithPasswordLogicProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const form = useForm<SignInModel>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(SignInSchema),
  });

  const handleSubmit: SubmitHandler<SignInModel> = async (data) => {
    onSubmit(data);
  };

  return <SignInWithPasswordView form={form} onSubmit={handleSubmit} />;
};
