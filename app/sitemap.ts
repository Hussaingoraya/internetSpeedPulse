import {specializedSlugs} from '@/components/SpecializedTest';
import {caseStudyPath,caseStudyPublic,connectionCaseStudy} from '@/lib/case-study';
import type {MetadataRoute} from 'next';
import {articleModifiedDate} from '@/lib/content-dates';
import {featurePages} from '@/lib/feature-content';
import {articles,pages,origin} from '@/lib/content';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{const pagesList:MetadataRoute.Sitemap = ['','blog','contact',...Object.keys(pages),...Object.keys(featurePages).filter(path=>!['history','settings'].includes(path)),...articles.map(a=>`blog/${a.slug}`)].map(path=>({url:`${origin}/${path?path+'/':''}`,lastModified:path.startsWith('blog/')?articleModifiedDate(path.slice(5)):!path||['about','blog'].includes(path)?'2026-11-25':path==='contact'||pages[path]||['faq','help','servers'].includes(path)?'2026-11-25':'2026-11-07',changeFrequency:path?'monthly':'weekly',priority:path?0.7:1}));
 for(const slug of specializedSlugs){
  pagesList.push({url:origin+`/${slug}/`,lastModified:'2026-11-25',changeFrequency:'monthly',priority:0.7});
 }
 if(caseStudyPublic&&connectionCaseStudy.published)pagesList.push({url:origin+caseStudyPath,lastModified:connectionCaseStudy.published});
 return pagesList;
}

