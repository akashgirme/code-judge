'use client';
import { Action, Subject } from '../../../../features/auth/ability';
import { AddTestCasesContainer } from '../../../../features/problem';
import { withAbility } from '../../../../features/auth/hooks';

const AddTestCases = () => {
  return <AddTestCasesContainer />;
};

export default withAbility(AddTestCases, Action.Manage, Subject.Problem);
