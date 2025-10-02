'use client';
import { Action, Subject } from 'apps/web/features/auth/ability/ability-factory';
import { withAbility } from 'apps/web/features/auth/hooks/with-ability';
import { CreateProblemContainer } from 'apps/web/features/problem';

const CreateProblemScreen = () => {
  return <CreateProblemContainer />;
};

export default withAbility(CreateProblemScreen, Action.Create, Subject.Problem);
