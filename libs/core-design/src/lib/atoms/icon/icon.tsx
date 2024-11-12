import { ImgHTMLAttributes } from 'react';
import { getSvgSrc } from '../../utils/svg-parser';
import { cn } from '../../utils';

interface IconProps extends ImgHTMLAttributes<HTMLImageElement> {
  icon: string;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  className,
  alt,
  ...rest
}) => {
  return (
    <img className={cn(className)} src={getSvgSrc(icon)} {...rest} alt={alt} />
  );
};
