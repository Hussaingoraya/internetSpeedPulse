import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('out');
let pages=0,links=0;const failures=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory()){if(!entry.name.startsWith('_') && entry.name!=='404')walk(file);}else if(entry.name==='index.html'){pages++;const html=fs.readFileSync(file,'utf8');for(const [label,re] of [['title',/<title>[^<]+<\/title>/],['description',/<meta name="description" content="[^"]+"/],['canonical',/<link rel="canonical" href="https:\/\//]])if(!re.test(html))failures.push(`${file}: missing ${label}`);if((html.match(/<h1[ >]/g)||[]).length!==1)failures.push(`${file}: expected one h1`);for(const match of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){const href=match[1];if(href.startsWith('/_next/'))continue;links++;const target=path.join(root,decodeURIComponent(href));if(!fs.existsSync(target))failures.push(`${file}: broken link ${href}`);}for(const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)){try{JSON.parse(match[1]);}catch{failures.push(`${file}: invalid structured data`);}}}}}
walk(root);for(const file of ['sitemap.xml','robots.txt','404.html'])if(!fs.existsSync(path.join(root,file)))failures.push(`Missing ${file}`);
if(failures.length){console.error(failures.join('\n'));process.exit(1);}console.log(`PASS: ${pages} content pages; ${links} internal link references; metadata, headings, JSON-LD and crawler files verified.`);

