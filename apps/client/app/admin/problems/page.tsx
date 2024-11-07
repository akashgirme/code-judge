'use client';
import { ProblemAdminContainer } from 'apps/client/features/problem/admin';
import { withAuth } from 'apps/client/features/auth';

const ProblemAdminPage = () => {
  return <ProblemAdminContainer />;
};

export default withAuth(ProblemAdminPage);
