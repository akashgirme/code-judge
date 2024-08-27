'use client';
import { EditProblemContainer } from '../../../../features/problem';
import { Action, Subject } from '../../../../features/auth/ability';
import { withAbility } from '../../../../features/auth/hooks';

const UpdateProblem = () => {
  return <EditProblemContainer />;
};

export default withAbility(UpdateProblem, Action.Manage, Subject.Problem);
