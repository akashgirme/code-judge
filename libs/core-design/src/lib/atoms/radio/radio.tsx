import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils';
import { Typography, TypographyProps } from '../typography/typography';
import Styles from './radio.module.scss';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  labelProps?: TypographyProps;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      id,
      label,
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
      <div className={Styles.radioContainer}>
        <Typography
          component={component}
          className={cn('text-white text-left', labelClassName)}
          {...labelProps}
        >
          <input type="radio" ref={ref} {...rest} />
          <div></div>
          {label}
        </Typography>
      </div>
    );
  }
);
