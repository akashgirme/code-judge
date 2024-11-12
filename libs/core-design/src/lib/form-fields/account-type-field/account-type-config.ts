import { z } from 'zod';

export const questionConfig = {
  label: 'How would you like to join us?',
  options: [
    { value: 'teacher', label: 'Teacher' },
    { value: 'student', label: 'Student' },
  ],
};

export const modelKey = 'accountType';

export const accountTypeValidations = {
  [modelKey]: z.enum(['teacher', 'student']),
};
