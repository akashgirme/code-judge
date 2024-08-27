'use client';
import { Action, Subject } from '../../../features/auth/ability';
import { withAbility } from '../../../features/auth/hooks';
import { DashboardContainer } from '../../../features/dashboard/dashboard-container';

const Dashboard = () => {
  return <DashboardContainer />;
};
export default withAbility(Dashboard, Action.Manage, Subject.Problem);
