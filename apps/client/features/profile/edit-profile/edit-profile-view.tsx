import { FormProvider, UseFormReturn } from 'react-hook-form';
import { EditProfileModel } from './edit-profile-logic';
import {
  Button,
  FirstNameField,
  LastNameField,
} from '@skill-street-ui/core-design';
import { useEditProfileMutation } from '@skill-street-ui/auth-client';
import { ProfileTopbar } from '../components';
import { ProfileImg } from './components';

interface EditProfileViewProps {
  form: UseFormReturn<EditProfileModel>;
  onSubmit: (data: EditProfileModel) => void;
}

export const EditProfileView: React.FC<EditProfileViewProps> = ({
  form,
  onSubmit,
}) => {
  const [_editProfile, { isLoading }] = useEditProfileMutation({
    fixedCacheKey: 'editProfile',
  });

  const { isDirty, isValid } = form.formState;
  const cldImgURL = form.watch('uploadedImage.publicId');
  return (
    <FormProvider {...form}>
      <form
        style={{ maxWidth: '720px', margin: '0 auto' }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ProfileTopbar backURL="/profile" />
        <div className="flex flex-col lg:flex-row  gap-y-6 gap-x-12 px-4 ">
          <ProfileImg cldImgURL={cldImgURL} />
          <div className="w-full flex-1 flex flex-col gap-y-3">
            <FirstNameField />
            <LastNameField />
          </div>
        </div>
        <div className="my-6 w-max mx-auto">
          <Button
            isActive={isDirty && isValid}
            style={{ width: '350px' }}
            size={'lg'}
            variant={'primary'}
            isLoading={isLoading}
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
