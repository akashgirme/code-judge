import { ImgHTMLAttributes } from 'react';
import { cn, getSvgSrc } from '../../lib';
import React from 'react';

interface IconProps extends ImgHTMLAttributes<HTMLImageElement> {
  icon: string;
}

export const Icon: React.FC<IconProps> = ({ icon, className, alt, ...rest }) => {
  return <img className={cn(className)} src={getSvgSrc(icon)} {...rest} alt={alt} />;
};
