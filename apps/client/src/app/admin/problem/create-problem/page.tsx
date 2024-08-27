'use client';
import { CreateProblemContainer } from '../../../../features/problem';
import { Action, Subject } from '../../../../features/auth/ability';
import { withAbility } from '../../../../features/auth/hooks';

const CreateProblem = () => {
  return <CreateProblemContainer />;
};

export default withAbility(CreateProblem, Action.Manage, Subject.Problem);
