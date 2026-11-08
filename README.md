# InternetSpeed Pulse

Next.js App Router, React and TypeScript. Pages are pre-rendered with Next.js. Native route handlers serve the first-party measurement endpoints at runtime.

## Run

```sh
npm ci
npm run build
npm run preview
```

Preview: http://localhost:3005. Both development and production servers include the API endpoints. Build output is `.next/`. For Hostinger, select Next.js and Node.js 22, build command `npm run build`, output `.next`, and start command `npm start` if requested. Leave the entry file blank. The legacy Worker packaging scripts are not used by this build. No database or account service is required.

The default canonical domain is `https://internetspeedpulse.online`. Set `NEXT_PUBLIC_SITE_URL` before building to override it. Copy `.env.example` to `.env.local` for local configuration and set a genuine support email before launch. The site must be publicly accessible for AdSense review.

## Features

- Animated SVG speedometer: live-value needle easing, cyan download / purple upload arcs, connecting sweep, adaptive scale and a per-device motion toggle. Animation is enabled by default, with a per-device Reduce motion control. Decorative loading motion never supplies a fabricated numeric measurement.

- Actual server selection: Cloudflare’s speed.cloudflare.com endpoint or this website’s first-party hosting endpoint. Cloudflare uses automatic edge routing; the first-party destination is the Hostinger website server. No fixed city or Ookla server access is claimed.
- Single mode: one request at a time. Multi: four parallel HTTP requests; the browser controls the underlying transport connections.
- Download, upload, idle HTTP latency and jitter. Additional median loaded HTTP latency during transfers. No packet loss or ICMP ping claim.
- Provider metadata: hosting-supplied IP, ASN organization and edge metadata when available. The current Hostinger deployment does not supply these fields. IP is hidden initially. Missing fields are shown unavailable. No external IP lookup vendor is used.
- Opt-in ten-result local history, CSV export and clear controls. IP and provider details are never saved. CSV exports always use Mbps.
- Light/dark themes, Mbps/MB/s, remembered mode/server preferences, English and Arabic test controls. Guides and policy pages remain English.
- Four-column expandable navigation; a Download menu for CSV exports and browser printing; glossary, FAQ, help, settings, server directory and two calculators.
- No sign-in, accounts or cross-device synchronization, per the user’s preference.

## Measurement method

LibreSpeed supplies the continuous-transfer measurement worker. It is pinned to the commit recorded in public/vendor/librespeed/VERSION.txt, with the original source, modified source, LGPLv3 and GPLv3 texts distributed alongside. Modifications reject unsuccessful download/ping HTTP responses, expose diagnostic status and omit unnecessary Content-Encoding request headers. Telemetry and automatic IP lookup are disabled. The integration uses no overhead multiplier (factor 1.0).

Automatic selection warms and probes the two configured endpoints, choosing their lowest median idle latency. Each direction measures for twelve seconds after a 1.5-second download or 3-second upload warm-up. Single uses one request stream; Multi uses four. Download payload size is preflight-adapted between 1 and 8 MB; upload blobs are 4 MiB. Twelve idle latency probes produce the lowest eligible response time using browser timing when available. Jitter uses LibreSpeed’s weighted variation. Separate once-per-second probes supply median loaded HTTP latency; unavailable samples remain null. Overall timeout is 75 seconds. A 512 MB requested-payload budget per direction includes warm-up and marks an oversized run incomplete. Payload can approach 1.024 GB plus preflight and network overhead; billed traffic is not guaranteed by this safeguard. Each XHR has a 15-second timeout.

New results carry engine ID librespeed-bounded-v2 and loaded-latency fields. Older sustained results are labeled Earlier sustained v1; fixed-payload results remain Legacy quick test. Engine changes are not calibrated to match Ookla. A Hostinger website server, public Cloudflare edge and ISP-hosted Etisalat server have different routes and overhead. No equivalent-accuracy certification is claimed.

Stop aborts active requests. Failed/stopped tests cannot be saved or exported. Small transfers can underestimate fast links. Localhost tests exercise the implementation and do not measure an internet line; use the final domain for meaningful results.

Worker endpoints cap each download at 8 MB and each upload at 8 MB, reject foreign-origin browser uploads, stream downloads with no-cache/no-transform headers, and read uploads incrementally without persisting them. Consider infrastructure usage controls before a high-traffic public launch. The alternate endpoint is available if a browser or network blocks Cloudflare requests.

## Content and launch

21 indexable content destinations, two noindex utility pages, a 404, sitemap.xml and robots.txt. Unique metadata/canonicals, Article and WebSite structured data, crawlable HTML and internal links. The supplied daily worldwide query snapshot informed useful topics; normalized interest values are not absolute search volumes. No ranking or indexing guarantees.

Before AdSense, set the actual publisher identity, public domain and contact email, review content and disclosures, verify Search Console, submit the sitemap and add only genuine Google publisher/verification details. Add the exact ads.txt entry supplied by Google if required. Advertising is disabled. Configure any required certified consent platform and actual vendor disclosures before enabling ads. Google decides approval.

The contact tool copies a prepared message without claiming delivery if no email is configured; otherwise it opens the mail application. Inter is served locally through next/font, with its license in app/fonts.

## Verification

`npm run build` compiles, validates TypeScript and generates production pages and API routes. `npm test` covers byte counts, payload limits, cross-origin upload rejection, per-request metadata, MIME/caching and 404 behavior. The legacy `scripts/check-export.mjs` checker requires a static export and does not validate this native Next.js build. Browser checks should cover both endpoints, Single/Multi, cancellation, preferences, modal focus, history/export and mobile layouts.

Official references: https://support.google.com/adsense/answer/7299563 , https://support.google.com/adsense/answer/1348695 and https://www.cloudflare.com/privacypolicy/ .

## SEO validation

After `npm run build`, run `node scripts/check-seo.mjs` to verify unique titles, descriptions, canonical URLs, one H1 per sitemap page, parseable JSON-LD and utility-page indexing rules. The sitemap contains 21 public content destinations; history and settings remain accessible but use noindex/follow. Guides include breadcrumb structured data, publisher attribution, worked examples and modification dates. A generated PNG supplies a site-wide social preview.

These checks do not measure real-user Core Web Vitals, search ranking, backlinks or Google indexing. Monitor those independently after deployment. Worked examples are illustrative calculations, not claimed field measurements.

## November 8 audit and operating safeguards

See [docs/audit-2026-11-08.md](docs/audit-2026-11-08.md) for reviewed sources, content changes, verification scope, ad/CMP activation steps and a precise real-world evidence collection protocol.

Ad delivery is disabled pending an actual published certified CMP. The AdSense account meta tag and ads.txt remain for ownership verification. The dormant ad placements make no network requests. Do not reintroduce the delivery script or activate Auto ads until consent behavior and placement have been tested for the audience.

First-party endpoints reserve payload against a default 10 GB/hour per-process allowance. Set runtime MEASUREMENT_HOURLY_BYTES to a nonnegative integer to change it, or MEASUREMENT_ENABLED=false to disable first-party transfers. Restarts/multiple processes are separate; use Hostinger/WAF controls and monitor account limits. These are not distributed or monthly cost guarantees. API traffic is uncached, size bounded and upload reads time out after 15 seconds.

Engine ID librespeed-bounded-v2 distinguishes changed limits from earlier tests. Keep the same server, mode and version for comparisons. Local browser QA verifies behavior, not an ISP's line speed. Run npm test, npm run build, and node scripts/check-seo.mjs after changes.
