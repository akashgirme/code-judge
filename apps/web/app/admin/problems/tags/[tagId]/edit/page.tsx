'use client';
import { Action, Subject } from 'apps/web/features/auth/ability/ability-factory';
import { withAbility } from 'apps/web/features/auth/hooks';
import { EditTagContainer } from 'apps/web/features/problem';
import React from 'react';

const EditTagPage = () => {
  return <EditTagContainer />;
};

export default withAbility(EditTagPage, Action.Update, Subject.Tag);
