'use client';
import { AllProblemsContainer } from 'apps/web/features/problem';
import { Action, Subject } from 'apps/web/features/auth/ability/ability-factory';
import { withAbility } from 'apps/web/features/auth/hooks';

const AllProblemsPage = () => {
  return <AllProblemsContainer />;
};

export default withAbility(AllProblemsPage, Action.ReadOwn, Subject.Problem);
