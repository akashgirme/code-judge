'use client';
import { AdminDashboardContainer } from 'apps/web/features/admin';
import { Action, Subject } from 'apps/web/features/auth';
import { withAbility, withAuth } from 'apps/web/features/auth/hooks';

const AdminDashboardPage = () => {
  return <AdminDashboardContainer />;
};

// export default withAuth(AdminDashboardPage);
export default withAbility(AdminDashboardPage, Action.Create, Subject.Problem);
