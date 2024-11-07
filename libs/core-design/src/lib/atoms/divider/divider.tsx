import React from 'react';
import { Typography, TypographyProps } from '../typography';
import { cn } from '../../utils';

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  typographyProps?: TypographyProps;
}

export const Divider: React.FC<DividerProps> = ({
  children,
  className,
  typographyProps: {
    className: typographyClassname,
    ...restTypographyProps
  } = {},
  ...rest
}) => {
  return (
    <div className={cn('relative my-4', className)} {...rest}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center">
        <Typography
          component="span"
          className={cn('px-2 bg-white', typographyClassname)}
          {...restTypographyProps}
        >
          {children}
        </Typography>
      </div>
    </div>
  );
};
