'use client';
import { Action, Subject } from 'apps/web/features/auth/ability/ability-factory';
import { withAbility } from 'apps/web/features/auth/hooks';
import { EditProblemContainer } from 'apps/web/features/problem';
import React from 'react';

const EditTagPage = () => {
  return <EditProblemContainer />;
};

export default withAbility(EditTagPage, Action.Update, Subject.Problem);
