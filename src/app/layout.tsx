import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/ui';
import { site } from '@/content/site';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: { default: 'Larry Rust | Application Security', template: '%s | Larry Rust' },
  description: site.description, applicationName: 'Larry Rust Portfolio',
  icons: { icon: '/favicon.svg' }, robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a href="#main" className="skip-link">Skip to content</a><Header /><main id="main" tabIndex={-1}>{children}</main><Footer /></body></html>;
}
