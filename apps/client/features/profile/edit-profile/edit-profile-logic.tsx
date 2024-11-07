import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditProfileView } from './edit-profile-view';
import {
  firstNameValidations,
  lastNameValidations,
} from '@skill-street-ui/core-design';
import { imageUploadValidations } from 'apps/home/components/image-uploader';

const EditProfileSchema = z.object({
  ...firstNameValidations,
  ...lastNameValidations,
  ...imageUploadValidations,
});

export type EditProfileModel = z.infer<typeof EditProfileSchema>;

interface EditProfileLogicProps {
  defaultValues: EditProfileModel;
  onSubmit: (data: EditProfileModel) => Promise<void>;
}

export const EditProfileLogic: React.FC<EditProfileLogicProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const form = useForm<EditProfileModel>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(EditProfileSchema),
  });

  const handleSubmit: SubmitHandler<EditProfileModel> = async (data) => {
    onSubmit(data);
  };

  return <EditProfileView form={form} onSubmit={handleSubmit} />;
};
