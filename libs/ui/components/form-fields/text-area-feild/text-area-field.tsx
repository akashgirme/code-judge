import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../../lib';
import { HelperText } from '../helper-text';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const textAreaFieldLabelStyles = cva(
  [
    // position
    'absolute mx-[15px] px-1 z-20 -top-4 ',
    'peer-focus:z-20  peer-placeholder-shown:z-0 peer-placeholder-shown:top-5',

    // Transition
    'transition-all peer-focus:-top-4 duration-300',

    // font style
    'text-sm  font-semibold',

    // element style
    ' bg-white rounded-sm',
    ' peer-placeholder-shown:bg-inherit peer-focus:bg-white ',
  ],
  {
    variants: {
      variant: {
        default: [
          'peer-focus:text-primary-active text-primary-active',
          'peer-placeholder-shown:text-outline',
        ],
        success: ['text-success'],
        error: ['text-error'],
        warning: ['text-warning'],
      },
    },
  }
);

const textAreaFieldInputStyles = cva(
  [
    'outline-none min-h-[90px] rounded-[12px]  text-neutral-600 dark:text-white px-[15px] py-2 peer w-full bg-transparent border z-10',
  ],
  {
    variants: {
      variant: {
        default: ['border-inactive  focus:border-primary-active'],
        success: ['text-success border-success'],
        error: ['text-error border-error'],
        warning: ['text-warning border-warning'],
      },
    },
  }
);

export type TextAreaFieldProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  hasError?: boolean;
  icon?: string | { src: string };
  showIcon?: boolean;
  hideLabel?: boolean;
} & VariantProps<typeof textAreaFieldInputStyles>;

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      id,
      label,
      helperText,
      hasError,
      icon,
      className,
      variant = 'default',
      showIcon = false,
      hideLabel = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="text relative flex items-center">
          <textarea
            className={cn(textAreaFieldInputStyles({ variant }), className)}
            placeholder=" "
            id={id}
            ref={ref}
            {...rest}
            rows={4}
          />
          {!hideLabel && (
            <span className={cn(textAreaFieldLabelStyles({ variant }))}>
              {label || 'Label Here'}
            </span>
          )}
        </div>
        {helperText && (
          <HelperText severity={variant} hasError={hasError}>
            {helperText}
          </HelperText>
        )}
      </div>
    );
  }
);
