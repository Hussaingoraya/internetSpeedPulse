import {shareImage} from '@/components/LocalizedLayout';
import Link from 'next/link';
import type {Metadata} from 'next';
import {origin} from '@/lib/content';
import {FaqList,TestSchema} from './LocalizedHome';
import SpeedTest from './SpeedTest';

export const specializedTests = {
 'wifi-speed-test':{
  title:'Wi-Fi Speed Test',
  description:'Measure Wi-Fi download, upload and latency, then compare results to find a router or coverage bottleneck.',
  heading:'Find where your Wi-Fi slows down',
  steps:[
   'Test from the room where you notice problems. Record download, upload and idle latency, plus the room and Wi-Fi band if your device shows it.',
   'Use the same device and server close to the router. Then repeat with Ethernet if available. Turn off Wi-Fi for the wired run.',
   'If only the distant room is slow, investigate placement and coverage. If all runs are slow with other traffic paused, check link speed, test another destination, and compare your plan terms.',
  ],
  guide:['/blog/ethernet-vs-wifi/','Compare Ethernet and Wi-Fi'],
  faq:[['Does this measure the Wi-Fi link by itself?','It measures the route from your browser through your Wi-Fi and internet connection to the chosen server. A wired comparison helps isolate the wireless link.'],['Should I test near the router?','Yes, if you also test in the problem room. The near-router result is a comparison point.']],
 },
 'ping-test':{
  title:'Ping, Jitter & Loaded Latency Test',
  description:'Compare idle HTTP latency, jitter, and latency during upload and download to investigate lag under load.',
  heading:'Compare responsiveness before and during a transfer',
  steps:[
   'Choose a server and run the full test. Record idle latency, jitter and both loaded latency readings.',
   'If calls or games lag when someone uploads, compare idle with upload-loaded latency. Pause the competing transfer and try the affected app again.',
   'Use the actual game’s network stats for its own server. Large increases here can indicate queuing on this test path, while your game can take a different route.',
  ],
  guide:['/blog/ping-and-jitter-explained/','Understand ping, jitter and latency'],
  faq:[['Is this an ICMP ping test?','It measures HTTP response times to the selected endpoint. It does not send ICMP packets or test a specific game server.'],['Can this detect bufferbloat?','A substantial increase in latency during transfers can indicate queuing under load. The test cannot identify which network device caused it.']],
 },
 'upload-speed-test':{
  title:'Upload Speed Test',
  description:'Measure upload throughput and loaded latency for video calls, cloud backups and large file transfers.',
  heading:'Check the capacity your outgoing tasks share',
  steps:[
   'Run the test with large uploads paused. Record upload speed and latency during upload, and check your plan’s upload terms separately from download.',
   'List the calls and transfers that need to run at the same time. Use the applications’ requirements and allow spare capacity for bursts.',
   'If a call improves when a backup stops, reschedule the backup or use its bandwidth limit. Try the call again under typical household use.',
  ],
  guide:['/blog/video-call-internet-speed/','Plan upload capacity for video calls'],
  faq:[['Why is my upload lower than my download?','Many plans provide different rates for upload and download. Check both plan terms, then compare controlled measurements.'],['How long will a 1 GB upload take?','At a sustained 20 Mbps, a decimal 1 GB file takes about 400 seconds before overhead and application processing.']],
 },
 '4k-streaming-speed-test':{
  title:'4K HDR Streaming Speed Test',
  description:'Check download speed where you watch and estimate the bandwidth needed for simultaneous 4K streams.',
  heading:'Check the connection where you watch',
  steps:[
   'Measure in the viewing room on the same network and band as the TV if you can. A laptop beside the TV is an approximation because the devices can have different radios.',
   'Look up your streaming service’s requirements. Use 15–25 Mbps per 4K stream as a planning estimate and leave room for other traffic.',
   'Two streams budgeted at 20 Mbps need 40 Mbps together before other activity. If playback still buffers, compare Ethernet and try the affected service at its usual viewing time.',
  ],
  guide:['/blog/how-much-internet-speed-do-i-need/','Estimate household bandwidth'],
  faq:[['Does HDR always need a fixed speed?','No single rate applies. The service, compression, quality settings and title can affect bandwidth needs.'],['Can a fast result guarantee smooth playback?','A speed test uses a measurement destination. The streaming app may take another route, and Wi-Fi conditions can vary over time.']],
 },
} as const;

export type SpecializedSlug=keyof typeof specializedTests;
export const specializedSlugs=Object.keys(specializedTests) as SpecializedSlug[];

export function specializedMetadata(slug:SpecializedSlug):Metadata {
 const {title,description}=specializedTests[slug];
 const url=origin+`/${slug}/`;
 return {title,description,alternates:{canonical:url,languages:{en:url,'x-default':url}},openGraph:{type:'website',title,description,url,siteName:'InternetSpeed Pulse',images:[shareImage]}};
}

export function SpecializedLinks() {
 return <nav className="specialized-links" aria-label="Specialized speed tests">
  {specializedSlugs.map(slug=><Link href={`/${slug}/`} key={slug}>{specializedTests[slug].title}</Link>)}
 </nav>;
}

export function SpecializedTest({slug}:{slug:SpecializedSlug}) {
 const {title,description,heading,steps,guide,faq}=specializedTests[slug];
 return <div className="home-shell">
  <TestSchema path={`/${slug}/`} locale="en" title={title} description={description} faq={faq}/>
  <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Speed test</Link><span>/</span><span>{title}</span></nav>
  <section className="intro"><h1>{title}</h1><p>{description}</p></section>
  <SpeedTest/>
  <section className="prose landing-copy"><h2>{heading}</h2><ol>{steps.map(step=><li key={step}>{step}</li>)}</ol>
   <p><Link href={guide[0]}>{guide[1]}</Link> · <Link href="/methodology/">Measurement methodology</Link></p>
  </section>
  <section className="landing-copy"><h2>Frequently asked questions</h2><FaqList faq={faq}/></section>
 </div>;
}
