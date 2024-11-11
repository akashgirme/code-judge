'use client';

import { withAuth } from 'apps/client/features/auth';
import { AllSubmissionsContainer } from 'apps/client/features/submission';

const AllSubmissionsPage = () => {
  return <AllSubmissionsContainer />;
};

export default withAuth(AllSubmissionsPage);
