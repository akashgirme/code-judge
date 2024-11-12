import React, { ButtonHTMLAttributes } from 'react';
import { Button } from '../../atoms';
import { NavArrowRight } from 'iconoir-react';

export const ScrollRightBtn: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ onClick, ...rest }) => {
  return (
    <div className="absolute top-1/2 rounded-r-full flex items-center justify-center -translate-y-1/2 -right-0.5 h-full aspect-square bg-gradient-to-l from-background from-50% to-transparent ">
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full"
        onClick={onClick}
        {...rest}
      >
        <NavArrowRight className="size-5 text-outline" />
      </Button>
    </div>
  );
};
