import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils';
import { Typography, TypographyProps } from '../typography/typography';
import Styles from './checkbox.module.scss';
import { HelperText } from '../helper-text';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helperText?: string;
  hasError?: boolean;
  labelProps?: TypographyProps;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      label,
      helperText,
      hasError,
      labelProps: {
        component = 'label',
        className: labelClassName,
        ...labelProps
      } = {},
      ...rest
    },
    ref
  ) => {
    return (
      <div className={Styles.checkboxContainer}>
        <Typography
          component={component}
          className={cn('text-white text-left', labelClassName)}
          {...labelProps}
        >
          <input type="checkbox" ref={ref} {...rest} />
          <div></div>
          {label}
        </Typography>
        {helperText && (
          <HelperText hasError={hasError}>{helperText}</HelperText>
        )}
      </div>
    );
  }
);
