import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import '@/styles/tailwind.css';
import StoreProvider from '@/store/store-provider';

const inter = Inter({ subsets: ['latin'] });

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
          <body className={inter.className}>
            <Toaster position="top-right" />
            <NextTopLoader
              color="#89FF9FCD"
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
