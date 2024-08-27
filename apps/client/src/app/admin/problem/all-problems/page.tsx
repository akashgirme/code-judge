'use client';
import { AllProblemsContainer } from '../../../../features/problem/all-problems';
import { Action, Subject } from '../../../../features/auth/ability';
import { withAbility } from '../../../../features/auth/hooks';

const AllProblems = () => {
  return <AllProblemsContainer />;
};

export default withAbility(AllProblems, Action.Manage, Subject.Problem);
