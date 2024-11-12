import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils';
import { Skeleton } from '../../ui';

const chipStyles = cva(
  'w-max box-border gap-2 inline-flex text-white font-helvetica font-medium items-center justify-evenly whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none rounded-l-full rounded-r-full flex-shrink-0 tracking-wide',
  {
    variants: {
      size: {
        sm: 'py-2 px-4 text-sm leading-normal',
        lg: 'py-3 px-4 text-base',
      },
      variant: {
        'primary-btn': 'bg-primary',

        'primary-link': 'text-primary-active',

        'primary-outline':
          'border bg-inherit border-primary-border text-primary-border-text',

        'secondary-btn': 'bg-secondary text-body-tertiary',

        'secondary-outline':
          'border bg-inherit border-secondary-text-disabled text-secondary-border',

        'secondary-link': 'text-secondary-border',

        link: 'text-link-active',
      },
    },
    defaultVariants: {
      size: 'sm',
      variant: 'primary-btn',
    },
  }
);

const chipStates = {
  'primary-btn': {
    active: 'bg-primary-active',
    hover: 'hover:bg-primary-hover',
    disabled: 'bg-primary-disabled text-primary-text-disabled',
  },
  'primary-link': {
    active: 'text-primary-active',
    hover: 'hover:text-primary-hover',
    disabled: 'text-primary-border-text-disabled',
  },
  'primary-outline': {
    active: 'border-primary-active text-primary-active ',
    hover: 'hover:border-primary-text-disabled hover:bg-primary-border-fill',
    disabled: 'text-primary-border-text-disabled border-transparent',
  },
  'secondary-btn': {
    active: 'bg-secondary-active text-secondary-text',
    hover: 'hover:bg-secondary-hover hover:text-secondary-text-hover',
    disabled: 'bg-secondary-disabled text-secondary-text-disabled',
  },
  'secondary-outline': {
    active: 'border-secondary-active text-secondary-active',
    hover:
      'hover:bg-secondary-border-fill hover:border-secondary-border-hover hover:text-body-secondary',
    disabled: 'text-secondary-text-disabled border-transparent',
  },
  'secondary-link': {
    active: 'text-secondary-active',
    hover: 'hover:text-secondary-text-hover',
    disabled: 'text-secondary-text-disabled',
  },
  link: {
    active: 'text-link-active',
    hover: 'hover:text-link-hover',
    disabled: 'text-link-disabled',
  },
} as const;

export interface ChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipStyles> {
  state?: 'active' | 'disabled';
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      children,
      className,
      state,
      onClick,
      size,
      variant = 'primary-btn',
      ...rest
    },
    ref
  ) => {
    return (
      <div
        {...rest}
        className={cn(
          chipStyles({ size, variant }),
          state && variant && chipStates[variant][state],
          state !== 'disabled' && variant && chipStates[variant]['hover'],
          onClick && 'cursor-pointer',
          className
        )}
        ref={ref}
        role={onClick && 'button'}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);

Chip.displayName = 'Chip';

export function ChipSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={cn('h-11 w-40 rounded-l-full rounded-r-full', className)}
    />
  );
}
