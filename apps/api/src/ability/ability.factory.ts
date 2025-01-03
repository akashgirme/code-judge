import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  MongoQuery,
  createMongoAbility,
} from '@casl/ability';
import { User } from '../user/entities';
import { Injectable } from '@nestjs/common';
import { UserRole } from '../user/enums';
import { Problem, Tag } from '../problem/entities';
import { Submission } from '../submission/entities';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  ReadOwn = 'readOwn',
  UpdateOwn = 'updateOwn',
  Update = 'update',
  Delete = 'delete',
  Publish = 'publish',
}

export type Subjects =
  | InferSubjects<typeof User | typeof Problem | typeof Tag | typeof Submission>
  | 'all';

type PossibleAbilities = [Action, Subjects];
type Conditions = MongoQuery;

export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;

@Injectable()
export class AbilityFactory {
  defineAbilityForUser(user: User) {
    const { can, build } = new AbilityBuilder(
      createMongoAbility<PossibleAbilities, Conditions>
    );

    switch (user.role) {
      case UserRole.SUPER_ADMIN:
        can(Action.Manage, 'all');
      // eslint-disable-next-line no-fallthrough
      case UserRole.PROBLEM_MODERATOR:
        can(Action.Manage, Problem);
        can(Action.Manage, Tag);
      // eslint-disable-next-line no-fallthrough
      case UserRole.PROBLEM_WRITER:
        can(Action.Create, Problem);
        can(Action.UpdateOwn, Problem);
        can(Action.ReadOwn, Problem);
        can(Action.Read, Tag);
      case UserRole.USER:
        can(Action.ReadOwn, Submission);
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
