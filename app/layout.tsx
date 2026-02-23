import type { Metadata } from 'next';
import { Nunito_Sans, Inter } from 'next/font/google';
import './globals.css';

const nunito = Nunito_Sans({
  variable: '--font-nunito-sans',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Подорожники',
  description: 'Платформа для мандрівників: переглядай історії інших та діліться своїми пригодами.',
  keywords: ['nextjs', 'react', 'social network', 'travel stories'],
  openGraph: {
    title: 'Подорожники',
    description: 'Платформа для мандрівників: переглядай історії інших та діліться своїми пригодами.',
    siteName: 'Подорожники',
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: [
      {
        // TODO: add preview.png
        url: `${process.env.NEXT_PUBLIC_APP_URL}/preview.png`,
        width: 1200,
        height: 630,
        alt: 'Podorozhnyky preview image'
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Подорожники',
    description: 'Платформа для мандрівників: переглядай історії інших та діліться своїми пригодами.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/preview.png`],
  }
};

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import QueryProvider from './providers/QueryProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${inter.variable}`}>
        <QueryProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
