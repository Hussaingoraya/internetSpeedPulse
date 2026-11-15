import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {caseStudyEnabled,caseStudyPath,caseStudyPublic,connectionCaseStudy as evidence} from '@/lib/case-study';

export const metadata: Metadata = {
 title: 'Ethernet and Wi-Fi Case Study',
 description: 'A controlled comparison of Ethernet, nearby Wi-Fi and Wi-Fi in a room with connection problems.',
 alternates: {canonical:caseStudyPath},
 robots: caseStudyPublic?undefined:{index:false,follow:false},
};

const setupLabels = {
 deviceAndAdapter:'Device and Ethernet adapter',
 ethernetLink:'Negotiated Ethernet link speed',
 browserAndVersion:'Browser and version',
 routerAndFirmware:'Router and firmware',
 wifiBandsAndLocations:'Wi-Fi bands and test locations',
 serverModeAndEngine:'Test server, mode and engine version',
 vpnAndBackgroundTraffic:'VPN state and paused traffic',
 planTerms:'Advertised download and upload terms',
 datesAndTimezone:'Collection dates and time zone',
} as const;

export default function CaseStudyPage() {
 if(!caseStudyEnabled)notFound();
 return <div className="content-shell info-page">
  <header className="page-intro">
   <h1>Ethernet and Wi-Fi case study</h1>
   <p>How we compared a wired connection with Wi-Fi near the router and in the room where a problem occurred.</p>
   {!caseStudyPublic&&<p>Evidence collection template. Measurements and files are pending operator review.</p>}
  </header>
  <article className="prose info-prose">
   <section>
    <h2>Methods and test conditions</h2>
    <p>Use the same laptop, browser, measurement server, test mode and engine version for all conditions. Turn off Wi-Fi for the Ethernet runs and disconnect Ethernet before testing Wi-Fi. Take three complete readings per condition with a short break between runs. Check the data allowance beforehand. Preserve incomplete attempts and their errors. If congestion is suspected, repeat a subset during quiet and busy periods.</p>
    <dl>{Object.entries(setupLabels).map(([key,label])=><div key={key}>
     <dt><strong>{label}</strong></dt>
     <dd>{evidence.setup?.[key as keyof typeof setupLabels]||'Pending collection'}</dd>
    </div>)}</dl>
   </section>
   <section>
    <h2>Results by connection</h2>
    {evidence.results.map(({condition,runs})=><section key={condition}>
     <h3>{condition}</h3>
     {runs.length===0?<p>Pending complete readings and any incomplete attempts.</p>:<ul>{runs.map(run=><li key={run.timestamp}>
      <strong>{run.timestamp}</strong> · {run.status}. Download {run.downloadMbps??'—'} Mbps. Upload {run.uploadMbps??'—'} Mbps. Idle latency {run.idleMs??'—'} ms. Loaded latency {run.downloadLoadedMs??'—'} ms during download and {run.uploadLoadedMs??'—'} ms during upload. Jitter {run.jitterMs??'—'} ms. {run.note}
     </li>)}</ul>}
    </section>)}
    <p>{evidence.findings||'Interpretation pending comparison of the completed readings.'}</p>
   </section>
   <section>
    <h2>CSV and screenshots</h2>
    {evidence.csv?<p><a href={evidence.csv.href} download>{evidence.csv.label}</a></p>:<p>CSV download pending.</p>}
    {evidence.screenshots.length?<ul>{evidence.screenshots.map(file=><li key={file.href}><a href={file.href}>{file.label}</a></li>)}</ul>:<p>Screenshots pending. Capture the full result with server and mode visible. Remove public IPs and account identifiers before uploading files.</p>}
   </section>
   <section>
    <h2>Limitations</h2>
    <p>This comparison describes one setup, device, time window and measurement path. The browser test measures the path to a server and cannot isolate radio throughput or prove the cause of a fault. Wi-Fi conditions and endpoint routing can change between runs. Missing and incomplete readings remain identifiable in the evidence.</p>
    <p><Link href="/methodology/">Read the measurement methodology</Link>.</p>
   </section>
  </article>
 </div>;
}
