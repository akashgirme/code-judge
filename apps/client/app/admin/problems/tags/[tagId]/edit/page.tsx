'use client';
import { Action, Subject } from 'apps/client/features/auth/ability/ability-factory';
import { withAbility } from 'apps/client/features/auth/hooks';
import { EditTagContainer } from 'apps/client/features/problem';
import React from 'react';

const EditTagPage = () => {
  return <EditTagContainer />;
};

export default withAbility(EditTagPage, Action.Update, Subject.Tag);
