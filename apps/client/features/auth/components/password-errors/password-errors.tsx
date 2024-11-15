import { Lock, Check, Xmark } from 'iconoir-react';
import { useFormContext } from 'react-hook-form';

import { getErrors } from './get-errors';
import { useMemo } from 'react';
import { extractErrorMessages } from '@code-judge/core-design';

export const PasswordErrors = () => {
  const {
    formState: { errors, touchedFields },
  } = useFormContext();
  const fieldError = errors['password'];
  const fieldTouched = touchedFields['password'];

  const validations = useMemo(() => {
    // @ts-ignore
    const passwordErrors = extractErrorMessages(fieldError?.types);
    return getErrors(passwordErrors);
  }, [fieldError]);

  return (
    <div className="flex flex-col gap-4">
      <span className="flex items-center gap-2 ">
        <Lock className=" w-4 h-4  " /> Your password needs to:
      </span>
      <ul className="space-y-1">
        {validations.map((validation) => (
          <li
            className="flex gap-3 items-center font-light text-sm"
            key={`password-err-${validation.errorMsg}`}
          >
            {validation.passed && fieldTouched ? (
              <Check className="w-4 h-4" />
            ) : (
              <Xmark className="w-4 h-4" />
            )}
            {validation.errorMsg}
          </li>
        ))}
      </ul>
    </div>
  );
};
