'use client';
import { AdminDashboardContainer } from 'apps/client/features/admin';
import { Action, Subject } from 'apps/client/features/auth';
import { withAbility, withAuth } from 'apps/client/features/auth/hooks';

const AdminDashboardPage = () => {
  return <AdminDashboardContainer />;
};

// export default withAuth(AdminDashboardPage);
export default withAbility(AdminDashboardPage, Action.Create, Subject.Problem);
