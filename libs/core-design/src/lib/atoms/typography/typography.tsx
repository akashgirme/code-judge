import { HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { cva, VariantProps } from 'class-variance-authority';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption';

export interface TypographyProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyStyles> {
  variant?: TypographyVariant;
  gradientColor?: boolean;
  component?: React.ElementType;
}

const gradientColorStyles = {
  background:
    'linear-gradient(90deg, #7351BE 0%, #EF6547 44.09%, #3A8FF2 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const typographyStyles = cva('text-inherit', {
  variants: {
    fontFamily: {
      roboto: 'font-roboto',
      inter: 'font-inter',
      helvetica: 'font-helvetica',
    },
    fontSize: {
      D1: 'text-64px leading-120%',
      D2: 'text-56px leading-120%',
      h1: 'text-44px leading-120%',
      h2: 'text-32px leading-120%',
      h3: 'text-2xl leading-120%',
      h4: 'text-xl leading-120%',
      h5: 'text-lg leading-120%',
      h6: 'text-base leading-120%',
      'body-l': 'text-lg leading-160% tracking-heading',
      'body-m': 'text-base leading-normal tracking-heading',
      'body-s': 'text-sm leading-normal tracking-heading',
      label: 'text-13px leading-normal',
      caption: 'text-xs leading-normal',
    },
    fontWeight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
  },
  defaultVariants: {
    fontFamily: 'inter',
    fontSize: 'body-m',
    fontWeight: 'regular',
  },
});

export const Typography: React.FC<TypographyProps> = ({
  fontFamily,
  fontSize,
  fontWeight,
  children,
  className,
  style = {},
  gradientColor = false,
  component: BaseComponent = 'p',
  ...restProps
}) => {
  return (
    <BaseComponent
      className={cn(
        typographyStyles({ fontFamily, fontSize, fontWeight }),
        className
      )}
      style={gradientColor ? { ...style, ...gradientColorStyles } : style}
      {...restProps}
    >
      {children}
    </BaseComponent>
  );
};
