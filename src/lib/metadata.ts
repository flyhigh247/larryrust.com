import type { Metadata } from 'next';
import { site } from '@/content/site';
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title: { absolute: `${title} | ${site.name}` }, description, alternates: { canonical: path }, openGraph: { title: `${title} | ${site.name}`, description, url: path, type: 'website', siteName: site.name }, twitter: { card: 'summary', title: `${title} | ${site.name}`, description } };
}
