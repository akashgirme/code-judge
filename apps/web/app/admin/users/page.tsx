'use client';
import { Action, Subject } from 'apps/web/features/auth/ability/ability-factory';
import { withAbility } from 'apps/web/features/auth/hooks';
import { AllUsersView } from 'apps/web/features/profile';

const AllUsersPage = () => {
  return <AllUsersView />;
};

export default withAbility(AllUsersPage, Action.Manage, Subject.User);
