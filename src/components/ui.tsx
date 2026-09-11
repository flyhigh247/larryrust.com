import Link from 'next/link';
import type { ReactNode } from 'react';
import { site } from '@/content/site';
import type { Entry } from '@/content/entries';

export function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>; }
export function SocialLinks() {
  return <ul className="social-links">{[['GitHub', site.github], ['LinkedIn', site.linkedin]].map(([label, url]) => <li key={label}>{url ? <a href={url} rel="me">{label} <Arrow diagonal /></a> : <span>{label} <small>link pending</small></span>}</li>)}</ul>;
}
export function Footer() { return <footer className="site-footer"><div className="container footer-inner"><div><Link href="/" className="footer-name">Larry Rust<span className="accent">.</span></Link><p>Learning in depth. Documenting the work.</p></div><SocialLinks /><p className="copyright">© {new Date().getFullYear()} Larry Rust</p></div></footer>; }
export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="intro-copy">{children}</div></div>;
}
export function Status({ status }: { status: Entry['status'] }) { return <span className={`status status-${status.toLowerCase().replace(' ', '-')}`}>{status}</span>; }
export function EntryCard({ entry, kind = 'projects' }: { entry: Entry; kind?: 'projects' | 'research' }) {
  return <article className="entry-card"><div className="card-top"><span className="eyebrow">{entry.category}</span><Status status={entry.status} /></div><h3><Link href={`/${kind}/${entry.slug}/`}>{entry.title}</Link></h3><p className="card-summary">{entry.summary}</p><ul className="tags" aria-label="Technologies and skills">{entry.skills.map(skill => <li key={skill}>{skill}</li>)}</ul><div className="card-links"><Link href={`/${kind}/${entry.slug}/`}>{entry.status === 'Planned' ? 'View outline' : kind === 'projects' ? 'Read case study' : 'Read entry'} <Arrow /></Link>{entry.github ? <a href={entry.github}>GitHub <Arrow diagonal /></a> : <span className="muted-label">{kind === 'projects' ? 'Repository forthcoming' : 'Research forthcoming'}</span>}</div></article>;
}
