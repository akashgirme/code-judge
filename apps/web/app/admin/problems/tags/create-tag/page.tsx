'use client';
import { Action, Subject } from 'apps/web/features/auth/ability/ability-factory';
import { withAbility } from 'apps/web/features/auth/hooks';
import { CreateTagContainer } from 'apps/web/features/problem';

const CreateTagPage = () => {
  return <CreateTagContainer />;
};

export default withAbility(CreateTagPage, Action.Create, Subject.Tag);
