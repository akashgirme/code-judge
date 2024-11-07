import { TextLinkButton } from '@code-judge/core-design';
import Link from 'next/link';

export const AdminDashboardView = () => {
  return (
    <div className="flex flex-col gap-6">
      <TextLinkButton component={Link} href="/admin/problems">
        Problems
      </TextLinkButton>
      <TextLinkButton component={Link} href="/admin/users">
        Users
      </TextLinkButton>
    </div>
  );
};
