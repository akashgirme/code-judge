'use client';
import { Action, Subject } from 'apps/client/features/auth/ability/ability-factory';
import { withAbility } from 'apps/client/features/auth/hooks';
import { CreateTagContainer } from 'apps/client/features/problem';

const CreateTagPage = () => {
  return <CreateTagContainer />;
};

export default withAbility(CreateTagPage, Action.Create, Subject.Tag);
