'use client';
import { ProblemAdminContainer } from 'apps/web/features/problem/admin';
import { withAuth } from 'apps/web/features/auth';

const ProblemAdminPage = () => {
  return <ProblemAdminContainer />;
};

export default withAuth(ProblemAdminPage);
