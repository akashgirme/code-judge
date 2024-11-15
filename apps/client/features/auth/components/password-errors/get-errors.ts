import { PasswordErrorsMap, passwordRequirements } from './errors';

export const getErrors = (formErrors: Array<string>) => {
  const errors = formErrors.map((err) => PasswordErrorsMap[err]);
  return passwordRequirements.map((req) => ({
    passed: !errors.includes(req),
    errorMsg: req,
  }));
};
