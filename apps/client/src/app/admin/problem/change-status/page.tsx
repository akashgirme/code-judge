'use client';
import { ChangeStatusContainer } from '../../../../features/problem';
import { Action, Subject } from '../../../../features/auth/ability';
import { withAbility } from '../../../../features/auth/hooks';

const ChangeProblemStatus = () => {
  return <ChangeStatusContainer />;
};

export default withAbility(ChangeProblemStatus, Action.Manage, Subject.Problem);
