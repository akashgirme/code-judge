import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUserView } from './create-user-view';
import {
  emailValidations,
  firstNameValidations,
  lastNameValidations,
  passwordValidations,
  confirmPasswordValidations,
} from '../../form-fields';
import { accountTypeValidations } from '../../form-fields/account-type-field';
import { agreeTermsValidations } from '../../form-fields/agree-terms-field';

const CreateUserSchema = z
  .object({
    ...accountTypeValidations,
    ...emailValidations,
    ...firstNameValidations,
    ...lastNameValidations,
    ...passwordValidations,
    ...confirmPasswordValidations,
    ...agreeTermsValidations,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type CreateUserModel = z.infer<typeof CreateUserSchema>;

interface CreateUserLogicProps {
  defaultValues: CreateUserModel;
  onSubmit: (data: CreateUserModel) => Promise<void>;
}

export const CreateUserLogic: React.FC<CreateUserLogicProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const form = useForm<CreateUserModel>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(CreateUserSchema),
  });

  const handleSubmit: SubmitHandler<CreateUserModel> = async (data) => {
    onSubmit(data);
  };

  return <CreateUserView form={form} onSubmit={handleSubmit} />;
};
