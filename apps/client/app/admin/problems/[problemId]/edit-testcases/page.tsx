'use client';
import { Action, Subject } from 'apps/client/features/auth/ability/ability-factory';
import { withAbility } from 'apps/client/features/auth/hooks';
import { EditTestCasesContainer } from 'apps/client/features/problem';
import React from 'react';

const EditTestCasesPage = () => {
  return <EditTestCasesContainer />;
};

export default withAbility(EditTestCasesPage, Action.Manage, Subject.Problem);
