import { z } from 'zod';

export const questionConfig = {
  label: 'Select Problem Difficulty',
};

export const modelKey = 'difficulty';

export const problemDifficultyValidations = {
  [modelKey]: z.enum(['EASY', 'MEDIUM', 'HARD']),
};