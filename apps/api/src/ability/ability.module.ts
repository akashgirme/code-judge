import { Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';
import { AbilityGuard } from './ability.guard';

@Module({
  providers: [AbilityFactory, AbilityGuard],
  exports: [AbilityFactory, AbilityGuard],
})
export class AbilityModule {}
