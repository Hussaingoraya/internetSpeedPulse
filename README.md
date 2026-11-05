# InternetSpeed Pulse

Next.js App Router, React and TypeScript. Pages are pre-rendered with Next.js, then packaged with a small Worker serving the generated files and first-party measurement endpoints. The existing workspace project is preserved.

## Run

```sh
npm ci
npm run build
npm run preview
```

Preview: http://localhost:3005. `npm run dev` offers Next.js UI development, but `/api/` endpoints require the Worker preview. `next start` is not used for the export. Build creates `out/`, then embeds those files in Worker ESM at `dist/server/index.js`. Sites retains the project ID in `.openai/hosting.json`; static configuration was removed because the site now has runtime endpoints. No database or account service is required.

Copy `.env.example` to `.env.local` to set a canonical public domain and genuine support email, then rebuild. The current Sites audience remains private; Google cannot review an owner-private site for AdSense. Use a publicly accessible owned domain or explicitly configure public access before applying.

## Features

- Actual server selection: Cloudflare’s speed.cloudflare.com endpoint or this website’s first-party edge endpoint. Both use automatic routing. No fixed city or Ookla server access is claimed.
- Single mode: one request at a time. Multi: four parallel HTTP requests; the browser controls the underlying transport connections.
- Download, upload, idle HTTP latency and jitter. No packet loss, ICMP ping or loaded-latency claim.
- Optional connection detection: hosting-supplied IP, ASN organization and edge metadata. IP is hidden initially. Missing fields are shown unavailable. No external IP lookup vendor is used.
- Opt-in ten-result local history, CSV export and clear controls. IP and provider details are never saved. CSV exports always use Mbps.
- Light/dark themes, Mbps/MB/s, remembered mode/server preferences, English and Arabic test controls. Guides and policy pages remain English.
- Four-column expandable navigation; a Download menu for CSV exports and browser printing; glossary, FAQ, help, settings, server directory and two calculators.
- No sign-in, accounts or cross-device synchronization, per the user’s preference.

## Measurement method

A 10 KB warm-up precedes eight empty-download probes. Latency is their median elapsed HTTP request time, including browser/server overhead. Jitter is the average absolute difference between consecutive samples. Download and upload each use two rounds at 100 KB, 1 MB and 8 MB total payload. A round taking more than 1.5 seconds skips larger sizes. Maximum synthetic payload is 36.41 MB plus overhead in either mode. Multi divides each round into four requests. Throughput uses total bits divided by shared wall-clock duration. The result is the median of two rounds at the largest completed size. Per-request timeout: 12 seconds. Overall timeout: 60 seconds.

Stop aborts active requests. Failed/stopped tests cannot be saved or exported. Small transfers can underestimate fast links. Localhost tests exercise the implementation and do not measure an internet line; use the final domain for meaningful results.

Worker endpoints cap each download/upload at 8 MB, reject foreign-origin browser uploads, stream downloads with no-cache/no-transform headers, and read uploads incrementally without persisting them. Consider infrastructure usage controls before a high-traffic public launch. The alternate endpoint is available if a browser or network blocks Cloudflare requests.

## Content and launch

23 content pages, a 404, sitemap.xml and robots.txt. Unique metadata/canonicals, Article and WebSite structured data, crawlable HTML and internal links. The supplied daily worldwide query snapshot informed useful topics; normalized interest values are not absolute search volumes. No ranking or indexing guarantees.

Before AdSense, set the actual publisher identity, public domain and contact email, review content and disclosures, verify Search Console, submit the sitemap and add only genuine Google publisher/verification details. Add the exact ads.txt entry supplied by Google if required. Advertising is disabled. Configure any required certified consent platform and actual vendor disclosures before enabling ads. Google decides approval.

The contact tool copies a prepared message without claiming delivery if no email is configured; otherwise it opens the mail application. Inter loads from Google Fonts, disclosed in Privacy.

## Verification

`npm run build` compiles, validates TypeScript, generates pages and packages Worker ESM. `npm test` covers byte counts, payload limits, cross-origin upload rejection, per-request metadata, MIME/caching and 404 behavior. `node scripts/check-export.mjs` checks metadata, headings, JSON-LD, internal links and crawler files. Browser checks should cover both endpoints, Single/Multi, cancellation, preferences, modal focus, history/export and mobile layouts.

Official references: https://support.google.com/adsense/answer/7299563 , https://support.google.com/adsense/answer/1348695 and https://www.cloudflare.com/privacypolicy/ .
