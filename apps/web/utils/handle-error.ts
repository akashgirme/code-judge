import { getErrorMessage } from './get-error-message';
import { toast } from 'sonner';

export const handleError = (error: Error) => {
  const errorMessage = getErrorMessage(error) || 'An unknown error occurred';
  toast.error(errorMessage);
};
