'use client';
import {
  Action,
  Subject,
} from 'apps/home/features/auth/ability/ability-factory';
import { withAbility } from 'apps/home/features/auth/hooks';
import { AllUsersView } from 'apps/home/features/profile';

const AllUsersPage = () => {
  return <AllUsersView />;
};

export default withAbility(AllUsersPage, Action.Manage, Subject.User);
