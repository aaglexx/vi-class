import type { Metadata, Viewport } from 'next';
import { Onest } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileCta } from '@/components/layout/MobileCta';
import { site } from '@/content/site';
import './globals.css';

const display = Onest({
  subsets: ['cyrillic', 'latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Onest({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: 'website',
    locale: 'ru_RU',
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#f2f2f2',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable}`}>
      <body>
        <noscript>
          <style>{`[data-hero-line],[data-hero-fade],[data-step],[data-card],[data-band]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#main" className="sr-only">Перейти к содержимому</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
