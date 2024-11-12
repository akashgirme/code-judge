'use client';

import * as React from 'react';
import * as ToggleButtonGroupPrimitive from '@radix-ui/react-toggle-group';
import { VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';
import { toggleButtonVariants } from './toggle-button';

const ToggleButtonGroupContext = React.createContext<
  VariantProps<typeof toggleButtonVariants>
>({
  size: 'default',
  variant: 'default',
});

const ToggleButtonGroup = React.forwardRef<
  React.ElementRef<typeof ToggleButtonGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleButtonGroupPrimitive.Root> &
    VariantProps<typeof toggleButtonVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleButtonGroupPrimitive.Root
    ref={ref}
    className={cn('flex items-center justify-center gap-1', className)}
    {...props}
  >
    <ToggleButtonGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleButtonGroupContext.Provider>
  </ToggleButtonGroupPrimitive.Root>
));

ToggleButtonGroup.displayName = ToggleButtonGroupPrimitive.Root.displayName;

const ToggleButtonGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleButtonGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleButtonGroupPrimitive.Item> &
    VariantProps<typeof toggleButtonVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleButtonGroupContext);

  return (
    <ToggleButtonGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleButtonVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleButtonGroupPrimitive.Item>
  );
});

ToggleButtonGroupItem.displayName = ToggleButtonGroupPrimitive.Item.displayName;

export { ToggleButtonGroup, ToggleButtonGroupItem };
