import {shareImage} from '@/components/LocalizedLayout';
import Link from 'next/link';
import type {Metadata} from 'next';
import {origin} from '@/lib/content';
import {dictionaries} from '@/src/i18n/dictionaries';
import {alternates,localePath,type Locale} from '@/src/i18n/locales';
import SpeedTest from './SpeedTest';

const brand='InternetSpeed Pulse';
const ogLocale:Record<Locale,string>={
 en:'en_US',ar:'ar_AE',ur:'ur_PK',hi:'hi_IN',es:'es_ES',fr:'fr_FR',de:'de_DE',
 pt:'pt_BR',tr:'tr_TR',id:'id_ID',ru:'ru_RU',zh:'zh_CN',ja:'ja_JP',
};
export function homeMetadata(locale:Locale):Metadata {
 const {home}=dictionaries[locale];
 const title=`${home[0]} | ${brand}`;
 const url=origin+localePath(locale);
 return {
  metadataBase:new URL(origin),title:{absolute:title},description:home[1],
  alternates:{canonical:url,languages:alternates(origin)},
  openGraph:{type:'website',siteName:brand,title,description:home[1],url,locale:ogLocale[locale],images:[shareImage]},
 };
}

export function TestSchema({path,locale,title,description,faq}:{path:string;locale:Locale;title:string;description:string;faq:readonly (readonly [string,string])[]}) {
 const url=origin+path;
 const graph=[
  {'@type':'WebSite','@id':origin+'/#website',name:brand,url:origin+'/'},
  {'@type':'WebApplication',name:title,url,description,inLanguage:locale,applicationCategory:'UtilitiesApplication',operatingSystem:'Any',offers:{'@type':'Offer',price:0,priceCurrency:'USD'}},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:dictionaries[locale].nav[1],item:origin+localePath(locale)},...(path===localePath(locale)?[]:[{'@type':'ListItem',position:2,name:title,item:url}])]},
  {'@type':'FAQPage','@id':url+'#faq',inLanguage:locale,mainEntity:faq.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))},
 ];
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}}/>;
}

export function FaqList({faq}:{faq:readonly (readonly [string,string])[]}) {
 return <div className="faq-list">{faq.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>;
}

export function LocalizedHome({locale}:{locale:Locale}) {
 const {home,nav,faq,extras}=dictionaries[locale];
 const [title,description,explain,benchmark,browsing,hd,uhd,estimate,questions]=home;
 return <div className="home-shell localized-home">
  <TestSchema path={localePath(locale)} locale={locale} title={title} description={description} faq={faq}/>
  <section className="intro"><h1>{title}</h1><p>{description}</p></section>
  <SpeedTest locale={locale} dictionary={dictionaries[locale]}/>
  <section className="section-space landing-copy"><h2>{explain}</h2><p>{faq[0][1]}</p><p>{faq[2][1]}</p><Link href="/methodology/">{nav[3]} ↗</Link></section>
  <section className="good-speed section-space"><div><h2>{benchmark}</h2><p>{faq[1][1]}</p><Link href="/blog/">{nav[2]} ↗</Link></div>
   <div className="speed-list">{[[browsing,'5–10'],[hd,'5–10'],[uhd,'15–25']].map(([label,speed],index)=><div key={label}><span><strong>{label}</strong><small>{extras[index===0?0:1]}</small></span><bdi>{speed} Mbps</bdi></div>)}<p>{estimate}</p></div>
  </section>
  <section className="section-space landing-copy"><h2>{questions}</h2><FaqList faq={faq}/></section>
  <p>{nav[10]} <Link href="/blog/">{nav[2]} ↗</Link></p>
 </div>;
}
