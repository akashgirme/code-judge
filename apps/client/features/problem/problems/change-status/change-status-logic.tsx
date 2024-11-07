'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeProblemStatusView } from './change-status-view';
import {
  problemRemarksValidations,
  problemStatusValidations,
} from '@code-judge/core-design';

const changeProblemStatusSchema = z.object({
  ...problemRemarksValidations,
  ...problemStatusValidations,
});

export type ChangeProblemStatusModel = z.infer<typeof changeProblemStatusSchema>;

interface changeProblemStatusLogicProps {
  defaultValues: ChangeProblemStatusModel;
  onSubmit: (data: ChangeProblemStatusModel) => Promise<void>;
}

export const ChangeStatusLogic: React.FC<changeProblemStatusLogicProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const form = useForm<ChangeProblemStatusModel>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(changeProblemStatusSchema),
  });

  const handleSubmit: SubmitHandler<ChangeProblemStatusModel> = async (data) => {
    await onSubmit(data);
  };

  return <ChangeProblemStatusView form={form} onSubmit={handleSubmit} />;
};
