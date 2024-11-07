import { useRouter } from 'next/navigation';
import { EditProfileLogic, EditProfileModel } from './edit-profile-logic';
import {
  useEditProfileMutation,
  useWhoAmIQuery,
} from '@skill-street-ui/auth-client';
import { handleError } from 'apps/home/utils';
import { useAuth } from '../../auth';

export const EditProfileContainer = () => {
  const router = useRouter();
  const { data, isSuccess } = useWhoAmIQuery();
  const { updateUser } = useAuth();
  const [editProfile] = useEditProfileMutation({
    fixedCacheKey: 'editProfile',
  });

  const handleSubmit = async (data: EditProfileModel) => {
    await editProfile({
      editProfileDto: {
        ...data,
      },
    })
      .unwrap()
      .then((updatedProfile) => {
        updateUser(updatedProfile.user);
        router.push('/profile');
      })
      .catch(handleError);
  };

  const defaultValues: EditProfileModel = {
    firstName: data?.user.firstName ?? '',
    lastName: data?.user.lastName ?? '',
    uploadedImage: {
      publicId: data?.user.profileImagePublicId ?? '',
      version: 0,
      signature: '',
    },
  };

  if (!isSuccess) {
    return null;
  }

  return (
    <EditProfileLogic defaultValues={defaultValues} onSubmit={handleSubmit} />
  );
};
