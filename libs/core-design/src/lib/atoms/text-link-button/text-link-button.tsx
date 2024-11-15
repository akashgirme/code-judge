import { AnchorHTMLAttributes } from 'react';
import { cn } from '../../utils';
import { Typography, TypographyProps } from '../typography';

interface TextLinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  component?: React.ElementType;
  color?: 'primary' | 'white';
  isUnderlined?: boolean;
  typographyProps?: TypographyProps;
}

const getColorStyles = (color: TextLinkButtonProps['color']) => {
  return cn({
    'text-primary-active hover:text-primary-hover': color === 'primary',
    'text-white': color === 'white',
  });
};

export const TextLinkButton: React.FC<TextLinkButtonProps> = ({
  children,
  href,
  onClick,
  className,
  color = 'primary',
  isUnderlined = false,
  component: BaseComponent = 'a',
  typographyProps: {
    variant: typographyVariant = 'body1',
    className: typographyClassName,
    component: TypographyBaseComponent = 'span',
    ...typographyProps
  } = {},
  ...rest
}) => {
  const baseStyles =
    'focus:outline-none focus:underline hover:underline cursor-pointer';
  const classNames = cn(
    baseStyles,
    { 'underline underline-offset-4': isUnderlined },
    getColorStyles(color),
    className
  );

  const typographyClassNames = cn(typographyClassName, className);

  return (
    <BaseComponent
      href={href}
      onClick={onClick}
      className={classNames}
      {...rest}
    >
      <Typography
        variant={typographyVariant}
        className={typographyClassNames}
        component={TypographyBaseComponent}
        {...typographyProps}
      >
        {children}
      </Typography>
    </BaseComponent>
  );
};
