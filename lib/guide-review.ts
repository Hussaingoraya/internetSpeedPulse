type Review = {heading:string; steps:string[]; note:string; sources:{label:string;url:string}[]};
const timing = {label:'MDN: request timing and cross-origin restrictions',url:'https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/requestStart'};
const wifi = {label:'Apple: router settings and interference',url:'https://support.apple.com/en-us/102766'};
const netflix = {label:'Netflix: recommended streaming speeds',url:'https://help.netflix.com/en/node/306'};
const zoom = {label:'Zoom: Web App bandwidth requirements',url:'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0058323'};
export const guideReview:Record<string,Review> = {
 'what-is-a-good-internet-speed':{
  heading:'Decide whether capacity is actually the problem',
  steps:['List simultaneous activities and their quality settings, then check the services’ requirements rather than counting connected devices.', 'Measure on Ethernet with competing transfers paused. Compare this baseline with the rooms where problems happen.', 'If throughput is adequate but calls stall during uploads, investigate queueing and upload capacity before buying a larger download allowance.'],
  note:'For context, Netflix lists 5 Mbps for one 1080p stream and 15 Mbps for one 4K stream. These are per-stream service recommendations. Our larger household planning ranges allow for simultaneous traffic and are not measured minimum requirements.', sources:[netflix,zoom],
 },
 'how-to-test-internet-speed':{
  heading:'When your result is lower than the advertised speed',
  steps:['Check the contract: is the rate an “up to” maximum, a typical busy-hour rate, or a minimum commitment? Compare upload and download separately.', 'Check the negotiated Ethernet link speed and adapter. A 100 Mbps link cannot carry a 500 Mbps internet service; even a 1 Gbps link has protocol overhead.', 'Repeat at a quieter time using the same server and mode. A distant or capacity-limited measurement server can lower throughput and raise latency.', 'If two devices on Ethernet repeatedly underperform under controlled conditions, send your provider the dates, contract details and complete results. Do not infer a provider fault from one run.'],
  note:'Multi uses four concurrent HTTP requests, not necessarily four TCP connections. HTTP/2 and HTTP/3 may multiplex requests. Single and Multi are different tests: keep the mode constant for comparisons. Browser upload progress can include buffering and is not a certified physical line-rate measurement.', sources:[timing,{label:'MDN: HTTP/2 multiplexing',url:'https://developer.mozilla.org/en-US/docs/Glossary/HTTP_2'}],
 },
 'why-is-my-wifi-so-slow':{
  heading:'A controlled troubleshooting sequence',
  steps:['Test Ethernet, then nearby Wi-Fi, then the problem room on the same capable device and measurement server. Keep other traffic paused.', 'If only the distant room is slow, move the router into the open or reposition a mesh node where its backhaul is still strong; retest one change at a time.', 'If nearby Wi-Fi is also slow but Ethernet is healthy, check device capabilities, router firmware and channel interference. Start with the router manufacturer’s automatic channel settings.', 'If every connection type is slow, check competing traffic, link speed, equipment indicators and provider outages before factory-resetting anything.'],
  note:'A test includes the device, local network, provider path and measurement server. It does not directly measure the Wi-Fi radio link or locate a fault. Avoid disabling router security to increase a test score.',sources:[wifi,{label:'Apple: reducing wireless interference',url:'https://support.apple.com/en-us/102319'}],
 },
 'download-vs-upload-speed':{
  heading:'Separate a slow transfer from a slow connection',
  steps:['Check units: a download application may report MB/s while your plan and speed test report Mbps. Multiply MB/s by eight to compare decimal rates.', 'If the test is fast but one file is slow, try another reputable source: the file host, its per-user limits or its route may be the bottleneck.', 'Pause cloud backups and repeat a call. If this helps, limit the backup’s bandwidth or investigate supported queue-management settings rather than only upgrading download speed.'],
  note:'A GB is 1,000,000,000 bytes; a GiB is 1,073,741,824 bytes. Our calculator uses decimal GB and ideal constant rates. Actual transfer durations include overhead, server delays and competing traffic.',sources:[{label:'NIST: binary prefixes and decimal units',url:'https://physics.nist.gov/cuu/Units/binary.html'},{label:'IETF: active queue management',url:'https://www.rfc-editor.org/rfc/rfc7567'}],
 },
 'ping-and-jitter-explained':{
  heading:'Interpret the numbers without comparing different metrics',
  steps:['Compare the idle result with the loaded result from the same server. A rise under load suggests queueing somewhere along that path; it does not identify which router is responsible.', 'Repeat on Ethernet and without competing transfers. If the rise only appears when uploading, try limiting backup bandwidth and repeat.', 'For gaming or calls, also check the application’s own network diagnostics. Its destination and transport can differ from this website’s HTTP endpoint.'],
  note:'Here, idle latency is the lowest eligible warmed HTTP probe; loaded latency is the median of successful probes during a transfer. Jitter uses LibreSpeed’s weighted variation between probes. These are not the same statistic as standardized one-way IP delay variation, ICMP ping, or an application’s jitter buffer. Missing loaded probes show —, not zero.', sources:[timing,{label:'IETF: IP packet delay variation',url:'https://www.rfc-editor.org/rfc/rfc3393'},{label:'IETF: queueing and active queue management',url:'https://www.rfc-editor.org/rfc/rfc7567'}],
 },
 'how-much-internet-speed-do-i-need':{
  heading:'Make a plan choice you can explain',
  steps:['Choose a realistic peak scenario, such as two streams and one meeting, and add each service’s download needs. Leave headroom rather than summing every device in the house.', 'Budget upload separately. A high-resolution video call, cloud backup and large file send can compete even when download capacity is ample.', 'Check cost, contract terms, upload rate and whether your router and devices can deliver the speed in the rooms you use. Upgrade when repeated evidence supports the benefit.'],
  note:'The calculator uses illustrative allowances of 20 Mbps per 4K stream, 5 Mbps per browsing activity or call, and 30% headroom. These are planning assumptions rather than service guarantees. Zoom’s current 1080p Web App recommendation is 3.8 Mbps upload and 3.0 Mbps download per participant; product settings and usage can differ.',sources:[netflix,zoom],
 },
};
