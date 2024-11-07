'use client';
import { AllProblemsContainer } from 'apps/client/features/problem';
import { Action, Subject } from 'apps/client/features/auth/ability/ability-factory';
import { withAbility } from 'apps/client/features/auth/hooks';

const AllProblemsPage = () => {
  return <AllProblemsContainer />;
};

export default withAbility(AllProblemsPage, Action.ReadOwn, Subject.Problem);
