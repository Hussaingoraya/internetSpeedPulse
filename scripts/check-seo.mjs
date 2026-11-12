import { readFileSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const root = '.next/server/app';
const sitemap = readFileSync(`${root}/sitemap.xml.body`, 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URL');
assert(!urls.some(url => /\/(history|settings)\//.test(url)), 'Utility pages in sitemap');
const titles = new Set();
for (const url of urls) {
  const path = new URL(url).pathname;
  const html = readFileSync(`${root}/${path === '/' ? 'index' : path.slice(1, -1)}.html`, 'utf8');
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: expected one h1`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title && !titles.has(title), `${path}: missing or duplicate title`);
  // Editorial limit, not a Google ranking threshold or pixel-width guarantee.
  assert(title.replaceAll('&amp;', '&').length <= 65, `${path}: search title needs shortening`);
  titles.add(title);
  assert(html.includes(`rel="canonical" href="${url}"`), `${path}: canonical mismatch`);
  assert(/<meta name="description" content="[^"]+"/.test(html), `${path}: description missing`);
  assert(!/<meta name="robots" content="[^"]*noindex/.test(html), `${path}: noindex in sitemap`);
  assert(/<link[^>]+as="font"/.test(html), `${path}: local font preload missing`);
  assert(!html.includes('fonts.googleapis.com') && !html.includes('fonts.gstatic.com'), `${path}: external font request`);
  assert(html.includes('name="google-adsense-account" content="ca-pub-6573791611846419"'), `${path}: AdSense ownership verification missing`);
  assert(!html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'), `${path}: ad delivery must stay disabled until CMP setup`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    JSON.parse(match[1]);
  }
  if (path.startsWith('/blog/') && path !== '/blog/') {
    assert(html.includes('BreadcrumbList'), `${path}: breadcrumb markup missing`);
    assert(/hypothetical|illustrative|calculated examples?/i.test(html), `${path}: labeled example missing`);
    assert(html.includes('Sources and technical references'), `${path}: primary references missing`);
  }
}
for (const page of ['history', 'settings']) {
  assert(/<meta name="robots" content="noindex, follow"/.test(readFileSync(`${root}/${page}.html`, 'utf8')), `${page}: noindex missing`);
}
assert(readdirSync(root).some(name => name.startsWith('opengraph-image')), 'Share image route missing');
console.log(`SEO checks passed for ${urls.length} sitemap pages, utility exclusions and JSON-LD.`);
