import { notFound } from 'next/navigation';
import { projects } from '@/content/entries';
import { EntryDetail } from '@/components/entry-detail';
import { pageMetadata } from '@/lib/metadata';
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const entry = projects.find(item => item.slug === slug); if (!entry) notFound(); return pageMetadata(entry.title, entry.summary, `/projects/${slug}/`); }
export default async function Project({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const entry = projects.find(item => item.slug === slug); if (!entry) notFound(); return <EntryDetail entry={entry} kind="projects" />; }
