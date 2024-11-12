export const passwordRequirements = [
  'Include lower case characters',
  'Include upper case characters',
  'Include at least one number',
  'Include at least one symbol',
  'Should be at least 8 characters long',
];

// TODO: Try refactoring for a better way
export const PasswordErrorsMap: Record<string, string> = {
  'Password should contain at least one lowercase letter':
    'Include lower case characters',
  'Password should contain at least one uppercase letter':
    'Include upper case characters',
  'Password should contain at least one digit': 'Include at least one number',
  'Password should contain at least one special character':
    'Include at least one symbol',
  'Password should be at least 8 characters long':
    'Should be at least 8 characters long',
};
