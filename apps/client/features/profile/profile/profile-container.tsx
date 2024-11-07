import { useWhoAmIQuery } from '@skill-street-ui/auth-client';
import { useOnboardNavigation } from './use-onboard-navigation';
import { Logout, ProfileData } from './profile-page-items';
import { ProfileTopbar } from '../components';

export const ProfileContainer = () => {
  const { data } = useWhoAmIQuery();

  const { isReady } = useOnboardNavigation();
  if (!isReady) return null;

  return (
    <div
      style={{ maxWidth: '720px' }}
      className="mx-auto flex flex-col h-screen"
    >
      <ProfileTopbar backURL="/conversations" />
      <ProfileData data={data} />
      <div className="my-6 max-lg:flex-1  max-lg:relative ">
        {/* <UpdatePassword /> */}
        <Logout />
      </div>
    </div>
  );
};
