'use client';
import { withAuth } from 'apps/client/features/auth';
import { ProfileContainer } from 'apps/client/features/profile';

const ProfilePage = () => {
  return <ProfileContainer />;
};

export default withAuth(ProfilePage);
