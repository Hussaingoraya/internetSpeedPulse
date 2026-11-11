import {guideReview} from '@/lib/guide-review';
import {articleModifiedDate,displayContentDate} from '@/lib/content-dates';

export default function GuideReview({slug}:{slug:string}) {
 const review=guideReview[slug];
 if(!review)return null;
 return <>
  {(slug==='why-is-my-wifi-so-slow'||slug==='how-to-test-internet-speed')&&<figure className="diagnostic-figure">
   <figcaption>Compare the path, one change at a time</figcaption>
   <ol><li>Same device + Ethernet → router → same test server</li><li>Same device + nearby Wi-Fi → router → same test server</li><li>Same device + room Wi-Fi → router → same test server</li></ol>
   <p>A large room-only drop points toward local coverage; slow results on all paths need broader investigation. This is a diagnostic diagram, not collected test data.</p>
  </figure>}
  <section><h2>{review.heading}</h2><ol>{review.steps.map(step=><li key={step}>{step}</li>)}</ol><p>{review.note}</p></section>
  <section><h2>Sources and technical references</h2><ul>{review.sources.map(source=><li key={source.url}><a href={source.url}>{source.label}</a></li>)}</ul><p>Content updated {displayContentDate(articleModifiedDate(slug))}. Worked examples are calculations or hypothetical scenarios, not field measurements. <a href="/editorial-policy/">How we prepare and correct guides</a>.</p></section>
 </>;
}
