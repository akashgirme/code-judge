'use client';
import { Action, Subject } from 'apps/client/features/auth/ability/ability-factory';
import { withAbility } from 'apps/client/features/auth/hooks';
import { AddTestCasesContainer } from 'apps/client/features/problem';
import React from 'react';

const AddTestCasesPage = () => {
  return <AddTestCasesContainer />;
};

export default withAbility(AddTestCasesPage, Action.Manage, Subject.Problem);
