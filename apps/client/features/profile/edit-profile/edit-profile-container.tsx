import { useRouter } from 'next/navigation';
import { EditProfileLogic, EditProfileModel } from './edit-profile-logic';
import { useEditProfileMutation, useWhoAmIQuery } from '@code-judge/api-hooks';
import { handleError } from 'apps/client/utils';
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
        updateUser(updatedProfile);
        router.push('/profile');
      })
      .catch(handleError);
  };

  const defaultValues: EditProfileModel = {
    firstName: data?.firstName ?? '',
    lastName: data?.lastName ?? '',
  };

  if (!isSuccess) {
    return null;
  }

  return <EditProfileLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
