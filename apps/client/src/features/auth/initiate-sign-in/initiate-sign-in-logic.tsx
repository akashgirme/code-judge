import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InitiateSignInView } from './initiate-sign-in-view';

const InitiateSignInSchema = z.object({
  email: z.string().email().trim(),
});

export type InitiateSignInModel = z.infer<typeof InitiateSignInSchema>;

interface InitiateSignInLogicProps {
  defaultValues: InitiateSignInModel;
  onSubmit: (data: InitiateSignInModel) => Promise<void>;
}

export const InitiateSignInLogic: React.FC<InitiateSignInLogicProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const form = useForm<InitiateSignInModel>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(InitiateSignInSchema),
  });

  const handleSubmit: SubmitHandler<InitiateSignInModel> = async (data) => {
    onSubmit(data);
  };

  return <InitiateSignInView form={form} onSubmit={handleSubmit} />;
};
