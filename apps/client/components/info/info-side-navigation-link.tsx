'use client';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { NavLink } from '../../types/NavLink';

interface InfoSideNavigationLinkProps {
  link: NavLink;
}

export const InfoSideNavigationLink: React.FC<InfoSideNavigationLinkProps> = ({
  link: { href, label },
}) => {
  const pathname = usePathname();

  return (
    <NextLink
      className={`${pathname == href ? 'font-bold' : 'font-medium'} pl-9`}
      key={href}
      href={href}
    >
      {label}
    </NextLink>
  );
};
