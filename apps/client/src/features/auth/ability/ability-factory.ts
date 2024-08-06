import {
  AbilityBuilder,
  InferSubjects,
  MongoAbility,
  MongoQuery,
  createMongoAbility,
} from '@casl/ability';

import { UserRole } from '@code-judge/api-client';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  UpdateOwn = 'update_own',
  Delete = 'delete',
  DeleteOwn = 'delete_own',
  Publish = 'publish',
  ReadOwn = 'read_own',
}

export enum Subject {
  All = 'all',
  User = 'User',
  Topic = 'topic',
  Problem = 'problem',
  Submission = 'submission',
}

export type Subjects = InferSubjects<Subject>;

type PossibleAbilities = [Action, Subjects];
type Conditions = MongoQuery;

export const defineDefaultAbility = () => {
  const { build } = new AbilityBuilder(createMongoAbility<PossibleAbilities, Conditions>);

  return build();
};

export const ability = defineDefaultAbility();

export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;

export type AppAbilityRules = typeof ability.rules;

export const defineAbilityForUser = (userRole: UserRole) => {
  const { can, cannot, build } = new AbilityBuilder(
    createMongoAbility<PossibleAbilities, Conditions>
  );

  switch (userRole) {
    case 'super_admin':
      can(Action.Manage, Subject.All);
    // eslint-disable-next-line no-fallthrough
    case 'problem_admin':
      can(Action.Manage, Subject.Problem);
      can(Action.Manage, Subject.Topic);
      can(Action.Manage, Subject.Submission);
    // eslint-disable-next-line no-fallthrough
    case 'user':
      can(Action.ReadOwn, Subject.Problem);
      can(Action.Create, Subject.Problem);
      can(Action.Update, Subject.Problem);
      can(Action.ReadOwn, Subject.Submission);
      cannot(Action.Delete, Subject.Problem);
  }

  return build();
};

export const generateAbilityFromRules = (rules: AppAbilityRules) => {
  const ability = new AbilityBuilder(
    createMongoAbility<PossibleAbilities, Conditions>
  ).build();
  ability.update(rules);
  return ability;
};
