# InternetSpeed Pulse

A standalone Next.js App Router website, created in its own folder so the existing workspace project is preserved. React, TypeScript, Lucide icons, custom responsive CSS and the Cloudflare speed test engine. Server-rendered at build time and exported as static HTML.

## Run

```sh
npm ci
npm run dev
npm run build
```

Development: http://localhost:3005. Production output: `out/`. Upload the entire output directory to a static host with directory-index and 404 support. No Node server is needed for the exported site. The `next start` command is not used for a static export.

## Configure before a public launch

Copy `.env.example` to `.env.local`, set your canonical HTTPS domain and genuine public contact email, then rebuild. These are build-time variables. The current Sites deployment is private by default; Google cannot review an owner-private site for AdSense. Deploy to your public domain or deliberately configure public access before applying.

The contact form opens a mail application when a contact email is configured. Without one, it explicitly offers only to copy a prepared message and sends nothing. There is no contact database or mail delivery backend.

## Pages and SEO

Home speed test; six original educational articles; guide index; about; methodology; privacy; terms; cookies and storage; disclaimer; editorial policy; contact; 404. Unique metadata and canonicals, sitemap.xml, robots.txt, WebSite and Article structured data, semantic headings, crawlable static content, internal links and responsive layouts. FAQ answers are rendered in the initial HTML. Google does not guarantee indexing or rich results.

The two supplied CSVs informed topic selection: internet speed test, check internet speed, good internet speed, speed needs, Wi-Fi, download/upload. They are one worldwide daily snapshot with normalized interest values, not absolute search volumes or durable forecasts. Irrelevant local-service queries, typo pages and duplicate keyword permutations were excluded. No affiliation with Ookla or internet providers is claimed.

## Real test behavior

The Cloudflare open-source engine makes direct browser requests to speed.cloudflare.com. The configured synthetic payload budget is about 44.4 MB plus overhead; larger transfers may be skipped. It measures download/upload throughput and idle HTTP latency/jitter, not ICMP latency, packet loss, public IP or ISP identity. Request timeout: 12 seconds; overall timeout: 60 seconds. Failed or missing measurements are labeled incomplete. Short tests may underestimate fast links.

Cloudflare documents collection of completed measurements for aggregate insights. This is disclosed before testing and in privacy/methodology pages. Browser history is opt-in, capped at ten completed results, and can be erased. Storage failures do not prevent testing. Stop pauses active measurements and does not save partial results. A production browser/network test is still needed if local testing cannot reach the external provider.

## Advertising readiness

No AdSense scripts, fake publisher IDs, ads.txt claims, tracking analytics or pretend consent platform are included. Approval is a Google review decision. Before applying:

- Use a publicly accessible owned domain with HTTPS and correct canonical URLs.
- Configure your real support email and identify the actual publisher/operator in About and Privacy.
- Review all original content for accuracy, ownership and fit for your audience; add useful content as the site develops.
- Verify links, measurements and the mobile experience on the final domain.
- Verify the site in Search Console and submit the generated sitemap.
- Add only your real AdSense publisher ID and verification instructions when available. Add the exact ads.txt entry Google supplies, if required.
- Before enabling advertising, configure any required Google-certified consent management platform for the regions served, and update the privacy notice for actual vendors and processing. A simple cookie banner is not a substitute.
- Keep ads away from test controls and do not encourage ad clicks or manufacture traffic.

Official references: https://support.google.com/adsense/answer/7299563 and https://support.google.com/adsense/answer/1348695 . Technical engine: https://github.com/cloudflare/speedtest . Inter loads from Google Fonts; consider self-hosting the font files for a production privacy/performance review.

## Validation

`npm run build` performs compilation, TypeScript validation and static page generation. `node scripts/check-export.mjs` checks exported metadata, local link destinations, one h1 per content page, structured data JSON and sitemap/robots presence. These checks do not establish Google approval or measure real-world Core Web Vitals.

