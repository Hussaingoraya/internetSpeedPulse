export const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://internetspeedpulse.online';
export const articles = [
 {slug:'what-is-a-good-internet-speed', title:'What is a good internet speed? A practical household guide',category:'THE BASICS',minutes:3,art:'speed',description:'Find the right download and upload speeds for the way you actually use the internet.',sections:[
 ['Start with your busiest hour','A good connection handles what your household does at the same time. A single person reading websites needs much less capacity than a family streaming video while someone uploads work files. Write down your busiest realistic evening: how many screens are playing, whether anyone is on a video call, and whether a backup is running. That is a better starting point than choosing the largest number on a provider’s price list.'],
 ['Use these planning ranges','For light browsing and email, allow roughly 5–10 Mbps per active person. For an HD stream, budget around 5–10 Mbps; for a 4K stream, allow about 15–25 Mbps. These are planning estimates, not guarantees: compression, the service and picture quality change the requirement. A household with two 4K streams and ordinary browsing might start by considering 75–100 Mbps, then leave spare capacity for updates.'],
 ['Do not overlook upload','Download capacity does not tell you how smoothly you can send a presentation or join a call. An asymmetric plan may advertise hundreds of megabits down but offer a much smaller upload allowance. For two people on simultaneous calls, a practical starting budget is 10–20 Mbps of upload with room for variation. Pause cloud backups during an important meeting if upload is limited.'],
 ['Gaming needs consistency','Many online games transfer comparatively little data during play. Response time, variation in response time and packet loss can matter more than headline bandwidth. Downloading a new game is a different task and benefits from higher throughput. A wired connection can help gameplay even if it does not increase your plan speed.'],
 ['Check before paying for an upgrade','Run three tests on Ethernet with other traffic paused, then repeat in the room where you normally work. If Ethernet is healthy but the room is slow, investigate Wi-Fi coverage first. If both are consistently below your expected range, record times and results and ask your provider to investigate. Upgrading a plan cannot fix every router or coverage problem.'] ]},
 {slug:'how-to-test-internet-speed',title:'How to test your internet speed and get a useful result',category:'HOW TO',minutes:3,art:'test',description:'Run an internet throughput test, compare Ethernet with Wi-Fi, and understand why measured speeds differ from your broadband plan.',sections:[
 ['What does an internet throughput test measure?','Throughput is the amount of data actually transferred per second along a particular path. Bandwidth describes capacity; it does not guarantee the rate a browser will achieve. This tool estimates download and upload throughput from real requests and reports HTTP latency and jitter separately. It cannot certify the physical line rate or measure every part of internet performance.'],
 ['Before you press Start','Pause downloads, streams and cloud backups across your household. Keep the test tab in the foreground. Leave your VPN in its usual state if you are troubleshooting everyday performance, and record whether it was on. Check the test’s data warning before running it on a metered connection.'],
 ['Make a baseline on Ethernet','Connect a capable computer to the router using Ethernet, if possible. Check that the cable and network port support the speed you expect. A 100 Mbps port cannot show the full performance of a gigabit plan. Turn off Wi-Fi on that computer so you know which connection is active, then run the test.'],
 ['Compare Wi-Fi separately','Next test on Wi-Fi near the router and again from your usual room. Keep the same device and avoid moving during each test. A large drop between rooms suggests coverage or interference rather than a slower service entering your home. Changing devices at the same time makes it harder to identify the cause.'],
 ['Repeat without cherry-picking','If a result is unexpected or you need a baseline, take three readings with a short pause between runs. Keep the device, server option and Single or Multi mode fixed. For a comparison, select a specific server option and record the server shown with the result. Keep the range and use the middle reading for each metric. If the problem happens at a particular time, repeat then and during a quieter period.'],
 ['Understand the limits','InternetSpeed Pulse uses browser requests to your selected measurement endpoint. Even a sustained browser test may underestimate very fast links, while server distance, browser behavior and background activity can affect any measurement. Compare with a second independent test if a result seems surprising. Use a repeatable pattern of measurements when discussing a fault with your provider.'] ]},
 {slug:'why-is-my-wifi-so-slow',title:'Slow Wi-Fi? Find the bottleneck before you upgrade',category:'TROUBLESHOOTING',minutes:3,art:'wifi',description:'Separate a coverage problem from a provider problem with a few focused checks.',sections:[
 ['How to test Wi-Fi speed against Ethernet','Start with a laptop connected directly to your router by Ethernet and turn off its Wi-Fi. Record download, upload and latency. Unplug Ethernet, reconnect to your usual Wi-Fi and test near the router. Repeat in the room where the problem happens. Use the same device, server option and test mode for all three runs, with other traffic paused. If one reading looks unusual, repeat that comparison before drawing a conclusion.'],
 ['Give your router breathing room','Place the router in an open, reasonably central position, away from metal cupboards and large appliances. Thick walls, floors and mirrors can weaken the signal. Moving it a few feet can sometimes improve a difficult room. Do a test before and after each move so you can distinguish an improvement from ordinary variation.'],
 ['Choose the band that fits the room','The 2.4 GHz band often reaches farther but can be crowded. The 5 GHz and, on supported hardware, 6 GHz bands can offer more capacity nearby but are more affected by obstacles. Let a modern router manage bands automatically at first. If one device behaves badly, temporarily testing separate network names can reveal which band works better.'],
 ['Look for competing traffic','An automatic backup, security camera or game update may use the connection while everyone else is trying to stream. Check the router’s device list rather than assuming an unknown device is an intruder. If your router offers queue management, consult its documentation: managing a full upload queue can improve calls even without a faster plan.'],
 ['Extend coverage deliberately','A mesh node needs a strong link back to the main router. Putting it inside a dead zone may simply extend a poor connection. Try a position halfway toward the weak room and compare results. Wired backhaul is useful where practical. For a stationary workstation, Ethernet may be a simpler solution than buying another wireless device.'],
 ['Know when to call the provider','If wired performance also drops repeatedly, save the dates, measured speeds and whether other traffic was paused. Check your provider’s outage page and connection equipment indicators. Avoid repeated factory resets: they can erase settings without addressing the cause. Share the repeatable test pattern with support and ask what they can see on the line.'] ]},
 {slug:'download-vs-upload-speed',title:'Download vs. upload speed: why the results can differ',category:'THE BASICS',minutes:2,art:'arrows',description:'Understand uploading versus downloading, why download speed is often faster than upload, and what to check when upload is faster.',sections:[
 ['Two directions, different jobs','Download is data arriving at your device: websites, movies, game files and incoming call video. Upload is data leaving it: photos, backups, files and your outgoing camera feed. Both are normally expressed in megabits per second, or Mbps. They describe transfer capacity rather than how quickly the other end starts responding.'],
 ['Why is download speed faster than upload?','On an asymmetric broadband plan, the provider offers more download capacity than upload capacity. That can explain a large difference even when the connection is working as specified. Other plans offer symmetric or nearly symmetric rates, so download is not always supposed to be faster. Compare both measured directions with the actual terms of your package, including whether rates are maximum, typical or minimum commitments.'],
 ['Why is my upload speed faster than download?','Upload can measure faster when the two directions encounter different limits. A symmetric plan does not guarantee identical results in each test. Background downloads, Wi-Fi conditions, the test server or congestion along the download path can reduce the measured download rate. Browser upload buffering can also affect this estimate. One reversed result does not prove a provider fault or a faster upload entitlement.'],
 ['What should I check if upload stays faster?','Pause streaming, downloads and backups, then repeat on the same device, server and Single or Multi mode. Make an Ethernet baseline if possible. Repeat with the other measurement server as a separate comparison and record which destination was used. If the reversal persists across devices and wired tests, compare the results with your contracted rates and ask the provider to investigate. Keep incomplete or data-limited runs separate.'],
 ['Uploading or downloading: which am I doing?','Receiving a movie or software update mainly downloads data. Sending photos or a cloud backup mainly uploads data. A video call does both: your camera sends video while incoming audio and video download. Even predominantly one-way tasks exchange control traffic in the other direction. The best plan therefore depends on the activities that happen together, not just its largest speed number.'],
 ['Megabits are not megabytes','There are eight bits in a byte. To estimate an ideal download time, multiply the file size in megabytes by eight and divide by Mbps. A 1,000 MB file at a steady 100 Mbps takes about 80 seconds in ideal conditions. Real downloads also include overhead and depend on the remote server, so actual times can be longer.'],
 ['When upload becomes the bottleneck','A backup that fills the outgoing connection can delay other traffic, including acknowledgments used by downloads. Calls may become choppy while a speed test still shows a healthy download figure. Schedule large uploads outside meeting hours, reduce backup bandwidth in the app or investigate queue management in your router.'],
 ['Measure both directions','Test with other transfers paused, then compare with your normal busy conditions. If uploads are consistently much slower than your package specifies, try Ethernet and another device before contacting the provider. Keep the results together so you can show which direction is affected.'] ]},
 {slug:'ping-and-jitter-explained',title:'Ping and jitter explained: why fast internet can still feel slow',category:'EXPLAINED',minutes:3,art:'wave',description:'Learn the difference between bandwidth, responsiveness and connection consistency.',sections:[
 ['Bandwidth is only part of the experience','A road can carry many cars and still have a long journey time. Similarly, a connection can transfer large files quickly while taking too long to respond to a small request. Bandwidth measures capacity. Latency measures delay. More bandwidth helps when your link is busy, but it does not remove the physical distance to a server.'],
 ['What a ping result means here','InternetSpeed Pulse reports HTTP request latency to the measurement network, often casually called ping. It is not an ICMP ping to a game server. The destination, network route and browser overhead influence the result. Compare repeated measurements to the same service rather than treating results from different endpoints as interchangeable.'],
 ['Jitter is variation in delay','If consecutive requests take very different times, live audio and games can feel uneven. Jitter summarizes this variation; lower and steadier is generally preferable. Averages can hide occasional stalls, so note whether calls briefly freeze or whether a game repeatedly spikes. A single short test may miss intermittent problems.'],
 ['Compare idle and busy behavior','Queues can form when a connection is full. A low idle latency does not guarantee responsive calls during a large upload. This sustained test reports idle HTTP latency, jitter and median loaded HTTP latency during downloads and uploads when samples are available. It does not measure every loaded condition. For diagnosis, compare an idle baseline with your actual experience under load and consult router queue management documentation.'],
 ['Improve the path you can control','Try Ethernet, pause competing uploads and test without a VPN when appropriate. Choose a nearby game region if the game allows it. If the problem appears only with one service, its server or network route may be involved. Buying a higher speed tier is useful only when inadequate capacity is part of the cause.'] ]},
 {slug:'how-much-internet-speed-do-i-need',title:'How much broadband do I need for my household?',category:'BUYING SMARTER',minutes:3,art:'home',description:'Estimate how much broadband speed you need for streaming, calls and shared devices, with separate download, upload and data-allowance checks.',sections:[
 ['Start with simultaneous use, not a universal speed target','To work out how much broadband you need, list what happens at your busiest time. Two 4K streams at an illustrative 20 Mbps each plus 10 Mbps for a call and browsing total 50 Mbps of download demand. Adding 30% planning headroom gives 65 Mbps. This is a calculated scenario, not a measured minimum or a guarantee that a particular package will work in every room. Budget uploads separately and compare the next suitable packages available to you.'],
 ['Do I need more speed or a larger data allowance?','Broadband speed, usually shown in Mbps, describes a transfer rate. A monthly allowance in GB or TB describes how much data you may transfer. Faster internet does not by itself make the same movie file larger, but higher video quality and more use can consume more data. If you reach a monthly cap, check the allowance and the provider’s policy rather than assuming a higher speed tier removes the limit.'],
 ['Count activities rather than devices','A home can have twenty connected devices with only two actively transferring much data. Start with simultaneous demanding tasks instead of adding up every light bulb and thermostat. Consider your peak use, then leave headroom so ordinary software updates do not disrupt the household.'],
 ['Build a simple download budget','As a practical example, allow 20 Mbps for each of two high-resolution streams and 10 Mbps for browsing and a call. That totals around 50 Mbps before headroom. A plan around 75–100 Mbps may be a useful starting point for that pattern if the Wi-Fi delivers it reliably. Different streaming services, resolutions and devices change these estimates.'],
 ['Make a separate upload budget','Someone sending large design files while another person hosts a video call can need substantially more upload than a browsing household. Check the provider’s actual upload offering. A symmetric fiber package may suit this workflow, but compare local availability, price and reliability rather than assuming one technology is always best.'],
 ['Think about waiting time','A faster plan can save time on big downloads even when daily browsing feels unchanged. An ideal 50 GB download at 100 Mbps takes about 67 minutes; at 500 Mbps it takes about 13 minutes. The remote server and your equipment may prevent either rate. Decide how often this waiting time matters to you before paying every month for it.'],
 ['Test the rooms you use','A plan is only one link in the chain. If a bedroom receives a weak wireless signal, a bigger package may leave the same problem. Measure near the router and in the room, and compare a wired baseline. Solve coverage issues alongside capacity planning.'],
 ['Reassess with evidence','Start with a suitable plan if changing tiers is easy. Keep a week of notes about slowdowns and which tasks were happening. Upgrade when the evidence shows your capacity is repeatedly full, or when shorter transfers justify the price. If service is unreliable even at quiet times, ask the provider to resolve the fault first.'] ]}
];
export const pages: Record<string,{title:string;description:string;sections:[string,string][]}> = {
  "about": {
    "title": "A clearer picture of your connection.",
    "description": "InternetSpeed Pulse is an independent speed test and guide resource operated by Hussain Aslam.",
    "sections": [
      [
        "Who operates this site",
        "InternetSpeed Pulse is published and operated by Hussain Aslam. For support, technical corrections or privacy enquiries, email info@duotools.online. No professional network-engineering credential, laboratory certification or provider partnership is claimed."
      ],
      [
        "What the tool does",
        "We measure actual browser requests to a selected destination and explain the results. A reading describes one device-to-server path at one time; it does not certify your provider’s service or measure a Wi-Fi radio link in isolation."
      ],
      [
        "Independence",
        "We are independent of Ookla, Cloudflare, LibreSpeed and internet providers. LibreSpeed supplies the open-source measurement engine under its license; this does not imply endorsement. The website is hosted on Hostinger."
      ],
      [
        "Content and funding",
        "Guides were prepared with AI assistance, checked against linked primary references, and maintained under our editorial policy. Illustrative examples are labeled. No original field research or customer tests are claimed. AdSense ownership verification is present, but ad delivery is disabled pending consent setup."
      ]
    ]
  },
  "methodology": {
    "title": "Sustained measurements. Clear limitations.",
    "description": "How real transfer requests, HTTP latency, request budgets and failure handling produce your results.",
    "sections": [
      [
        "Before you start",
        "Only pressing Start begins transfer testing. Provider metadata is requested separately when the page opens. A typical full run takes about 35 seconds. The 75-second overall deadline includes selection and preflight checks. Keep the tab visible: hiding it stops the run so browser throttling does not silently distort timings."
      ],
      [
        "Measurement engine and selection",
        "The locally served LibreSpeed worker uses telemetry disabled and overhead compensation set to 1.0. Automatic warms and probes each available destination, then selects the lowest median of three idle HTTP probes. This chooses among the configured destinations, not every nearby server. A manual choice does not silently switch destinations on failure."
      ],
      [
        "Download and upload",
        "Each direction targets a 12-second sampling window after a 1.5-second download or 3-second upload warm-up. Single runs one HTTP request at a time; Multi runs four staggered streams. Bytes reported by browser progress events are divided by elapsed sampling time and converted to decimal Mbps. HTTP/2 and HTTP/3 can share underlying connections. Upload progress may include browser or network buffering; this is not certified line-rate measurement."
      ],
      [
        "Payloads and safeguards",
        "Downloads adapt between 1 and 8 MB per request. Upload bodies are 4 MiB. The worker reserves at most 512 MB of requested payload per direction, including warm-up. If another request would exceed that budget, it stops as incomplete rather than publishing a shortened result. The combined payload can approach 1.024 GB plus a small preflight and protocol overhead. The warning rounds this to roughly 1.1 GB plus network overhead; it is not a billing guarantee. Fast links may reach the budget before a complete result."
      ],
      [
        "Timeouts, cancellation and failures",
        "Individual worker requests time out after 15 seconds; selection, preflight and loaded probes have shorter deadlines. The first-party upload endpoint caps bodies at 8 MB and stops stalled or interrupted reads after 15 seconds. Stop terminates the worker and aborts control requests. HTTP errors, wrong download payloads, missing essential metrics, timeouts and exhausted data budgets cannot be saved or exported as complete results."
      ],
      [
        "Idle HTTP latency and jitter",
        "Twelve warmed probes are requested; the initial warm-up response is excluded from the reported statistics. Idle latency is the lowest eligible response time. Resource Timing uses the matching request URL when available; otherwise elapsed request timing is used. Cross-origin timing restrictions may force the fallback. LibreSpeed jitter is a weighted variation between successive eligible probes, not standardized one-way IP delay variation. No ICMP ping, packet loss or application-server latency is measured."
      ],
      [
        "Latency under load",
        "A lightweight HTTP probe is attempted once a second during download and upload. Successful probes within the same phase contribute to its median, including warm-up. These probes share a busy browser and path, but do not guarantee that a slow or server-limited transfer saturates your access link. Missing samples remain unavailable rather than zero. Idle minimum and loaded median are different summaries."
      ],
      [
        "Destinations and hosting limits",
        "Cloudflare’s open-source speedtest documentation lists its public download and upload endpoints. This integration sends direct measurement traffic, not the Cloudflare package’s result-logging requests. Endpoint availability and provider policies may change; no service-level agreement or unlimited commercial-traffic entitlement is claimed. The first-party destination is this Hostinger website server. A conservative application allowance reserves up to 10 GB of first-party payload per hour per running server process by default; the operator can lower it or disable first-party transfers. This is not a distributed or monthly billing cap. Hosting capacity, geography, congestion, compression behavior and process limits may restrict a result independently of your internet plan."
      ],
      [
        "History and comparison",
        "Optional history stores ten complete results locally, with method version, server, mode, duration and available loaded-latency values. IP and provider details are excluded. Earlier unbounded sustained or quick tests are different methods; keep the same version and conditions for comparisons. No original performance study or equivalence to Ookla has been established."
      ],
      [
        "Provider metadata",
        "Hostinger currently supplies no usable ISP metadata to this application, so provider and IP details may be unavailable. We do not infer a provider from the selected test server or contact an external IP lookup vendor. When trustworthy hosting metadata is available it can describe a VPN or corporate network rather than the billing provider."
      ]
    ]
  },
  "privacy": {
    "title": "Your privacy, plainly explained.",
    "description": "Actual measurement providers, hosting, local storage, contact processing and advertising status.",
    "sections": [
      [
        "Operator and contact",
        "Hussain Aslam operates InternetSpeed Pulse. Email info@duotools.online for privacy questions or requests. We do not operate accounts, a user database or a separate analytics service."
      ],
      [
        "Website hosting",
        "Hostinger receives ordinary network request information, including IP addresses and browser headers, to deliver and secure the website. Hosting access logs may be retained under the hosting service’s configuration and policies. This application does not add its own visitor analytics or retain a server-side measurement summary."
      ],
      [
        "Connection detection",
        "When the test page opens, your browser requests available hosting metadata from our connection endpoint. No separate IP lookup vendor is contacted. On the current Hostinger deployment, ISP and IP fields are normally unavailable. When supplied by hosting, those details stay in page memory, the IP is hidden by default, and neither is saved in history or CSV. Network and approximate location labels may be inaccurate."
      ],
      [
        "Measurement providers",
        "Pressing Start transfers synthetic payloads to Cloudflare’s speed.cloudflare.com endpoint or to this website’s Hostinger server. Automatic selection contacts both for small probes before choosing. Those providers receive the IP address and technical request information necessary to handle traffic, under their own privacy practices. The direct integration does not send a separate completed-result telemetry report. Test traffic does not read personal files."
      ],
      [
        "Data use",
        "A full test can request roughly 1.1 GB of payload plus network overhead; each direction has a 512 MB request budget. Data charges may apply even to failed or stopped tests. Per-request and overall deadlines bound time, not your provider’s billed traffic. Avoid testing on a limited allowance."
      ],
      [
        "Browser storage",
        "The site uses localStorage for theme, units, language, server, mode and meter-motion preferences. Optional completed-result history is off by default, stores up to ten results, and excludes IP and provider details. Turning off Remember results removes history. Clear history removes measurements, while browser site-data controls can remove all stored preferences. There is no cross-device account synchronization."
      ],
      [
        "Fonts and external links",
        "Inter is hosted by this website under its open font license. Loading the font does not contact Google Fonts. External reference links contact their destinations only when followed."
      ],
      [
        "Contact messages",
        "The contact form opens an email draft addressed to info@duotools.online. The website form itself does not submit or store messages. Sending from your mail application shares your address and message with the email services involved so the operator can respond. Do not include passwords, billing information or unnecessary personal data."
      ],
      [
        "Advertising and consent",
        "The site contains an AdSense account verification meta tag and ads.txt authorization. Neither is an ad delivery script. AdSense ad requests, automatic ads and ad units are disabled in this release because a certified consent configuration has not been confirmed. We do not present the results-history checkbox as advertising consent. Before advertising is activated, this policy and the relevant vendor disclosures must reflect that setup, and required consent choices must be implemented and tested."
      ],
      [
        "Your choices",
        "Read guides without running a test, leave history off, stop a transfer, clear local results or remove site data in your browser. Contact the operator about a message you sent. The operator cannot recover or remotely delete results kept only in your browser."
      ]
    ]
  },
  "terms": {
    "title": "Terms of use",
    "description": "Responsible testing, service limitations and contact details for InternetSpeed Pulse.",
    "sections": [
      [
        "Operator",
        "InternetSpeed Pulse is operated by Hussain Aslam. Contact info@duotools.online with questions about these terms."
      ],
      [
        "Authorized use",
        "Use the measurement tool only on networks you are authorized to use. You are responsible for applicable bandwidth charges and provider terms. Tests consume data even when incomplete. Stop if you do not wish to continue. Do not automate abusive transfers, evade safeguards or use these endpoints to attack another service."
      ],
      [
        "Scope of results",
        "Results estimate a browser-to-server path at a particular time. They are not a certification of an advertised plan, an ISP service-level guarantee, a measurement of Wi-Fi alone or individualized engineering advice. Equipment, routing, browser behavior and server limits affect readings."
      ],
      [
        "Availability and third parties",
        "Features, providers and limits may change or be unavailable. Cloudflare and Hostinger apply their own service terms and privacy practices. Third-party names and trademarks belong to their owners; no affiliation with Ookla or an internet provider is claimed."
      ],
      [
        "Content and rights",
        "Guides provide general information and labeled examples. Third-party open-source components and fonts retain their respective licenses; source and license links are supplied. These terms do not exclude rights that cannot lawfully be excluded. Contact the operator for questions about the service or your rights."
      ]
    ]
  },
  "cookie-policy": {
    "title": "Cookies & browser storage",
    "description": "The storage this site actually uses and the current advertising status.",
    "sections": [
      [
        "Local preferences",
        "This application does not set its own HTTP cookies. It stores display and test preferences in localStorage, including theme, meter motion, language, units, server and connection mode. The hosting service may use its own security mechanisms or cookies."
      ],
      [
        "Optional result storage",
        "Remember results is off by default. If enabled, up to ten completed results stay in this browser, without IP addresses or provider labels. Clear history deletes those measurements. Turning off Remember results also removes them. Browser site-data controls remove preferences and saved history."
      ],
      [
        "External processing",
        "Fonts are local. Test traffic reaches the selected measurement provider after Start; Automatic uses small probes to both destinations. Provider server-side processing is described in Privacy and in the linked providers’ policies."
      ],
      [
        "Advertising storage",
        "No AdSense delivery script or ad unit is active in this release. Ownership verification uses a meta tag and ads.txt only. A results preference is not advertising consent. If advertising is introduced, the certified consent setup and vendor information must be completed before relevant ad requests are enabled."
      ]
    ]
  },
  "disclaimer": {
    "title": "Measurement & editorial disclaimer",
    "description": "What browser measurements and illustrative troubleshooting examples can and cannot establish.",
    "sections": [
      [
        "Estimates with limits",
        "Device load, Wi-Fi, VPNs, traffic, routing and server capacity affect readings. Compare repeated measurements under the same conditions. A result alone does not identify a faulty provider, router or cable."
      ],
      [
        "Examples and independence",
        "Worked examples are explicitly hypothetical or calculated. We do not claim original laboratory tests, provider rankings, independent accuracy certification or identical results to Ookla. InternetSpeed Pulse is an independent project operated by Hussain Aslam."
      ],
      [
        "Search and advertising",
        "Technical checks and informational pages do not guarantee Google indexing, search rankings or AdSense approval. Google makes those decisions independently. Ad delivery is currently disabled pending consent configuration."
      ]
    ]
  },
  "editorial-policy": {
    "title": "Useful answers, with context.",
    "description": "Publisher accountability, AI assistance, primary sources, examples and corrections.",
    "sections": [
      [
        "Who is responsible",
        "Hussain Aslam publishes and operates InternetSpeed Pulse. Questions and corrections can be sent to info@duotools.online. No unprovided professional credential or independent reviewer is claimed."
      ],
      [
        "How guides are prepared",
        "Guides were drafted and edited with AI assistance. We check technical claims against primary documentation and link relevant sources. Planning assumptions are distinguished from provider requirements, and examples are labeled hypothetical or calculated. Source links do not establish endorsement."
      ],
      [
        "Evidence and original measurements",
        "No household or provider field measurements are presented as original research. Before publishing such a comparison we would record device, adapter, firmware, network type, server, mode, test version, time, background activity and repeated results. Localhost QA checks implementation behavior, not a visitor’s internet service."
      ],
      [
        "Corrections and dates",
        "Send the page address, disputed statement and supporting evidence by email. Publication dates identify initial release; modification dates reflect edits to that page. We do not refresh dates automatically on every build. Changes to measurement methods are versioned so unlike results are not silently compared."
      ],
      [
        "Commercial relationships",
        "The site has no claimed paid provider rankings or endorsements. Ad delivery is disabled pending consent setup. Any future advertising or paid placement must be visibly identified and separated from test controls and editorial conclusions."
      ]
    ]
  }
};
