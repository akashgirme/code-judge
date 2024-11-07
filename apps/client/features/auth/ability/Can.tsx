'use client';
import { createCanBoundTo } from '@casl/react';
import { AppAbility, ability } from './ability-factory';

export const Can = createCanBoundTo<AppAbility>(ability);
