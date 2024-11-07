import { Logo } from '../logo';
import { AboutUsLinks, CommunityLinks, PolicyLinks, SupportLinks } from '../nav-links';
import { FooterNavLinkCols } from './footer-nav-link-cols';
import { SocialIconsBar } from '../social-icons';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@code-judge/core-design';

export const Footer = () => {
  const { setTheme } = useTheme();
  return (
    <div className="px-8 pb-12 z-50 pt-14 bg-[#292B2F]">
      <Button onClick={() => setTheme('light')}>Light Mode</Button>
      <Button onClick={() => setTheme('dark')}>Dark Mode</Button>

      <div className="grid lg:grid-cols-6 grid-cols-2 gap-4">
        <div className="col-span-2">
          <Logo />
          <p className="text-xl mt-28 mb-2.5">Follow us on</p>
          <SocialIconsBar />
        </div>
        <FooterNavLinkCols navLinkGroup={AboutUsLinks} />
        <FooterNavLinkCols navLinkGroup={PolicyLinks} />
        <FooterNavLinkCols navLinkGroup={CommunityLinks} />
        <FooterNavLinkCols navLinkGroup={SupportLinks} />
      </div>

      <p className="text-center mt-16">
        Copyrights 2023 ©
        <Link href="/" className="text-cn-primary">
          Skillstreet.io
        </Link>
        . All rights reserved
      </p>
    </div>
  );
};
