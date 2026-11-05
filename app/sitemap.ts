import type {MetadataRoute} from 'next';
import {articles,pages,origin} from '@/lib/content';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['','blog','contact',...Object.keys(pages),...articles.map(a=>`blog/${a.slug}`)].map(path=>({url:`${origin}/${path?path+'/':''}`,lastModified:'2026-11-05',changeFrequency:path?'monthly':'weekly',priority:path?0.7:1}));}
