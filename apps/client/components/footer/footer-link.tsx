import Link from 'next/link';
import { NavLink } from '../../types/NavLink';

interface FooterLinkProps {
  link: NavLink;
}
export const FooterLink: React.FC<FooterLinkProps> = ({
  link: { href, label },
}) => {
  return (
    <Link className="text-white" href={href}>
      {label}
    </Link>
  );
};
