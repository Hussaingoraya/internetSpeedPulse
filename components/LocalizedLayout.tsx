import type {Metadata} from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
import {origin} from '@/lib/content';
import {dictionaries} from '@/src/i18n/dictionaries';
import {direction,localePath,type Locale} from '@/src/i18n/locales';
import LanguageMenu from './LanguageMenu';
import {PreferencesProvider} from './Preferences';
import '@/app/globals.css';
import '@/app/features.css';
import '@/app/speedometer.css';
import '@/app/locales.css';

const inter = localFont({src:'../app/fonts/InterVariable.woff2',variable:'--font-inter',display:'swap',weight:'100 900'});
export const shareImage={url:origin+'/opengraph-image/',width:1200,height:630,alt:'InternetSpeed Pulse'};
export const sharedMetadata:Metadata={
 metadataBase:new URL(origin),
 verification:{google:'H2tN7ORlxMwOIgSJA77UiXFDDXxS-tAmV7xTSVDDvp0',other:{'msvalidate.01':'A8537133A2B95EBFA10E072CC00A0696'}},
 twitter:{card:'summary_large_image',images:[shareImage.url]},
};
export const footerLinks = [
 ['/blog/',2], ['/methodology/',3], ['/contact/',4], ['/privacy/',5],
 ['/terms/',6], ['/cookie-policy/',7], ['/disclaimer/',8], ['/editorial-policy/',11],
] as const;

export function DocumentShell({children,locale,header,footer}:{children:React.ReactNode;locale:Locale;header:React.ReactNode;footer:React.ReactNode}) {
 const {nav}=dictionaries[locale];
 const rawPublisherId=(process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID||'').trim();
 const publisherId=/^pub-\d{16}$/.test(rawPublisherId)?`ca-${rawPublisherId}`:rawPublisherId;
 const hasValidAdsense=/^ca-pub-\d{16}$/.test(publisherId);
 return <html lang={locale} dir={direction(locale)} className={inter.variable}>
  <head>{hasValidAdsense&&<><meta name="google-adsense-account" content={publisherId}/><script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`} crossOrigin="anonymous"/></>}</head>
  <body><PreferencesProvider><a href="#main" className="skip">{nav[9]}</a>{header}<main id="main">{children}</main>{footer}</PreferencesProvider></body>
 </html>;
}

export function LocalizedLayout({children,locale}:{children:React.ReactNode;locale:Locale}) {
 const {nav}=dictionaries[locale];
 return <DocumentShell locale={locale}
  header={<header className="site-header"><div className="nav-shell localized-nav">
   <Link className="brand" href={localePath(locale)}>InternetSpeed Pulse</Link>
   <nav aria-label={nav[1]}><Link href={localePath(locale)}>{nav[1]}</Link><Link href="/blog/">{nav[2]}</Link><Link href="/methodology/">{nav[3]}</Link></nav>
   <LanguageMenu locale={locale} label={nav[0]}/>
  </div></header>}
  footer={<footer className="localized-footer"><nav aria-label={nav[1]}>{footerLinks.map(([href,index])=><Link href={href} key={href}>{nav[index]}</Link>)}</nav><p>{nav[10]}</p></footer>}>
  {children}
 </DocumentShell>;
}
