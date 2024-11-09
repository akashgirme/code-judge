import {
  AbilityBuilder,
  InferSubjects,
  MongoAbility,
  MongoQuery,
  createMongoAbility,
} from '@casl/ability';

import { UserRole } from '@code-judge/api-hooks';

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
  Problem = 'Problem',
  Tag = 'Tag',
  Submission = 'Submission',
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
    case 'problem_moderator':
      can(Action.Manage, Subject.Problem);
      can(Action.Manage, Subject.Tag);
      can(Action.Manage, Subject.Submission);
    case 'problem_writer':
      can(Action.Create, Subject.Problem);
      can(Action.UpdateOwn, Subject.Problem);
      can(Action.ReadOwn, Subject.Problem);
      can(Action.Read, Subject.Tag);
    case 'user':
      can(Action.Create, Subject.Submission);
      can(Action.ReadOwn, Subject.Submission);
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
