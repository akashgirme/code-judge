'use client';
import { Action, Subject } from 'apps/client/features/auth/ability/ability-factory';
import { withAbility } from 'apps/client/features/auth/hooks';
import { AllTagsContainer } from 'apps/client/features/problem';

const AllTagsPage = () => {
  return <AllTagsContainer />;
};

export default withAbility(AllTagsPage, Action.Read, Subject.Tag);
