import { cva, VariantProps } from 'class-variance-authority';
import { Typography, TypographyProps } from '../../atoms';
import { cn } from '../../utils';

const alertVariants = cva('rounded px-4 py-2 flex', {
  variants: {
    severity: {
      error: 'border-red-500',
      warning: 'border-yellow-500',
      info: 'border-blue-500',
      success: 'border-green-500',
    },
    variant: {
      default: '',
      filled: '',
      outlined: 'border-[1px]',
    },
  },
  compoundVariants: [
    {
      severity: 'error',
      variant: 'default',
      className: 'bg-red-100 text-red-500',
    },
    {
      severity: 'warning',
      variant: 'default',
      className: 'bg-yellow-100 text-yellow-500',
    },
    {
      severity: 'info',
      variant: 'default',
      className: 'bg-blue-100 text-blue-500',
    },
    {
      severity: 'success',
      variant: 'default',
      className: 'bg-green-100 text-green-500',
    },
    {
      severity: 'error',
      variant: 'filled',
      className: 'bg-red-500 text-white',
    },
    {
      severity: 'warning',
      variant: 'filled',
      className: 'bg-yellow-500 text-white',
    },
    {
      severity: 'info',
      variant: 'filled',
      className: 'bg-blue-500 text-white',
    },
    {
      severity: 'success',
      variant: 'filled',
      className: 'bg-green-500 text-white',
    },
    {
      severity: 'error',
      variant: 'outlined',
      className: 'text-red-500',
    },
    {
      severity: 'warning',
      variant: 'outlined',
      className: 'text-yellow-500',
    },
    {
      severity: 'info',
      variant: 'outlined',
      className: 'text-blue-500',
    },
    {
      severity: 'success',
      variant: 'outlined',
      className: 'text-green-500',
    },
  ],
  defaultVariants: {
    severity: 'info',
    variant: 'default',
  },
});

const getAlertIcon = (severity: AlertProps['severity']) => {
  switch (severity) {
    case 'error':
      return '❌';
    case 'success':
      return '✅';
    case 'warning':
      return '⚠️';
    default:
      return 'ℹ️';
  }
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  action?: React.ReactNode;
  titleProps?: TypographyProps;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  severity = 'info',
  variant = 'default',
  className,
  title,
  titleProps: { ...restTitleProps } = {},
  action,
  ...rest
}) => {
  const icon = getAlertIcon(severity);
  return (
    <div
      className={cn(alertVariants({ severity, variant, className }), {
        'items-center': !title,
      })}
      {...rest}
    >
      <span
        className={cn('mr-3 min-w-[24px] min-h-[24px]', { 'mt-1': !!title })}
      >
        {icon}
      </span>
      <div>
        {title && <Typography {...restTitleProps}>{title}</Typography>}
        <Typography>{children}</Typography>
      </div>
      {action ? <div className="ml-auto">{action}</div> : null}
    </div>
  );
};
