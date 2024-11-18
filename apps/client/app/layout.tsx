'use client';
import { Inter, Roboto_Flex } from 'next/font/google';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { AppBar } from '../components';

//Layout should be Server Component in order to use `export metadata`...
// export const metadata: Metadata = {
//   title: {
//     default: 'Code Judge',
//     template: `%s | Code Judge`,
//   },
// };

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
                enableSystem={true}
                disableTransitionOnChange
              >
                <main className="flex-1">
                  <AppBar />
                  {children}
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
