'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeStatusView } from './change-status-view';
import { problemStatusValidations } from '../components/form-fields';

const changeStatusSchema = z.object({
  ...problemStatusValidations,
});

export type ChangeStatusModel = z.infer<typeof changeStatusSchema>;

interface changeStatusLogicProps {
  defaultValues: ChangeStatusModel;
  onSubmit: (data: ChangeStatusModel) => Promise<void>;
}

export const ChangeStatusLogic: React.FC<changeStatusLogicProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const form = useForm<ChangeStatusModel>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(changeStatusSchema),
  });

  const handleSubmit: SubmitHandler<ChangeStatusModel> = async (data) => {
    await onSubmit(data);
  };

  return <ChangeStatusView form={form} onSubmit={handleSubmit} />;
};
