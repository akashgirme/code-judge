'use client';
import { withAuth } from 'apps/web/features/auth';
import { EditProfileContainer } from 'apps/web/features/profile';

const EditProfilePage = () => {
  return <EditProfileContainer />;
};

export default withAuth(EditProfilePage);
