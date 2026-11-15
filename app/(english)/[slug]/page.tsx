import {caseStudyPath,caseStudyPublic} from '@/lib/case-study';
import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {guideAuthor} from '@/lib/author';
import {pages} from '@/lib/content';
import Contact from '@/components/Contact';
import FeaturePanels from '@/components/FeaturePanels';
import {featurePages} from '@/lib/feature-content';
const relatedPages: Record<string, [string, string][]> = {
 about: [['/blog/','Browse connection guides']],
 contact: [['/editorial-policy/','How we handle corrections'],['/help/','Troubleshoot a speed test']],
 methodology: [['/servers/','Compare measurement servers'],['/blog/why-speed-tests-differ/','Why speed test results differ']],
 servers: [['/methodology/','How we select and measure servers'],['/blog/why-speed-tests-differ/','Why results vary by destination']],
 tools: [['/blog/mbps-vs-mbs/','Convert Mbps to MB/s'],['/blog/how-much-internet-speed-do-i-need/','Estimate household bandwidth needs']],
 help: [['/blog/wifi-connected-no-internet/','Fix Wi-Fi that connects without internet access'],['/blog/internet-keeps-disconnecting/','Diagnose recurring disconnects'],['/blog/internet-slow-at-night/','Investigate evening slowdowns']],
 faq: [['/help/','Troubleshoot an incomplete test'],['/blog/how-to-test-internet-speed/','Run a repeatable test']],
 history: [['/blog/speed-test-evidence-for-provider/','Prepare your results for provider support']],
 settings: [['/methodology/','Understand test modes and data limits'],['/privacy/','Read how preferences and results are stored']],
 'key-terms': [['/blog/ping-and-jitter-explained/','Understand latency and jitter'],['/blog/mbps-vs-mbs/','Convert speed and file size units']],
 privacy: [['/cookie-policy/','Browser storage and preferences'],['/history/','Review or clear saved results']],
 'cookie-policy': [['/privacy/','Read the privacy policy'],['/settings/','Manage test preferences']],
 terms: [['/disclaimer/','Read the measurement limitations'],['/privacy/','Read the privacy policy']],
 disclaimer: [['/methodology/','What the test measures'],['/terms/','Read the terms of use']],
 'editorial-policy': [['/blog/','Browse the guides'],['/about/','About the site operator']],
};
export function generateStaticParams(){return [...Object.keys(pages),...Object.keys(featurePages),'contact'].map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=pages[slug]||featurePages[slug];return {robots:['history','settings'].includes(slug)?{index:false,follow:true}:undefined,title:slug==='contact'?'Contact & Corrections':p?.title,description:slug==='contact'?'Prepare a question or report a correction to InternetSpeed Pulse.':p?.description,alternates:{canonical:`/${slug}/`}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=pages[slug]||featurePages[slug];if(slug!=='contact'&&!p)notFound();return <div className={featurePages[slug]?.sections.length===0?"content-shell feature-page":"content-shell info-page"}><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>{slug.replaceAll('-',' ')}</span></nav><div className="page-intro"><span className="eyebrow">INTERNETSPEED PULSE · {slug.replaceAll('-',' ').toUpperCase()}</span><h1>{slug==='contact'?'Let’s clear things up.':p.title}</h1><p>{slug==='contact'?'Questions, corrections or something that isn’t working? Prepare the details below.':p.description}</p></div><div className={featurePages[slug]?.sections.length===0?"feature-panels":"prose info-prose"}>{featurePages[slug]?.sections.length===0?<FeaturePanels page={slug}/>:slug==='contact'?<Contact/>:<><p className="updated">Updated {slug==='about'?'November 12, 2026':pages[slug]||['faq','help','servers'].includes(slug)?'November 8, 2026':'November 7, 2026'}</p>{p.sections.map(([title,text])=><section key={title}><h2>{title}</h2><p>{text.replaceAll('Pulsecheck','InternetSpeed Pulse')}</p></section>)}{slug==='about'&&<>{guideAuthor.bio&&<section><h2>About the operator</h2><p>{guideAuthor.bio}</p></section>}<p><Link href="/methodology/">Measurement methodology</Link> · <Link href="/editorial-policy/">Editorial policy</Link></p>{caseStudyPublic&&<p><Link href={caseStudyPath}>Ethernet and Wi-Fi case study</Link></p>}</>}{(slug==='privacy'||slug==='methodology')&&<section><h2>Provider references</h2><p><a href="https://www.hostinger.com/privacy-policy">Hostinger privacy policy</a><br/><a href="https://www.cloudflare.com/privacypolicy/">Cloudflare privacy policy</a><br/><a href="https://github.com/cloudflare/speedtest">Cloudflare measurement endpoint documentation</a><br/><a href="https://adssettings.google.com/">Google Ads Settings</a></p></section>}<p><Link href="/contact/">Questions or corrections? Visit our contact page ↗</Link></p></>}</div>{relatedPages[slug]&&<section className="related"><h2>Related resources</h2>{relatedPages[slug].map(([href,label])=><Link key={href} href={href}>{label} ↗</Link>)}</section>}</div>}


