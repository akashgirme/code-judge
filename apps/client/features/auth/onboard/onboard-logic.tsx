import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardView } from './onboard-view';

const OnboardSchema = z.object({
  firstName: z.string().min(1).max(15),
  lastName: z.string().min(1).max(15),
});

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
