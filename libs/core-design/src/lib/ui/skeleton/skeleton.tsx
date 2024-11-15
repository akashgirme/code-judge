import { cn } from '../../utils';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  animation?: 'skeleton-loading' | 'animate-pulse';
};

function Skeleton({
  className,
  animation = 'skeleton-loading',
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn('rounded-md bg-secondary', className, animation)}
      {...props}
    />
  );
}

export { Skeleton };
