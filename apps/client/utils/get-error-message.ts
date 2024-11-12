import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const getErrorMessage = (
  error: SerializedError | FetchBaseQueryError | string | undefined
): string => {
  if (typeof error === 'string') {
    return error;
  }
  if (isErrorWithMessage(error)) {
    return error.message;
  }
  if (isFetchBaseQueryError(error)) {
    if (typeof error.status === 'number') {
      if (
        typeof error.data === 'object' &&
        error.data !== null &&
        'message' in error.data
      ) {
        if (typeof error.data.message === 'string') {
          return error.data.message;
        }
        if (Array.isArray(error.data.message)) {
          return error.data.message?.join('\n');
        }
      }
    }
    return JSON.stringify(error);
  }
  return JSON.stringify(error);
};

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}
