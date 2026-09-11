# Larry Rust — application-security portfolio

A maintainable Next.js App Router, TypeScript, and Tailwind CSS portfolio for `larryrust.com`. Pages are statically exported: no database, authentication, administrative app, server secrets, or paid runtime is required.

## Local development

Install Node.js 20.9 or newer (an active LTS release is recommended) and pnpm. From `C:\larryrust.com`:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Next.js. For validation and a production preview:

```sh
pnpm typecheck
pnpm build
pnpm start
```

`pnpm build` exports the complete site to `out/`. `pnpm start` serves that static export; it does not run a Next.js application server. The development server binds to localhost. If using npm instead, generate and commit a package-lock and consistently use that package manager; do not maintain competing lockfiles.

## Project structure

```text
src/app/                     App Router pages and global design tokens
  page.tsx                   Homepage
  about/, projects/          About and project listing
  projects/[slug]/           Generated project detail pages
  research/, research/[slug]/ Research listing and detail pages
  resume/                    Resume shell, ready for a PDF
  robots.ts, sitemap.ts      Statically generated search-engine files
  not-found.tsx              Custom 404
src/components/              Header, footer, cards, status, detail layout
src/content/site.ts          Identity, domain, social links, resume URL
src/content/entries.ts       Typed project and research records
src/lib/metadata.ts          Per-page canonical and social metadata
public/                      Files copied into the export unchanged
next.config.ts               Static export and trailing slash routing
```

The only client component is the header, which marks the current navigation item. Content is rendered at build time. Styling is centralized in `globals.css` with Tailwind v4 and named, reusable component classes. Typography uses local system fonts to avoid third-party font requests. All five navigation destinations remain visible on small screens without a JavaScript menu.

## Add a project or research entry

Add an `Entry` object to `projects` or `research` in `src/content/entries.ts`. There is no CMS or separate route file to maintain. Listings, detail pages, and the sitemap pick up the entry automatically on the next build.

```ts
{
  slug: 'your-project-slug',
  title: 'Your project title',
  category: 'APPLICATION SECURITY',
  status: 'Planned', // Planned | In progress | Published
  summary: 'A concise, factual description of the scope.',
  skills: ['API security', 'Authorization'],
  sections: [
    { heading: 'Scope', paragraphs: ['Describe the actual scope and assumptions.'] },
    { heading: 'Methodology', paragraphs: ['Describe proposed or completed steps accurately.'] },
  ],
  // Add only once these resources exist:
  // github: 'https://github.com/flyhigh247/actual-repository',
  // evidence: [{ label: 'Test results', href: 'https://github.com/...' }],
  // publishedAt: 'YYYY-MM-DD',
  // updatedAt: 'YYYY-MM-DD',
}
```

Use unique lowercase, hyphenated slugs and preserve them after publication. Text is rendered as escaped React content, not raw HTML. Evidence URLs must use HTTPS. A `Published` record must have a publication date and at least one evidence link; the build validates these requirements. Add sections for architecture, threat model, test methodology, findings, remediation, retesting, and limitations when appropriate. Review status labels as work changes. Update dates only when content changes.

The initial three projects and two research entries are illustrative **planned directions**. Their outline pages explicitly state that nothing has been completed. Replace or remove them to match the real roadmap. Category labels and technology tags express intended scope, not credentials. The homepage shows the project collection; once it grows, replace `projects.map` in the homepage with a curated subset or `projects.slice(0, 3)`.

## Social profiles and resume

Edit `src/content/site.ts`. GitHub is configured to `https://github.com/flyhigh247`; LinkedIn is configured to `https://www.linkedin.com/in/larryrust` based on the supplied profile. A missing profile uses a non-clickable pending label rather than a fabricated URL.

To add the resume:

1. Place the reviewed PDF at `public/larry-rust-resume.pdf`.
2. Set `site.resume` to `/larry-rust-resume.pdf`.
3. Replace the placeholder background sections in `src/app/resume/page.tsx` with verified details.
4. Rebuild and confirm the download opens the correct PDF.

Until then, the page shows a truthful availability notice and no broken download button.

## Deploy to Namecheap

The `out/` directory can be hosted as static files. For a Namecheap shared-hosting plan with cPanel:

1. Run `pnpm build` locally.
2. In cPanel, check the document root assigned to `larryrust.com` under Domains. The primary domain often uses `public_html`; an addon domain can use a different directory.
3. Back up the existing site before replacing anything.
4. Upload the **contents** of `out/` into that document root, including `_next/`, each route directory, `favicon.svg`, `robots.txt`, `sitemap.xml`, and `404.html`. Do not upload the parent `out` folder as a nested directory.
5. Enable the domain’s SSL certificate and HTTPS using the hosting controls. Confirm the domain’s DNS points at the correct hosting account.
6. Open `/`, `/about/`, `/projects/`, a project detail URL, `/research/`, and `/resume/` directly, then refresh each. Test a missing URL as well.

Next.js emits directory `index.html` files because `trailingSlash` is enabled. There is no SPA fallback rewrite: unknown paths should return a genuine 404. For Apache hosting, this optional `.htaccess` in the domain document root selects the custom error page:

```apache
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html
```

Do not overwrite an existing `.htaccess` without reviewing its rules. Server response headers are configured at the host because static exports do not run Next.js headers logic. Consider `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`. Tailor and test a Content Security Policy against the actual Next.js export before enforcing it. Keep domain redirects at the hosting layer and preserve route paths.

Other Namecheap plans may have different upload controls; the deployment artifact is still `out/`. No Namecheap login, DNS, SSL, or existing live-site configuration is modified by this project.

## SEO and accessibility

Every route has a unique title, description, canonical URL, and text-only Open Graph/Twitter metadata. The canonical origin is `https://larryrust.com`; change `site.url` if the primary domain changes. There is no invented social-preview image. Sitemap entries mirror the generated routes. A private staging deployment is not the public launch of the domain.

The interface uses semantic landmarks, one h1 per page, a keyboard skip link, visible focus states, current-page navigation, readable contrast, wrapping layouts, and reduced-motion support. The resume supports a simplified print layout. Before launch, check keyboard navigation, mobile widths, zoom, external profile links, and the eventual resume PDF.

## Maintenance

Keep the pnpm lockfile committed and use `pnpm install --frozen-lockfile` in CI. Run typecheck and build after content or dependency changes. Review dependency security updates regularly. No credentials belong in this repository; `.env` files are ignored. Static export means updates require a rebuild and upload. Keep screenshots, test output, caches, and generated build files out of source control.
`pnpm dev` and `pnpm build` use the supported Webpack bundler for compatibility with this Windows environment. The initial production build and TypeScript check passed.
