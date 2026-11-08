import type {Metadata} from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
const inter = localFont({src:'./fonts/InterVariable.woff2', variable:'--font-inter', display:'swap', weight:'100 900'});
import { Activity, ArrowUpRight } from 'lucide-react';
import {origin} from '@/lib/content';
import './globals.css';
import './features.css';
import './speedometer.css';
import Header from '@/components/Header';
import {PreferencesProvider} from '@/components/Preferences';
export const metadata:Metadata={metadataBase:new URL(origin),verification:{google:'H2tN7ORlxMwOIgSJA77UiXFDDXxS-tAmV7xTSVDDvp0',other:{'msvalidate.01':'A8537133A2B95EBFA10E072CC00A0696'}},title:{default:'Internet Speed Test | InternetSpeed Pulse',template:'%s | InternetSpeed Pulse'},description:'Check your internet speed with a free browser test. Measure download, upload, ping and jitter, then understand your results with practical Wi-Fi guides.',openGraph:{type:'website',siteName:'InternetSpeed Pulse',locale:'en_US'},twitter:{card:'summary_large_image'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" className={inter.variable}><head><meta name="google-adsense-account" content="ca-pub-6573791611846419"/></head><body><PreferencesProvider><a href="#main" className="skip">Skip to content</a><Header/><main id="main">{children}</main><footer><div className="footer-top"><div><Link href="/" className="brand footer-brand"><span className="brand-mark"><Activity size={23}/></span><span>internet<span className="brand-light">speed</span><small>PULSE</small></span></Link><p>A little clarity for a more connected life.<br/>Independent tools. Straightforward answers.</p></div><div><strong>Explore</strong><Link href="/">Internet speed test</Link><Link href="/blog/">Connection guides</Link><Link href="/methodology/">Test methodology</Link></div><div><strong>About</strong><Link href="/about/">Our purpose</Link><Link href="/editorial-policy/">Editorial policy</Link><Link href="/contact/">Contact</Link></div><div><strong>The details</strong><Link href="/privacy/">Privacy policy</Link><Link href="/terms/">Terms of use</Link><Link href="/cookie-policy/">Cookies & storage</Link><Link href="/disclaimer/">Disclaimer</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} InternetSpeed Pulse.</span><span>Independent. Not affiliated with Ookla or any internet provider.</span><span className="footer-signoff"><i className="small-dot"/> Stay connected.</span></div></footer></PreferencesProvider></body></html>}

