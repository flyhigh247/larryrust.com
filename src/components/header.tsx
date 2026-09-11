'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/content/site';

export function Header() {
  const pathname = usePathname();
  return <header className="site-header">
    <div className="container header-inner">
      <Link href="/" className="brand" aria-label="Larry Rust home"><span className="monogram" aria-hidden="true">lr<span>.</span></span><span>Larry Rust<span className="brand-sub">APPLICATION SECURITY</span></span></Link>
      <nav aria-label="Primary navigation"><ul className="nav-list">{navigation.map(item => {
        const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href.replace(/\/$/, ''));
        return <li key={item.href}><Link href={item.href} aria-current={active ? 'page' : undefined}>{item.label}</Link></li>;
      })}</ul></nav>
    </div>
  </header>;
}
