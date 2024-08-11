import { LogoWithName } from 'apps/home/components';
import { TopbarOptions } from './topbar-options';

export const BlogPageTopbar = () => {
  return (
    <header className="w-full sticky top-0 bg-background flex items-center justify-between px-4 lg:px-18 py-3 border-b border-body-tertiary  z-50">
      <LogoWithName />
      <TopbarOptions />
    </header>
  );
};
