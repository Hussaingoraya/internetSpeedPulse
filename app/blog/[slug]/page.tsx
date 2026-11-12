import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import Art from '@/components/Art';
import GuideReview from '@/components/GuideReview';
import AdPlacement from '@/components/AdPlacement';
import {guideAuthor} from '@/lib/author';
import {articles,origin} from '@/lib/content';
import {displayContentDate,getArticleDates} from '@/lib/content-dates';
import {guideExamples} from '@/lib/guide-examples';
import {newGuideSources} from '@/lib/new-guide-sources';
import {readingMinutes} from '@/lib/reading-time';
import {articleSearchTitles} from '@/lib/seo';

type Props = {params: Promise<{slug:string}>};

const relatedOriginal: Record<string,string[]> = {
 'what-is-a-good-internet-speed': ['how-much-internet-speed-do-i-need','video-call-internet-speed','how-to-test-internet-speed'],
 'how-to-test-internet-speed': ['why-speed-tests-differ','speed-test-mobile-data','speed-test-evidence-for-provider'],
 'why-is-my-wifi-so-slow': ['router-placement-guide','wifi-bands-24-5-6-ghz','ethernet-vs-wifi'],
 'download-vs-upload-speed': ['mbps-vs-mbs','video-call-internet-speed','what-is-a-good-internet-speed'],
 'ping-and-jitter-explained': ['video-call-internet-speed','does-vpn-slow-internet','why-speed-tests-differ'],
 'how-much-internet-speed-do-i-need': ['what-is-a-good-internet-speed','video-call-internet-speed','mbps-vs-mbs'],
};

export function generateStaticParams() {
 return articles.map(({slug})=>({slug}));
}

export async function generateMetadata({params}:Props):Promise<Metadata> {
 const {slug}=await params;
 const guide=articles.find(article=>article.slug===slug);
 if(!guide)return {};
 const {published,modified}=getArticleDates(slug);
 const url=`/blog/${slug}/`;
 const title='searchTitle' in guide?guide.searchTitle:articleSearchTitles[slug] || guide.title;
 return {
  title:{absolute:`${title} | InternetSpeed Pulse`},description:guide.description,
  alternates:{canonical:url},
  openGraph:{type:'article',title:guide.title,description:guide.description,url,publishedTime:published,modifiedTime:modified},
 };
}

export default async function Article({params}:Props) {
 const {slug}=await params;
 const guide=articles.find(article=>article.slug===slug);
 if(!guide)notFound();
 const {published,modified}=getArticleDates(slug);
 const example=guideExamples[slug];
 const sources=newGuideSources[slug];
 const tool='tool' in guide?guide.tool:null;
 const relatedSlugs='related' in guide?guide.related:relatedOriginal[slug];
 const related=relatedSlugs.flatMap(relatedSlug=>articles.filter(article=>article.slug===relatedSlug));
 const url=`${origin}/blog/${slug}/`;
 const articleSchema={
  '@context':'https://schema.org','@type':'Article',headline:guide.title,description:guide.description,
  mainEntityOfPage:url,
  author:{'@type':guideAuthor.type,name:guideAuthor.name,url:origin+guideAuthor.profilePath},
  publisher:{'@type':'Organization',name:'InternetSpeed Pulse'},
  datePublished:published,dateModified:modified,
 };
 const breadcrumbSchema={
  '@context':'https://schema.org','@type':'BreadcrumbList',
  itemListElement:[{name:'Home',item:origin+'/'},{name:'Guides',item:origin+'/blog/'},{name:guide.title,item:url}]
   .map((item,i)=>({'@type':'ListItem',position:i+1,...item})),
 };
 return <div className="content-shell article-page">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleSchema).replaceAll('<','\\u003c')}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbSchema).replaceAll('<','\\u003c')}}/>
  <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/blog/">Guides</Link><span>/</span><span>{guide.category.toLowerCase()}</span></nav>
  <header className="article-header">
   <span className="eyebrow">{guide.category} · {readingMinutes(guide)} MIN READ</span>
   <h1>{guide.title}</h1><p>{guide.description}</p>
   <div className="byline"><Link href={guideAuthor.profilePath}>{guideAuthor.name}</Link> · {guideAuthor.role} · Published <time dateTime={published}>{displayContentDate(published)}</time> · Updated <time dateTime={modified}>{displayContentDate(modified)}</time></div>
   <p className="byline">Prepared with AI assistance. <Link href="/editorial-policy/">Editorial policy and corrections</Link></p>
  </header>
  <Art type={guide.art}/>
  <div className="article-body">
   <aside><span className="eyebrow">IN THIS GUIDE</span>
    {guide.sections.map(([title],i)=><a href={`#section-${i}`} key={title}>{title}</a>)}
    <Link className="aside-test" href="/">Check your speed ↗</Link>
   </aside>
   <article className="prose">
    {guide.sections.map(([title,body],i)=><section key={title} id={`section-${i}`}>
     <h2>{title}</h2>{body.split('\n\n').map((paragraph,index)=><p key={index}>{paragraph}</p>)}
    </section>)}
    {example&&<section>
     <h2>{example.title}</h2><p>{example.text}</p><p><Link href={example.link}>{example.label} ↗</Link></p>
     {['what-is-a-good-internet-speed','how-much-internet-speed-do-i-need'].includes(slug)&&<p><a href="https://help.netflix.com/en/node/306">Netflix streaming speed recommendations</a>. Household budgets above are illustrative estimates.</p>}
    </section>}
    <GuideReview slug={slug}/>
    {tool&&<p><Link href={tool.href}>{tool.label} ↗</Link></p>}
    {!tool&&<div className="article-takeaway"><h2>Put the numbers in context.</h2><p>Run a baseline test, keep the conditions consistent and compare several results before making a change.</p><Link href="/" className="text-link">Test your connection ↗</Link></div>}
    <section>
     <h2>{sources?'Sources and technical references':'Further reading'}</h2>
     {sources?<ul>{sources.map(source=><li key={source.url}><a href={source.url}>{source.label}</a></li>)}</ul>:<p><a href="https://developers.cloudflare.com/fundamentals/performance/test-speed/">Cloudflare connection speed testing documentation</a></p>}
     <p><Link href="/methodology/">Measurement methodology</Link> · <Link href="/editorial-policy/">Editorial policy &amp; corrections</Link></p>
    </section>
    <AdPlacement location="article-end"/>
   </article>
  </div>
  <section className="related"><h2>Related guides</h2>
   {related.map(article=><Link key={article.slug} href={`/blog/${article.slug}/`}>{article.title} ↗</Link>)}
  </section>
 </div>;
}
