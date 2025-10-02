'use client';
import { withAuth } from 'apps/web/features/auth';
import { ProfileContainer } from 'apps/web/features/profile';

const ProfilePage = () => {
  return <ProfileContainer />;
};

export default withAuth(ProfilePage);
