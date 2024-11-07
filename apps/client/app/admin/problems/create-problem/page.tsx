'use client';
import { Action, Subject } from 'apps/client/features/auth/ability/ability-factory';
import { withAbility } from 'apps/client/features/auth/hooks/with-ability';
import { CreateProblemContainer } from 'apps/client/features/problem';

const CreateProblemScreen = () => {
  return <CreateProblemContainer />;
};

export default withAbility(CreateProblemScreen, Action.Create, Subject.Problem);
