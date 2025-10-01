import { Inter, Roboto_Flex } from 'next/font/google';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { AppBar } from '../components';
import StoreProvider from './store-provider';

export const metadata: Metadata = {
  title: {
    default: 'Algo Forge',
    template: `%s | Algo Forge`,
  },
};

const robotoFont = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html
        lang="en"
        style={{
          height: '-webkit-fill-available',
        }}
        className={` ${inter.className} ${robotoFont.variable} ${inter.variable}`}
      >
        <body style={{ height: '-webkit-fill-available' }} className="flex flex-col ">
          <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            disableTransitionOnChange
          >
            <StoreProvider>
              <>
                <main className="flex-1">
                  <AppBar />
                  {children}
                </main>
                <Toaster />
              </>
            </StoreProvider>
          </NextThemesProvider>
        </body>
      </html>
    </>
  );
}
