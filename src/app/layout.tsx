import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import '@/styles/tailwind.css';
import StoreProvider from '@/store/store-provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'highbridge',
  description: 'highbridge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class">
        <StoreProvider>
          <body>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  marginTop: '40px',
                },
              }}
            />
            <NextTopLoader
              color="#000000"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={2000}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            />
            {children}
          </body>
        </StoreProvider>
      </ThemeProvider>
    </html>
  );
}
