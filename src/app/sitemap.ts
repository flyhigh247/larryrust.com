import type { MetadataRoute } from 'next';
import { site, navigation } from '@/content/site';
import { projects, research } from '@/content/entries';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { return [...navigation.map(item => ({ url: `${site.url}${item.href}` })), ...projects.map(entry => ({ url: `${site.url}/projects/${entry.slug}/`, ...(entry.updatedAt ? { lastModified: entry.updatedAt } : {}) })), ...research.map(entry => ({ url: `${site.url}/research/${entry.slug}/`, ...(entry.updatedAt ? { lastModified: entry.updatedAt } : {}) }))]; }
