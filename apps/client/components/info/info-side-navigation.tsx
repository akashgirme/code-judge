import { NavLinkGroup } from '../../types/NavLink';
import { InfoSideNavigationLink } from './info-side-navigation-link';
import { FC } from 'react';

interface InfoSideNavigationProps {
  navLinkGroup: NavLinkGroup;
}

export const InfoSideNavigation: FC<InfoSideNavigationProps> = ({
  navLinkGroup: { links },
}) => {
  return (
    <div className="h-96 bg-cn-primary text-[#2C2C2C] flex flex-col justify-around rounded-sm mt-32">
      {links.map((link) => (
        <InfoSideNavigationLink key={link.href} link={link} />
      ))}
    </div>
  );
};
