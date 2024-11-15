import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';
import { Refresh } from 'iconoir-react';
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium font-helvetica ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-cn-primary text-cn-primary-foreground hover:bg-cn-primary/90',
        destructive: 'bg-error text-destructive-foreground hover:bg-error/90',
        ghost: ' hover:bg-secondary hover:text-accent-foreground active:bg-transparent',
        link: 'text-cn-primary underline-offset-4 hover:underline',

        primary:
          'text-white bg-primary disabled:bg-primary-disabled disabled:text-primary-text-disabled hover:bg-primary-hover',
        'primary-outline':
          'border bg-inherit border-primary text-primary-active hover:border-primary-text-disabled hover:bg-primary-border-fill hover:text-primary-border-text-hover disabled:text-primary-border-text-disabled disabled:border-transparent',
        secondary:
          'bg-secondary hover:bg-secondary-hover disabled:bg-secondary-disabled text-body-tertiary hover:text-secondary-text-hover disabled:text-secondary-text-disabled',

        'secondary-outline':
          'border bg-inherit border-secondary-active text-secondary-active hover:bg-secondary-border-fill hover:border-secondary-border-hover hover:text-body-secondary disabled:text-secondary-text-disabled disabled:border-transparent',

        'google-btn': 'bg-white text-black hover:bg-white/90 shadow-small',
        'apple-btn': 'text-white bg-surface-on hover:bg-surface-on-varient ',
      },
      size: {
        default: 'h-12 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-11 w-11',
        xl: 'h-16',
      },
      rounded: {
        default: 'rounded-l rounded-r',
        // default: 'rounded-xl',
        sides: 'rounded-l-full rounded-r-full',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
);

const btnActiveState = {
  primary: 'bg-primary-active',
  secondary: 'bg-secondary-active text-background',
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  isActive?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      asChild = false,
      isLoading = false,
      disabled = false,
      children,
      type = 'button',
      isActive = false,

      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, rounded }),
          isActive && variant && variant in btnActiveState
            ? btnActiveState[variant as keyof typeof btnActiveState]
            : null,
          className
        )}
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <Refresh className="animate-spin" /> : null}
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
