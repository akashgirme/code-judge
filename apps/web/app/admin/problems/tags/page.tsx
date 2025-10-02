'use client';
import { Action, Subject } from 'apps/web/features/auth/ability/ability-factory';
import { withAbility } from 'apps/web/features/auth/hooks';
import { AllTagsContainer } from 'apps/web/features/problem';

const AllTagsPage = () => {
  return <AllTagsContainer />;
};

export default withAbility(AllTagsPage, Action.Read, Subject.Tag);
