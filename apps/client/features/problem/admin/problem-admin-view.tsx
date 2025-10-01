import { TextLinkButton } from '@algo-forge/core-design';
import Link from 'next/link';

export const ProblemAdminView = () => {
  return (
    <div className="flex flex-col gap-4">
      <TextLinkButton component={Link} href="/admin/problems/all">
        All Problems
      </TextLinkButton>
      <TextLinkButton component={Link} href="/admin/problems/tags">
        All Tags
      </TextLinkButton>
    </div>
  );
};
