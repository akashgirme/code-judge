import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../../lib';
import { Typography, TypographyProps } from '../../ui/typography';
import { WarningTriangle, Check, Xmark } from 'iconoir-react';
import React from 'react';

export interface HelperTextProps
  extends TypographyProps,
    VariantProps<typeof helperTextStyles> {
  hasError?: boolean;
}

const helperTextStyles = cva([' text-left'], {
  variants: {
    severity: {
      default: ['text-body-secondary'],
      success: ['text-success'],
      error: ['text-error'],
      warning: ['text-warning'],
    },
  },
});

export const HelperText: React.FC<HelperTextProps> = ({
  className,
  severity = 'default',
  ...rest
}) => {
  return (
    <div
      className={cn(
        'flex gap-x-2 mx-0.5 items-center max-w-full  ',
        helperTextStyles({ severity }),
        className
      )}
    >
      <HelperIcon severity={severity} />
      <Typography
        fontFamily={'roboto'}
        fontSize={'caption'}
        fontWeight={'regular'}
        component="span"
        {...rest}
      />
    </div>
  );
};

const HelperIcon = ({ severity }: VariantProps<typeof helperTextStyles>) => {
  const className = 'h-[14px]   ';
  switch (severity) {
    case 'success':
      return <Check className={className} />;
    case 'error':
      return <Xmark className={className} />;
    case 'warning':
      return <WarningTriangle className={className} />;
    default:
      return null;
  }
};
