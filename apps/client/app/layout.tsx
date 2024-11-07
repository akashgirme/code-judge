'use client';
import { Inter, Roboto_Flex } from 'next/font/google';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'sonner';
import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: {
//     default: 'Judge.Codes',
//     template: `%s | Judge.Codes`,
//   },
// };
// TODO: Layout should be Server Component in order to use `export metadata`...

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
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <NextThemesProvider
                attribute="class"
                defaultTheme="light"
                // enableSystem
                disableTransitionOnChange
              >
                <main className="flex-1">
                  {/* <Header /> */}
                  {children}
                  {/* <Footer /> */}
                  {/* TODO: Customise Sonner Styling */}
                </main>
                <Toaster />
              </NextThemesProvider>
            </PersistGate>
          </Provider>
        </body>
      </html>
    </>
  );
}
