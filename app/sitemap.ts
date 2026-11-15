import {specializedSlugs} from '@/components/SpecializedTest';
import {alternates,locales,localePath} from '@/src/i18n/locales';
import {caseStudyPath,caseStudyPublic,connectionCaseStudy} from '@/lib/case-study';
import type {MetadataRoute} from 'next';
import {articleModifiedDate} from '@/lib/content-dates';
import {featurePages} from '@/lib/feature-content';
import {articles,pages,origin} from '@/lib/content';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{const pagesList:MetadataRoute.Sitemap = ['','blog','contact',...Object.keys(pages),...Object.keys(featurePages).filter(path=>!['history','settings'].includes(path)),...articles.map(a=>`blog/${a.slug}`)].map(path=>({url:`${origin}/${path?path+'/':''}`,lastModified:path.startsWith('blog/')?articleModifiedDate(path.slice(5)):!path||['about','blog'].includes(path)?'2026-11-12':path==='contact'||pages[path]||['faq','help','servers'].includes(path)?'2026-11-08':'2026-11-07',changeFrequency:path?'monthly':'weekly',priority:path?0.7:1}));
 const languages=alternates(origin);
 pagesList[0].alternates={languages};
 for(const locale of locales.filter(value=>value!=='en'))pagesList.push({url:origin+localePath(locale),alternates:{languages}});
 for(const slug of specializedSlugs){
  const url=origin+`/${slug}/`;
  pagesList.push({url,alternates:{languages:{en:url,'x-default':url}}});
 }
 if(caseStudyPublic&&connectionCaseStudy.published)pagesList.push({url:origin+caseStudyPath,lastModified:connectionCaseStudy.published});
 return pagesList;
}

