import type {Metadata} from 'next';
import Link from 'next/link';
import {Activity} from 'lucide-react';
import Header from '@/components/Header';
import {DocumentShell,sharedMetadata,shareImage} from '@/components/LocalizedLayout';
import {SpecializedLinks} from '@/components/SpecializedTest';

export const metadata:Metadata={
 ...sharedMetadata,
 title:{default:'Internet Speed Test | InternetSpeed Pulse',template:'%s | InternetSpeed Pulse'},
 description:'Check your internet speed with a free browser test. Measure download, upload, ping and jitter.',
 openGraph:{type:'website',siteName:'InternetSpeed Pulse',locale:'en_US',images:[shareImage]},
};
export default function Layout({children}:{children:React.ReactNode}) {
 return <DocumentShell locale="en" header={<Header/>} footer={<footer><div className="footer-top"><div><Link href="/" className="brand footer-brand"><span className="brand-mark"><Activity size={23}/></span><span>internet<span className="brand-light">speed</span><small>PULSE</small></span></Link><p>A little clarity for a more connected life.<br/>Independent tools. Straightforward answers.</p></div><div><strong>Explore</strong><Link href="/">Internet speed test</Link><Link href="/blog/">Connection guides</Link><Link href="/methodology/">Test methodology</Link><Link href="/help/">Help</Link><Link href="/faq/">FAQ</Link><Link href="/key-terms/">Key terms</Link><SpecializedLinks/></div><div><strong>About</strong><Link href="/about/">Our purpose</Link><Link href="/editorial-policy/">Editorial policy</Link><Link href="/contact/">Contact</Link></div><div><strong>The details</strong><Link href="/privacy/">Privacy policy</Link><Link href="/terms/">Terms of use</Link><Link href="/cookie-policy/">Cookies & storage</Link><Link href="/disclaimer/">Disclaimer</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} InternetSpeed Pulse.</span><span>Independent. Not affiliated with Ookla or any internet provider.</span><span className="footer-signoff"><i className="small-dot"/> Stay connected.</span></div></footer>}>{children}</DocumentShell>;
}
