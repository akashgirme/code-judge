import { Button, Chip, Typography } from '@skill-street-ui/core-design';
import { useMediaQuery } from 'apps/home/features/hooks';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Menu, HalfMoon, SunLight } from 'iconoir-react';

const TopbarLinks = [
  {
    title: 'Documentation',
    href: '/',
  },
  {
    title: 'Categories',
    href: '/',
  },
  {
    title: 'Resources',
    href: '/',
  },
  {
    title: 'Partner',
    href: '/',
  },
];

export const TopbarOptions = () => {
  const isWebView = useMediaQuery('(min-width:1030px)');
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <>
      {isWebView ? (
        <div className="lg:flex items-center gap-x-6 h-9 hidden">
          {TopbarLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <Typography
                fontFamily={'inter'}
                fontSize="body-s"
                fontWeight={'medium'}
                className="hover:underline"
              >
                {link.title}
              </Typography>
            </Link>
          ))}
          <Chip size={'sm'} variant={'primary-btn'} state="active">
            Contact Us
          </Chip>
          <Button onClick={toggleTheme} variant={'ghost'} size={'icon'}>
            {theme === 'dark' ? (
              <SunLight className="size-6 fill-yellow-500 text-yellow-500" />
            ) : (
              <HalfMoon className="size-6 fill-surface-on text-surface-on" />
            )}
          </Button>
        </div>
      ) : (
        <Button
          size={'icon'}
          rounded={'full'}
          variant={'ghost'}
          className="lg:hidden"
        >
          <Menu className="size-6" />
        </Button>
      )}
    </>
  );
};
