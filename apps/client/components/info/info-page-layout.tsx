import { NavLinkGroup } from '../../types/NavLink';
import { InfoSideNavigation } from './info-side-navigation';

interface InfoPageLayoutProps {
  children: React.ReactNode;
  sideNavLinkGroup: NavLinkGroup;
}

export const InfoPageLayout: React.FC<InfoPageLayoutProps> = ({
  children,
  sideNavLinkGroup,
}) => {
  return (
    <div className="px-5 py-9 lg:px-9 grid grid-cols-5 gap-5">
      <div className="col-span-5 xl:col-span-4 lg:col-span-3">{children}</div>
      <div className="col-span-5 xl:col-span-1 lg:col-span-2">
        <InfoSideNavigation navLinkGroup={sideNavLinkGroup} />
      </div>
    </div>
  );
};
