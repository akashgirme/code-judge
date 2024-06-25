import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from './ability.factory';
import { CHECK_ABILITY_KEY, RequiredRule } from './ability.decorator';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(
        CHECK_ABILITY_KEY,
        context.getHandler()
      ) || [];

    const { user } = context.switchToHttp().getRequest();

    if (!rules.length) {
      return true;
    }

    if (!user) {
      throw new ForbiddenException();
    }

    const ability = this.abilityFactory.defineAbilityForUser(user);

    try {
      rules.forEach((rule) =>
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
      );
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
