'use client';
import { withAuth } from 'apps/client/features/auth';
import { EditProfileContainer } from 'apps/client/features/profile';

const EditProfilePage = () => {
  return <EditProfileContainer />;
};

export default withAuth(EditProfilePage);
