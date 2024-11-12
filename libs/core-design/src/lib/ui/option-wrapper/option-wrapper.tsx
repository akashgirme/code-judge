import { Skeleton, Typography, cn } from '@code-judge/core-design';
import { ReactNode } from 'react';
import { NavArrowRight } from 'iconoir-react';

export interface OptionWrapperProps {
  title: string;
  Icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const OptionWrapper = ({
  title,
  Icon,
  onClick,
  className,
}: OptionWrapperProps) => (
  <div
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    className={cn(
      'flex w-full py-3 px-4 gap-3 items-center hover:bg-surface-container rounded-xl',
      className
    )}
  >
    <div className="p-2 rounded-lg border border-surface-on ">{Icon}</div>
    <Typography
      fontFamily={'helvetica'}
      fontWeight={'semibold'}
      fontSize="body-s"
      className="flex-1"
    >
      {title}
    </Typography>
    <NavArrowRight className="w-5 h-5 text-outline" />
  </div>
);

OptionWrapper.Skeleton = function OptionWrapperSkeleton() {
  return (
    <div className={'w-full py-2 px-4 flex flex-col gap-2'}>
      <Skeleton className="rounded-lg h-8" style={{ width: '86px' }} />
      <Skeleton className="rounded-lg h-6" style={{ width: '208px' }} />
    </div>
  );
};
