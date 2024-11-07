'use client';
import { Action, Subject } from 'apps/client/features/auth/ability/ability-factory';
import { withAbility } from 'apps/client/features/auth/hooks';
import { ChangeProblemStatusContainer } from 'apps/client/features/problem';
import React from 'react';

const ChangeProblemStatusPage = () => {
  return <ChangeProblemStatusContainer />;
};

export default withAbility(ChangeProblemStatusPage, Action.Manage, Subject.Problem);
