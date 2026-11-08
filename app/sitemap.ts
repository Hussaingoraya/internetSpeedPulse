import type {MetadataRoute} from 'next';
import {featurePages} from '@/lib/feature-content';
import {articles,pages,origin} from '@/lib/content';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['','blog','contact',...Object.keys(pages),...Object.keys(featurePages).filter(path=>!['history','settings'].includes(path)),...articles.map(a=>`blog/${a.slug}`)].map(path=>({url:`${origin}/${path?path+'/':''}`,lastModified:!path||path==='blog'||path==='contact'||path.startsWith('blog/')||pages[path]||['faq','help','servers'].includes(path)?'2026-11-08':'2026-11-07',changeFrequency:path?'monthly':'weekly',priority:path?0.7:1}));}

