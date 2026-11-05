import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {articles} from '@/lib/content';
import Art from '@/components/Art';
export const metadata:Metadata={title:'Internet Speed & Wi-Fi Guides',description:'Practical guides to internet speed, Wi-Fi troubleshooting, download and upload, latency and choosing the right connection.',alternates:{canonical:'/blog/'}};
export default function Blog(){return <div className="content-shell"><div className="page-intro"><span className="eyebrow">THE CONNECTION GUIDE</span><h1>Less confusion.<br/>More connection.</h1><p>Practical answers for the internet you use every day.<br/>Start with the basics, or solve the thing slowing you down.</p></div><div className="article-grid blog-grid">{articles.map(a=><Link className="article-card" key={a.slug} href={`/blog/${a.slug}/`}><Art type={a.art}/><div className="article-meta"><span>{a.category}</span><span>{a.minutes} MIN READ</span></div><h2>{a.title}<ArrowUpRight size={20}/></h2><p>{a.description}</p></Link>)}</div><div className="editorial-note">Clear explanations, stated assumptions. <Link href="/editorial-policy/">Read our editorial policy ↗</Link></div></div>}
