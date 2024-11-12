import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils';
import { HelperText } from '../helper-text';
import { cva, VariantProps } from 'class-variance-authority';

const textFieldLabelStyles = cva(
  [
    // position
    'absolute mx-4 px-1 z-20 -translate-y-[125%] ',
    'peer-focus:z-20  peer-placeholder-shown:z-0',

    // Transition
    'peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-[125%] duration-150',

    // font style
    'text-foreground font-normal',

    // element style
    'bg-white dark:bg-black rounded-sm',
    'peer-placeholder-shown:bg-inherit peer-focus:bg-white dark:peer-focus:bg-black',
  ],
  {
    variants: {
      variant: {
        default: [
          'peer-focus:text-primary-active text-outline-border ',
          'peer-placeholder-shown:text-outline',
        ],
        success: ['text-success'],
        error: ['text-error'],
        warning: ['text-warning'],
      },
    },
  }
);

const textFieldInputStyles = cva(
  // [
  //   'outline-none rounded-xl text-foreground dark:text-white px-4 py-2 peer w-full bg-transparent border z-10 font-normal',
  // ],
  [
    'outline-none rounded-l rounded-r text-foreground dark:text-white px-4 py-2 peer w-full bg-transparent border z-10 font-normal',
  ],
  {
    variants: {
      variant: {
        default: ['border-secondary-text-disabled focus:border-primary-active'],
        success: ['text-success border-success'],
        error: ['text-error border-error'],
        warning: ['text-warning border-warning'],
      },
    },
  }
);

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  hasError?: boolean;
  icon?: string | { src: string };
  showIcon?: boolean;
  endAdornment?: React.ReactNode;
  hideLabel?: boolean;
  forceVariant?: boolean;
} & VariantProps<typeof textFieldInputStyles>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
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
      endAdornment,
      hideLabel = false,
      forceVariant = false,
      ...rest
    },
    ref
  ) => {
    const fieldVariant = forceVariant ? variant : hasError ? 'error' : variant;

    return (
      <div className="flex flex-col gap-1 min-h-18">
        <div className="text-white relative flex items-center">
          <input
            className={cn(
              textFieldInputStyles({ variant: fieldVariant }),
              className,
              'h-12'
            )}
            placeholder=" "
            id={id}
            ref={ref}
            {...rest}
          />
          {!hideLabel && (
            <span
              style={{ fontSize: '13px' }}
              className={cn(textFieldLabelStyles({ variant: fieldVariant }))}
            >
              {label || 'Label Here'}
            </span>
          )}
          {!!endAdornment && (
            <div className="absolute right-3 p-3 h-full my-1 flex items-center justify-center z-50">
              {endAdornment}
            </div>
          )}
        </div>
        {helperText && hasError && (
          <HelperText severity={fieldVariant} hasError={hasError}>
            {helperText}
          </HelperText>
        )}
      </div>
    );
  }
);
