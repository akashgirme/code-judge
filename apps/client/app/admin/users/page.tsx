'use client';
import { Action, Subject } from 'apps/client/features/auth/ability/ability-factory';
import { withAbility } from 'apps/client/features/auth/hooks';
import { AllUsersView } from 'apps/client/features/profile';

const AllUsersPage = () => {
  return <AllUsersView />;
};

export default withAbility(AllUsersPage, Action.Manage, Subject.User);
