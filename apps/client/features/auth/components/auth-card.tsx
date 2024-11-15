import { Card, cn } from '@code-judge/core-design';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}
export const AuthCard: React.FC<AuthCardProps> = ({ children, className }) => {
  return (
    <Card
      className={cn(
        'text-center bg-slate-900 text-white w-[560px] rounded-lg px-14 pt-10 pb-6',
        className
      )}
    >
      {children}
    </Card>
  );
};
