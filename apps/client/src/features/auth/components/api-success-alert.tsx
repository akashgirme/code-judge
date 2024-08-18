import { Alert, AlertProps } from '@skill-street-ui/core-design';

export interface ApiSuccessAlertProps extends AlertProps {
  isSuccess: boolean;
  data: unknown;
}

export const ApiSuccessAlert: React.FC<ApiSuccessAlertProps> = ({
  isSuccess,
  data,
  ...props
}) => {
  if (
    !isSuccess ||
    !data ||
    !(typeof data === 'object' && 'message' in data && data.message)
  ) {
    return null;
  }

  const successMessage = data.message as string;

  return (
    <Alert severity="info" {...props}>
      {successMessage}
    </Alert>
  );
};
