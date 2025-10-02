import { toast } from 'sonner';

export const handleSuccess = (data: unknown) => {
  if (!data || !(typeof data === 'object' && 'message' in data && data.message)) {
    return null;
  }

  const successMessage = data.message as string;

  toast.success(successMessage);
};
