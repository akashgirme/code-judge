import React, { ButtonHTMLAttributes } from 'react';
import { Button } from '../../atoms';
import { NavArrowLeft } from 'iconoir-react';

export const ScrollLeftBtn: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ onClick, ...rest }) => {
  return (
    <div className="absolute top-1/2 flex items-center justify-center -left-0.5 -translate-y-1/2 rounded-l-full bg-gradient-to-r from-50% from-background h-full aspect-square to-transparent">
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full"
        onClick={onClick}
        {...rest}
      >
        <NavArrowLeft className="size-5 text-outline" />
      </Button>
    </div>
  );
};
