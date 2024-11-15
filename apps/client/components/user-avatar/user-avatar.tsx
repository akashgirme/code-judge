'use client';
import { Avatar, AvatarFallback, Typography, cn } from '@code-judge/core-design';
import { useAuth } from 'apps/client/features/auth';

interface UserAvatarProps {
  variant?: 'circle' | 'square';
  imgWidth?: number;
  imgHeight?: number;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  variant,
  imgHeight,
  imgWidth,
  className,
}) => {
  const { user } = useAuth();
  const userInitials = `${user?.firstName?.[0] || ''}`;
  return (
    <Avatar
      style={{
        width: `${imgWidth || 40}px`,
        height: `${imgHeight || 40}px`,
      }}
      variant={variant}
      className={cn('my-1', className)}
    >
      <AvatarFallback
        style={{
          width: `${imgWidth || 40}px`,
          height: `${imgHeight || 40}px`,
        }}
        variant={variant}
      >
        <Typography
          fontFamily={'helvetica'}
          fontWeight={'medium'}
          style={{
            fontSize: imgHeight ? `${0.4 * imgHeight}px` : undefined,
          }}
        >
          {userInitials}
        </Typography>
      </AvatarFallback>
    </Avatar>
  );
};
