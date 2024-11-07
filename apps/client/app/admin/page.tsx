'use client';
import { AdminDashboardContainer } from 'apps/client/features/admin';
import { withAuth } from 'apps/client/features/auth/hooks';

const AdminDashboardPage = () => {
  return <AdminDashboardContainer />;
};

// TODO: Make it more secure
export default withAuth(AdminDashboardPage);
