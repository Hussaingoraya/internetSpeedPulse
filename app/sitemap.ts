import type {MetadataRoute} from 'next';
import {articleModifiedDate} from '@/lib/content-dates';
import {featurePages} from '@/lib/feature-content';
import {articles,pages,origin} from '@/lib/content';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['','blog','contact',...Object.keys(pages),...Object.keys(featurePages).filter(path=>!['history','settings'].includes(path)),...articles.map(a=>`blog/${a.slug}`)].map(path=>({url:`${origin}/${path?path+'/':''}`,lastModified:path.startsWith('blog/')?articleModifiedDate(path.slice(5)):!path||path==='blog'?'2026-11-11':path==='contact'||pages[path]||['faq','help','servers'].includes(path)?'2026-11-08':'2026-11-07',changeFrequency:path?'monthly':'weekly',priority:path?0.7:1}));}

