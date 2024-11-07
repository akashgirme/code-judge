import { NavLinkGroup } from '../../types/NavLink';
import { FooterLink } from './footer-link';

interface FooterNavLinkColsProps {
  navLinkGroup: NavLinkGroup;
}

export const FooterNavLinkCols: React.FC<FooterNavLinkColsProps> = ({
  navLinkGroup: { heading, links },
}) => {
  return (
    <div className="grid grid-cols-1">
      <p className="uppercase font-bold text-lg mb-8">{heading}</p>
      <div className="grid">
        {links.map((link) => (
          <FooterLink key={link.href} link={link} />
        ))}
      </div>
    </div>
  );
};
