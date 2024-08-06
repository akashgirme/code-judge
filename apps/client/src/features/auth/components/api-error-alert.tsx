import { Alert, AlertProps } from '@skill-street-ui/core-design';
import { useMemo } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getErrorMessage } from 'apps/home/utils/get-error-message';

export interface ApiErrorAlertProps extends AlertProps {
  error: SerializedError | FetchBaseQueryError | string | undefined;
}

export const ApiErrorAlert: React.FC<ApiErrorAlertProps> = ({
  error,
  ...props
}) => {
  if (!error) return null;

  const errorMessage = useMemo(() => {
    return getErrorMessage(error);
  }, [error]);

  if (!errorMessage) return null;

  return (
    <Alert severity="error" {...props}>
      {errorMessage}
    </Alert>
  );
};
