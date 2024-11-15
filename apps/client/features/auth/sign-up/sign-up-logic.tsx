import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpView } from './sign-up-view';
import {
  confirmPasswordValidations,
  emailValidations,
  passwordValidations,
  usernameValidations,
} from '@code-judge/core-design';

const SignUpSchema = z
  .object({
    ...usernameValidations,
    ...emailValidations,
    password: passwordValidations.password,
    confirmPassword: confirmPasswordValidations.confirmPassword,
  })
  .refine(
    (data) => {
      // If one of the fields is filled out, require the other
      if (data.password && !data.confirmPassword) {
        return false; // confirmPassword is required if password is filled
      }
      if (!data.password && data.confirmPassword) {
        return false; // password is required if confirmPassword is filled
      }
      return true; // Both empty or both filled is valid
    },
    {
      message: 'Both password and confirm password are required if one is filled',
      path: ['confirmPassword'], // Adjust the path as needed
    }
  )
  .refine(
    (data) => {
      // If both are filled, they must match
      return data.password === data.confirmPassword;
    },
    {
      message: 'Passwords must match',
      path: ['confirmPassword'], // Adjust the path as needed
    }
  );

export type SignUpModel = z.infer<typeof SignUpSchema>;

interface SignUpLogicProps {
  defaultValues: SignUpModel;
  onSubmit: (data: SignUpModel) => Promise<void>;
}

export const SignUpLogic: React.FC<SignUpLogicProps> = ({ defaultValues, onSubmit }) => {
  const form = useForm<SignUpModel>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(SignUpSchema),
  });

  const handleSubmit: SubmitHandler<SignUpModel> = async (data) => {
    onSubmit(data);
  };

  return <SignUpView form={form} onSubmit={handleSubmit} />;
};
