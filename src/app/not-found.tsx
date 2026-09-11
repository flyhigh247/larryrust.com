import Link from 'next/link';
export default function NotFound() { return <div className="container page-intro section-bottom"><p className="eyebrow">404 / NOT FOUND</p><h1>This page isn’t here.</h1><p className="intro-copy">It may have moved, or the address may be incorrect.</p><Link href="/" className="button button-primary">Back to home →</Link></div>; }
