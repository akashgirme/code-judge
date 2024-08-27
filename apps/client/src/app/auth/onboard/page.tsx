'use client';
import { OnboardContainer } from '../../../features/auth';
import { withAuth } from '../../../features/auth/hooks';

const Onboard = () => {
  return <OnboardContainer />;
};

export default withAuth(Onboard);
