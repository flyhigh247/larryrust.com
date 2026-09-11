import { notFound } from 'next/navigation';
import { research } from '@/content/entries';
import { EntryDetail } from '@/components/entry-detail';
import { pageMetadata } from '@/lib/metadata';
export const dynamicParams = false;
export function generateStaticParams() { return research.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const entry = research.find(item => item.slug === slug); if (!entry) notFound(); return pageMetadata(entry.title, entry.summary, `/research/${slug}/`); }
export default async function ResearchEntry({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const entry = research.find(item => item.slug === slug); if (!entry) notFound(); return <EntryDetail entry={entry} kind="research" />; }
