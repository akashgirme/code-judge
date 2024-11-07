import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTagView } from './create-tag-view';
import { tagNameValidations } from '@code-judge/core-design';

const CreateTagSchema = z.object({
  ...tagNameValidations,
});

export type CreateTagModel = z.infer<typeof CreateTagSchema>;

interface CreateTagLogicProps {
  defaultValues: CreateTagModel;
  onSubmit: (data: CreateTagModel) => Promise<void>;
}

export const CreateTagLogic: React.FC<CreateTagLogicProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const form = useForm<CreateTagModel>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(CreateTagSchema),
  });

  const handleSubmit: SubmitHandler<CreateTagModel> = async (data) => {
    onSubmit(data);
  };

  return <CreateTagView form={form} onSubmit={handleSubmit} />;
};
