import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardView } from './onboard-view';
import {
  passwordValidations,
  confirmPasswordValidations,
} from '@skill-street-ui/core-design';

const OnboardSchema = z
  .object({
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
      message:
        'Both password and confirm password are required if one is filled',
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

export type OnboardModel = z.infer<typeof OnboardSchema>;

interface OnboardLogicProps {
  defaultValues: OnboardModel;
  onSubmit: (data: OnboardModel) => Promise<void>;
}

export const OnboardLogic: React.FC<OnboardLogicProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const form = useForm<OnboardModel>({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues,
    resolver: zodResolver(OnboardSchema),
  });

  const handleSubmit: SubmitHandler<OnboardModel> = async (data) => {
    onSubmit(data);
  };

  return <OnboardView form={form} onSubmit={handleSubmit} />;
};
