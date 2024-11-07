'use client';
import { EyeSolid as EyeIcon, EyeClosed as HiddenEyeIcon } from 'iconoir-react';
import { TextField, TextFieldProps } from '../text-field';
import { forwardRef, useState } from 'react';
import { Separator } from '../../ui';
import { cn } from '../../utils';

interface SecretFieldProps extends TextFieldProps {
  enableToggle?: boolean;
}

export const SecretField = forwardRef<HTMLInputElement, SecretFieldProps>(
  ({ enableToggle = true, endAdornment, variant, ...rest }, ref) => {
    const [showSecret, setShowSecret] = useState(false);

    const handleToggleSecret = () => {
      setShowSecret((prev) => !prev);
    };

    const DefaultEndAdornment = ({ className }: { className?: string }) => (
      <button type="button" onClick={handleToggleSecret}>
        {showSecret ? (
          <EyeIcon
            className={cn(
              'w-5 h-5',
              `${showSecret ? 'text-foreground' : 'text-outline-border'}`,
              className
            )}
          />
        ) : (
          <HiddenEyeIcon
            className={cn(
              'w-5 h-5',
              `${showSecret ? 'text-foreground' : 'text-outline-border'}`,
              className
            )}
          />
        )}
      </button>
    );
    const extendedEndAdornment =
      variant === 'default' || !endAdornment ? (
        <DefaultEndAdornment />
      ) : (
        <>
          {endAdornment}
          <Separator orientation="vertical" className="bg-muted h-6 mx-2 " />
          <DefaultEndAdornment
            className={`${variant && `text-${variant} dark:text-${variant}`}`}
          />
        </>
      );

    return (
      <div className="relative">
        <TextField
          ref={ref}
          type={showSecret ? 'text' : 'password'}
          endAdornment={enableToggle && extendedEndAdornment}
          variant={variant}
          {...rest}
        />
      </div>
    );
  }
);
