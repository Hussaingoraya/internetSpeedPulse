export type NewGuide = {
 slug: string;
 title: string;
 searchTitle: string;
 category: string;
 art: string;
 description: string;
 sections: [string,string][];
 tool: {href:string; label:string};
 related: string[];
};

export const newGuides: NewGuide[] = [
{
 slug:'wifi-bands-24-5-6-ghz', title:'2.4 GHz vs 5 GHz vs 6 GHz Wi-Fi: choose and test a band',
 searchTitle:'2.4 GHz vs 5 GHz vs 6 GHz Wi-Fi', category:'WI-FI', art:'wifi',
 description:'Identify the band your device actually uses, compare bands in the rooms you use, and choose settings that match your equipment.',
 tool:{href:'/',label:'Run a comparison speed test'}, related:['router-placement-guide','ethernet-vs-wifi','why-is-my-wifi-so-slow'],
 sections:[
 ['Start with the device and the room',`A Wi-Fi band is a range of radio frequencies. A device and its router need to support the same band before they can communicate on it. The number in the band name is a frequency in gigahertz. It does not describe your plan speed, how many megabits the device receives, or the number of devices your router can support.

Choose one device and name the task that is giving you trouble. A thermostat needs a dependable connection in its installed location. A laptop that transfers large files may benefit from a different choice in the same home. The result that matters is how well that device works where you actually use it. A test next to the router is useful as a baseline. Testing in the room where the task fails is the part that tells you whether the change helped.

Start with the network you already use. Write down the device model, room, approximate distance from the router and whether a mesh node is nearby. Check the supported Wi-Fi bands in the device specifications. If your router has a guest network, avoid using it for the first comparison unless that is where the issue occurs.`],
 ['What each band changes',`The 2.4 GHz band often remains usable farther from an access point. Many older devices and home accessories use it. Neighbors and other devices can share the same spectrum, so a strong signal can still deliver inconsistent performance. A signal icon estimates reception. It cannot show how long your device waited for a turn to transmit.

The 5 GHz band is often a good fit for a laptop or television in a room with good coverage. Its available channels and the wider widths supported by some equipment can provide more capacity. Building materials, distance and neighboring networks can still affect results.

The 6 GHz band requires a compatible access point, client and regional support. Look for explicit Wi-Fi 6E or 6 GHz support in product specifications. Wi-Fi 6 alone is insufficient evidence. A device that connects over 6 GHz in one room may choose another band farther away. That behavior can be appropriate if it keeps the connection stable.

Think of these as options to test. The usable band depends on the path through your building and what the other devices are doing at the time.`],
 ['Find the band before collecting results',`A shared network name lets devices and the router make band choices. You can be connected to the same network name throughout the experiment and still change bands or mesh nodes. Look at the device’s network details or the router’s client list for the current band, channel and access point. Depending on the system, the device may show frequency in megahertz instead of a band name. The router manual can help you identify the corresponding field.

Check the connection immediately before and after each run. If the band or access point changed, write it down. That run can still describe the normal experience of using the network. It gives weaker evidence about a specific band in a controlled comparison.

If your router offers a way to select a band temporarily, record its original settings first. Use a spare test network or an individual client setting where supported so you avoid disconnecting household devices. If the router provides no reliable way to pin the band, test the automatic behavior in each room and record the bands you observe. Restore settings when the experiment ends.`],
 ['Build a comparison you can repeat',`Use one device, browser, test server option and test mode. Choose a room, place the device on the same surface and hold its orientation steady. Let the device reconnect before starting a test on a different band. Pause large transfers that you control. Repeat in alternating order if the first run on one band happened when the network was busier. This reduces the chance that a temporary change gets mistaken for a band effect.

Record download, upload and idle latency. If calls or gaming are your concern, also compare how stable the actual app feels and whether loaded latency increases while the network is busy. A faster download by itself may do little for an app that already has enough throughput.

Repeat in the rooms that matter. If both bands slow down together, check Ethernet or repeat at another time. The internet path can change independently of Wi-Fi. Make sure the data allowance supports the number of runs you plan. You can get useful evidence from a small set of tests followed by a real task.`],
 ['Illustrative example of a room-by-room decision',`Suppose a laptop stays on 5 GHz in the office and a large work upload finishes reliably. In the bedroom, the laptop initially uses 5 GHz, reconnects mid-call, and settles on 2.4 GHz. A repeat test with the laptop in the same position again shows a band change. These observations suggest trying a placement change before buying a faster internet plan. They are an illustrative scenario.

The household also has a door sensor that works consistently over 2.4 GHz. Leaving that band available keeps the sensor working. The laptop can still use 5 GHz where it has good reception. If the router supports automatic steering and both devices work after the access point is repositioned, the household can keep a shared network name.

The useful decision is where to spend effort. Improving the path to the bedroom may help the laptop. Disabling the band used by the sensor would create a second problem. A short log with the room, selected band and actual symptom makes it easier to judge whether the change helped.`],
 ['Test compatibility before changing the household network',`If you are adding a new device, check its setup requirements before making a band decision for the whole home. Some accessories are provisioned by a phone app and have their own requirements for the network name or the band they join. Keep the existing network working while you try the new configuration. In a mesh setup, confirm the feature is supported by the node serving the room as well as by the main router.`],
 ['Common questions about band selection',`Should I give each band its own name? Separate names can be useful for an experiment when the router supports them. For everyday use, follow your equipment manufacturer’s guidance. Think about how roaming devices and accessories will reconnect if you rename a network.

Does a wider channel always help? A wider channel can carry more data under favorable conditions. In a busy area it can overlap more traffic, and the device may have limited support. Use the manufacturer’s defaults as a baseline and change one setting at a time if you have a reason to test.

What if the fast band disappears? Check compatibility and regional settings, then move the device closer and see whether it appears again. A mesh network can also advertise bands differently across nodes. If a particular band keeps dropping during normal use, prioritize the setting that lets your task finish consistently. Keep the notes from the experiment so you can restore the original setup if the change has side effects.`],
 ],
},
{
 slug:'does-vpn-slow-internet', title:'Does a VPN slow down your internet? How to test it fairly',
 searchTitle:'Does a VPN Slow Down Your Internet?', category:'HOW TO', art:'test',
 description:'Compare VPN performance with a paired test, identify routing and device bottlenecks, and decide which changes are safe to try.',
 tool:{href:'/methodology/',label:'Read how the test measures a device-to-server path'}, related:['why-speed-tests-differ','video-call-internet-speed','how-to-test-internet-speed'],
 sections:[
 ['Decide what the VPN comparison should tell you',`A VPN creates a tunnel from your device to a gateway. The gateway sends traffic onward. Your device may reach an application through a different route when the tunnel is active. That can change throughput, latency or stability. The result depends on the gateway and the destination, so start by writing down the task you want to improve.

For a home VPN, you might want to know whether a usual gateway makes a personal download noticeably slower. For a work VPN, the problem may affect only a company service. Your company may require the VPN and block access to that service outside it. Compare allowed configurations and follow your IT team’s instructions when the tunnel is required. Use a public test only if it is permitted under those rules.

Check whether the slow activity is inside the VPN path. Some configurations send only selected traffic through the tunnel. A public speed test can take the normal internet route while a work file transfer takes the VPN route. Ask your administrator or check the VPN client’s documentation before treating the public result as a measurement of a private application.`],
 ['Set up a paired test',`Choose a quiet period and pause unrelated downloads, backups and software updates. Use the same device, Wi-Fi location or wired connection, browser and measurement mode. Pick a specific test destination in the server selector. Automatic selection can choose a different destination after you enable the tunnel. Record the destination displayed with each result. A provider that routes requests to an available edge can still route the two conditions differently.

Run one test with the VPN off when you are authorized to do so. Turn the VPN on, wait for the client to confirm the connection and run the same test. Take a short break. Repeat the pair in reverse order if your allowance permits. Reversing the order helps you notice a change that was caused by the network becoming busier during the experiment.

Keep the tunnel settings and gateway fixed within a pair. Record the time, gateway label, VPN protocol if available, and all the readings you need. Log blocked and incomplete attempts separately. They describe how the setup behaved and are useful when reporting the problem.`],
 ['Read throughput and latency together',`Throughput describes the rate at which data moves. Idle latency describes the responsiveness of the request path before a large transfer begins. A distant gateway can add delay even if the tunnel still transfers large files at a rate you find acceptable. An overloaded gateway can affect both. A single browser test gives limited evidence about which segment changed.

Compare each direction separately. A backup sent to a remote service uses upload capacity. An installer arriving from a public site uses download capacity. If only one direction is consistently affected, reproduce the specific transfer with the approved app and destination. Watch for application limits or the remote system’s own throughput. Two different file services can behave differently even over the same tunnel.

Look at loaded latency if interruptions happen during transfers. A sharp increase during upload can explain why a call suffers while files are going out. Repeat while pausing the background upload. This helps establish whether competition for capacity matters, although it cannot identify which device in the path queued the traffic.`],
 ['Change one cause at a time',`For a personal VPN, try one approved gateway closer to you and repeat the same task. Keep the protocol and test destination fixed during that comparison. If the gateway change helps consistently, record it. You can then compare another protocol if the service provides one and you understand the security settings. Avoid changing the DNS configuration, gateway and protocol together because you will have little evidence about which change mattered.

Watch what the device is doing. A busy processor, power-saving mode, browser extensions and security inspection can all affect browser throughput. If the slowdown appears on one computer only, repeat under the same conditions on another supported device when possible. For work equipment, share the pattern with IT before disabling any controls.

If websites load but a certain upload stalls, capture the error text and time. The failure could involve application policy, network settings or the remote server. Escalate with a specific reproduction instead of selecting a random protocol based on a single score.`],
 ['Illustrative example of two distinct VPN outcomes',`Imagine a contractor can run approved public tests with and without a personal VPN. In each pair, the VPN produces a similar download result but a noticeably higher idle latency. Their video meetings still work. The contractor has evidence that the path is less responsive, and they can check whether the actual work suffers before changing a setting. This is an illustrative example.

In a second scenario, the same contractor’s work VPN is required. The public browser result looks ordinary, but a shared drive transfer stalls each afternoon. The contractor records the work service, time, file direction, gateway label and error. They then compare the behavior at a quiet time while staying connected to the required VPN. The public result is supporting context, while the private service test demonstrates the actual problem.

Both logs are more useful when they identify the task and configuration. A support engineer can use timestamps to check gateway or application load. A speed reading alone leaves those details unresolved.`],
 ['Check the effect of a change on a workday',`A short benchmark can miss a problem that appears only after a device has been connected for some time. If a new gateway seems better, keep a brief log during the next ordinary work session. Record reconnects, stalled requests and whether those events happened after waking the laptop or moving between networks. Compare this log with the original setup under a similar workload. An improvement in a single test is less useful if the new route reconnects every time you return from a break. For a personal service, you can restore the previous setting while investigating. For a managed service, ask IT which settings it can verify from its own gateway logs.`],
 ['Questions about VPN tests',`Can the VPN produce a faster result? A different path or a change in conditions between runs can yield a better reading. Repeat the comparison and check the application you care about. Keep the description specific to the tested configuration.

Should I select the gateway with the best speed score? Consider responsiveness, stability and any policy or location requirement alongside throughput. A nearby gateway may be convenient if the service allows it. A particular work service may require a specific gateway.

Can I publish the results? Remove public IPs, account information, work hostnames and any security configuration that should stay private. Ask the administrator before sharing measurements about a managed service. Keep the full unredacted record only where your organization permits it.

Do I need to run several full speed tests? Start with the smallest comparison that answers the question and check the data warning. If the result is clear and repeatable in the actual application, additional synthetic transfers may add little value.`],
 ],
},
{
 slug:'why-speed-tests-differ',title:'Why different speed tests give different results',searchTitle:'Why Speed Test Results Differ',
 category:'MEASUREMENT',art:'test',description:'Compare speed test results without mixing up destinations, test durations, throughput summaries and browser conditions.',
 tool:{href:'/methodology/',label:'See the InternetSpeed Pulse measurement method'},related:['how-to-test-internet-speed','does-vpn-slow-internet','ping-and-jitter-explained'],
 sections:[
 ['Compare the paths before the numbers',`Your device transfers data to a particular destination when you run a test. One service may choose a server in your provider’s network. Another may choose an edge run by a different organization. The routes can share the first part of the journey and diverge after that. A test that stays close to your provider can show capacity on a shorter path, while a test to a different network can expose a different constraint.

Write down the destination shown in each result. If a tool offers a choice, run the default test first so you have a record of the experience most users get. Then repeat with a fixed selection if the goal is to compare conditions over time. A location label describes the destination offered by that tool. Two providers may use different facilities in the same city. An automatic or distributed service may route requests to a different edge on another run. Keep that possibility in mind when the destination display stays the same but the reading changes.`],
 ['Check the procedure each tool uses',`Two tools may both report Mbps while producing that value in different ways. Look for the length of the transfer, whether the test warms up and how it summarizes the measured interval. Early traffic can be affected by connection setup or by how quickly the sender increases its rate. A longer interval can reveal changes that happen after the first burst. An app may also choose a different duration based on what it observes.

Parallel requests can use the available capacity differently from a single transfer. A browser can use several requests while multiplexing them over an underlying connection. A tool’s label for its mode may describe requests, streams or connections. Read its documentation before assuming modes with similar names behave the same way.

InternetSpeed Pulse uses bounded browser requests, with a warm-up before the sustained interval and a requested-payload cap for each direction. A run that cannot complete within its limits is incomplete. Compare complete results for numeric differences and record incomplete runs as a separate observation.`],
 ['Put latency readings in the right columns',`Look for the protocol and timing definition when comparing latency. A browser test can time an HTTP request. Another tool may use a different protocol or select a different part of the exchange. Each destination also has its own network path. Even identical measurements to different places can produce different delays.

Keep idle and loaded latency separate. Idle latency describes a relatively quiet connection. Loaded latency describes response time while a test is moving data. Tools can use different probes and summaries. Read the definitions before interpreting a mismatch. Jitter is also a statistic computed from variation, and tools can aggregate that variation differently.

If an app feels sluggish during a household upload, compare quiet and busy periods within the same tool. Then check the actual call, game or application. Seeing the same pattern across tools can justify investigating it. Identifying which device or network segment is responsible usually takes a narrower test with fewer moving parts.`],
 ['Run an alternating comparison',`Use a wired device if the question concerns the broadband service. Check the negotiated Ethernet link speed and use a foreground browser. Pause known transfers on other devices and keep the VPN state constant. Pick a brief window and alternate tool A, tool B, tool B, then tool A if the data allowance permits. Record time, destination, units and mode. Take a short break between runs to avoid overlapping activity.

Compare each tool’s spread before comparing the two tools. If tool A produces several substantially different results under the same settings, a small difference from tool B may be hard to interpret. If each produces a consistent result and the gap persists when you reverse the order, document which conditions differed. Try another time of day if you are looking for a pattern.

Use the same type of client where possible. An installed application and a web page can have different performance constraints. Treat client type as a factor if the comparison requires both.`],
 ['Illustrative example of a persistent gap',`Suppose a wired laptop repeatedly shows about 480 Mbps down on a test to a server inside its internet provider’s network and about 300 Mbps down on a browser test to an external destination. These are illustrative numbers. The customer checks that both tools report Mbps and confirms that their own VPN was off throughout. The gap stays after alternating the order.

The first reading shows that the laptop reached the higher rate on one path under those conditions. The second describes another path using another procedure. The customer next tries another external destination with the same browser tool, while keeping the device and connection unchanged. If one external destination consistently differs from the others, the destination or route becomes a useful line of investigation. If every destination changes when the household starts a backup, competition for capacity is a better next check.

The customer shares the table with support, including the destinations. Averaging the tools would lose information about the paths and make the original pattern harder to see.`],
 ['Decide which comparison belongs in your record',`If you are monitoring a service over time, choose one method and keep its settings in the log. A trend is easier to interpret when the tool and endpoint remain stable. If the tool changes its engine or the provider retires a server, label the change in the record. Run the old and new procedures during the same window if both are still available. That overlap helps you see whether a jump started with the method or appeared in both series. You can still keep a second test as an independent check when a result looks unusual. Record it in a separate column with its destination and duration. If you share a chart, mark the point where the procedure changed so someone reading it later can interpret the gap.`],
 ['Common questions about conflicting results',`Which test should I use when speaking with my provider? Ask which method the provider accepts for a service check. Include your own controlled readings and the names of both destinations so support can reproduce the difference.

Does the highest result show my true internet speed? It shows what one test achieved at that moment. Use a set of readings taken under the conditions that matter to you. For a recurring slowdown, keep examples from the affected time and a quiet baseline.

Should I compare my phone to a wired laptop? That can help you decide which device suits a task. It also changes the client and access method, so it is a weak comparison of two test services. Start with one device when investigating a disagreement.

Does selecting another server fix the internet connection? It changes the route being measured. Use it to investigate the pattern. An affected video call or file transfer still needs to be checked on its own service.`],
 ],
},
{
 slug:'speed-test-mobile-data',title:'How to run a speed test on mobile data without wasting your allowance',searchTitle:'How to Test Speed on Mobile Data',
 category:'MOBILE',art:'test',description:'Check your mobile allowance, isolate cellular data, and decide when a full transfer test is worth the traffic.',
 tool:{href:'/methodology/',label:'Check the test’s payload limits and measurement method'},related:['how-to-test-internet-speed','why-speed-tests-differ','video-call-internet-speed'],
 sections:[
 ['Choose the smallest check that answers your question',`If a page will not load on mobile data, start by opening a different lightweight page or checking the provider’s service notice over Wi-Fi. A failed browser request already tells you something about the current connection. A full throughput test transfers large amounts of data and may be unnecessary when the immediate question is whether the phone can connect.

Write down what you want to learn. For an unreliable train commute, the question might be where the connection drops. Note the locations and try the actual app under safe, stationary conditions when practical. For a video upload that takes too long, check the app’s progress and file size first. A small, known transfer may be enough to estimate whether the problem is worth investigating.

Use a full test when you specifically need separate download and upload measurements or want a controlled baseline to share. Decide how many runs you can afford before opening the tool. Leave enough allowance for navigation, calls and ordinary phone use after the experiment.`],
 ['Check what your plan counts',`Look at the remaining allowance in your provider’s app or account before switching off Wi-Fi. Check whether the allowance resets soon, whether you are roaming, and whether hotspot traffic uses a separate bucket. A shared plan may draw from one allowance for the entire household. Ask the other users if they are relying on that data before you use a substantial portion.

Phone data counters can help you estimate what an app used. Carrier counters can report usage later and may account for traffic differently. Write down the starting value and the time if you plan to compare. The browser can make other requests and the phone may sync in the background, so a difference in the phone counter is a record of the device’s activity over that interval.

Check the speed test’s warning for its own limit. InternetSpeed Pulse describes up to roughly 1.1 GB of payload plus network overhead for a full run. The warning gives a planning figure. Your carrier’s billable usage can differ.`],
 ['Confirm that the phone is using cellular data',`Switch off Wi-Fi in the device settings and confirm that mobile data is on. On a dual-SIM phone, check which SIM is assigned to data. If you are using a laptop through your phone’s hotspot, verify that the laptop is connected to the intended hotspot and that the phone is using mobile data upstream. Pause updates and cloud sync on the laptop as well as the phone.

Stay in one position while you test. Record whether you are indoors, by a window or outside, and note the network indicator. A change in indicator or a handover during the test can be useful context if results vary. A label such as 5G describes the connection state shown by the phone. The speed can still depend on signal, the cell’s load, your device and the test path.

Avoid changing the cellular network settings and the location at the same time. If you want to compare a window and an interior room, keep the phone’s settings fixed and allow it to settle before repeating.`],
 ['Use the controls to contain the experiment',`Read the warning before pressing Start and keep the test in the foreground. InternetSpeed Pulse includes a Stop control. Stopping cancels active testing, and data already transferred can still count toward your allowance. An incomplete run can also have used data. Check usage after a failure before deciding whether to repeat.

Select a destination deliberately if you are comparing locations or times. The same server option and mode make it easier to interpret differences. Single mode changes request concurrency. It does not set a smaller guaranteed allowance. If your remaining data makes the full warning unacceptable, use a smaller known transfer, the affected application or a Wi-Fi connection for the next step.

Close or pause other browser tabs that transfer data. Wait until the test has ended before restoring automatic sync and reconnecting to Wi-Fi. On a limited plan, preserve the completed result immediately if you need it, so you can refer to it later without starting a second run by mistake.`],
 ['Calculated example of budgeting several runs',`Suppose your plan shows 3 GB remaining, and you want to reserve 2 GB for the rest of the week. That leaves 1 GB for all experimental activity. At a planning figure of roughly 1.1 GB per full run plus overhead, one InternetSpeed Pulse run could exceed that budget. The safer choice is to skip the full test and try a small transfer, or wait for your plan to reset. This is a calculated example using an assumed allowance.

If you instead have 8 GB available and set aside 5 GB, the remaining 3 GB gives you room to consider two runs at the same planning figure. A third would exceed the 3 GB budget before overhead. Check the counter after the first test, because unrelated traffic and carrier accounting may change the decision.

Budget for the upper limit before starting. A slow run may use less data, but you only learn that after the transfer. A fast link can spend the requested-payload budget quickly.`],
 ['Compare a short task before moving to a full run',`You can test the experience you care about with a file whose size you already know. If the question is whether you can send a document from a particular room, use an ordinary small document that is safe to share through your normal service. Record whether the upload completes, how long it takes and whether a retry is needed. Repeat the same task in the alternative location if the data cost is acceptable. Setup, encryption and server processing can account for much of a short transfer, so use this as an application check. If the task reliably finishes in both places, you already have evidence about the decision you were making. Reserve a full speed test for a case where separate throughput readings would change that decision.`],
 ['Questions about mobile speed tests',`Will a speed test charge me directly? The browser test has no payment step. Your mobile carrier may count its traffic against your plan or apply charges under your plan terms. Check the active SIM and roaming rules.

Can I compare two providers with one dual-SIM phone? You can switch the SIM assigned to mobile data and repeat in the same place. Record each provider, plan and network indicator. Run the test only if both allowances support it. The result describes those plans, device and conditions.

Can I use my phone’s data counter instead of the carrier app? Use both if available. The device counter gives a quick indication, and your carrier determines what counts for billing.

What if the page stops responding during testing? Check whether cellular data still works with a lightweight page. Record the failed run, then decide if you need another test based on the allowance and the question you are trying to answer.`],
 ],
},
{
 slug:'video-call-internet-speed',title:'Internet speed for video calls and remote work',searchTitle:'Internet Speed for Video Calls',
 category:'REMOTE WORK',art:'speed',description:'Build an upload-first bandwidth budget for simultaneous calls and diagnose interruptions caused by competing traffic.',
 tool:{href:'/tools/',label:'Try the household speed calculator'},related:['how-much-internet-speed-do-i-need','ping-and-jitter-explained','does-vpn-slow-internet'],
 sections:[
 ['Start with what leaves the house',`A remote meeting uses both directions of your internet connection. Your camera, microphone and shared screen send data upstream. The pictures and sound from other people come downstream. Upload is easy to overlook because broadband plans often emphasize download and a person can watch a stream smoothly while their own call video freezes.

List the activities that happen during your busiest work period. Put outgoing calls, backups, file sync, live streams and camera uploads in one column. Put incoming calls, downloads and streaming in another. Write down which can be paused and which must run together. The timing matters more than the number of connected devices. An idle tablet and a laptop sending a large project have different effects on your workday.

Use your meeting application’s published requirements for the quality, layout and features you use. Pay attention to both directions and the difference between a recommendation and a minimum. The requirements may change when someone shares a screen or when the meeting includes multiple visible participants. Ask IT about a virtual desktop or work VPN if either is part of the real path.`],
 ['Turn the activity list into an upload budget',`Add the upstream allowances for simultaneous calls first. Include required work transfers if you have a reasonable estimate. For jobs that can wait, reschedule them outside meeting hours or use the sync application’s bandwidth limit. Estimate download separately using the meeting app and any activity that receives data while you work.

Leave spare capacity for variation. A single speed reading is a poor basis for allocating the entire upstream link to planned traffic. A test measures a particular route at a particular time, and the meeting platform has its own route. Compare repeated quiet readings with what the household actually sees while it is working. If available upload is often near the estimated total, test the meeting with backups paused before committing to a plan change.

Keep the figures for requirements, measured speeds and advertised plan speeds in separate columns. One is an application budget, one describes an observed path, and one describes the service you bought. That distinction makes it easier to explain why a particular plan is adequate on paper yet difficult to use in the afternoon.`],
 ['Use latency to find interruptions during transfers',`If a call works until a backup starts, compare the behavior with the backup paused and active. Keep the same device, work location and meeting settings. A private test call or the platform’s own test facility gives you a way to reproduce the problem without disrupting a real meeting. Ask the person on the other end whether they see your picture freeze or hear your audio break up.

InternetSpeed Pulse reports idle HTTP latency and can report latency during download and upload. A substantial increase during upload suggests that requests had to wait while the test used upstream capacity. This is a clue about queuing on the test path. It cannot tell you which network device queued the traffic or guarantee the same effect on a meeting server.

Watch whether the app improves when you pause competing traffic. If it does, schedule those transfers or consider a router that can manage traffic queues using settings documented by its manufacturer. A wired connection can help you isolate Wi-Fi, and extra upload capacity can help if the household truly needs to send several things at once.`],
 ['Separate the network from the meeting setup',`Look at the meeting client’s own connection statistics when available. Write down whether audio, outgoing video, incoming video or screen sharing was affected. When a presenter’s outgoing audio is unclear for everyone, the troubleshooting starts in a different place from a problem only one viewer sees.

A busy computer can also stutter when its connection is adequate. Close unneeded applications, check whether the computer is handling a large export, and try the meeting client’s own audio and camera check. If you can, compare one call over Ethernet. Keep the same account, meeting app and device so that the network connection is the main variable that changes.

For a managed laptop or VPN, keep the required software running. Record the time, error and connection type for your IT team. If calls fail on one platform while other tasks work, check the platform’s status and ask IT whether there is a known routing or policy issue. Use the browser test as one observation alongside the application’s record.`],
 ['Calculated example of two simultaneous calls',`Suppose your meeting settings lead you to allocate 3 Mbps of upload to each of two simultaneous calls. These are illustrative inputs, not a universal meeting requirement. Two calls use 6 Mbps of the working budget. You also estimate that a background sync sends at 4 Mbps if left uncapped. Together that is 10 Mbps before allowing for bursts or other traffic.

On a connection that repeatedly measures around 10 Mbps upstream under quiet conditions, the plan leaves little room when all three tasks overlap. Pausing sync gives the calls 4 Mbps of additional headroom in this example. A sync cap of 1 Mbps would make the planned total 7 Mbps. Check whether the cap applies to the process actually sending data and verify with another test call.

Repeat the exercise for downstream traffic. If the same people receive several video feeds, the download estimate can differ from the upload estimate. Keep the arithmetic as a planning aid and revise it when real usage changes.`],
 ['Make a backup plan for important meetings',`Test an alternate connection before a presentation or interview. A wired connection at the same desk preserves your usual microphone and camera setup. A phone hotspot may help if the fixed service drops, provided your plan permits hotspot use and you have enough data. Check whether your employer allows it and whether the VPN works on that network. If the meeting still struggles, consider joining with audio only if that meets the task. Write down which option worked and keep any needed adapter nearby. This preparation is useful even if you later upgrade the plan, because local outages and equipment failures can still happen.`],
 ['Common questions about remote work',`Do I need a faster plan for one call? Check the platform’s requirements and run a short test call in your usual location. Investigate Wi-Fi or equipment when the measured capacity is adequate but the call repeatedly stalls.

Will turning off my camera fix the issue? It reduces your video workload and may reduce upload demand. If audio still breaks up, check the microphone and client statistics as well as the connection. It is a temporary workaround while you collect evidence.

Does high download speed help screen sharing? The person presenting needs upstream capacity. People viewing the screen use downstream capacity. Write down which side is having trouble.

What should I tell IT? Include a time and time zone, meeting platform, device, connection type, whether the VPN was required, the symptom others saw and which one change helped. Share account or meeting identifiers only through your approved support channel.`],
 ],
},
{
 slug:'router-placement-guide',title:'Where to put your router: a placement routine you can test',searchTitle:'Where to Put Your Wi-Fi Router',
 category:'WI-FI',art:'wifi',description:'Map the rooms that need coverage and compare practical router or mesh positions with a repeatable routine.',
 tool:{href:'/',label:'Measure a baseline before moving your router'},related:['wifi-bands-24-5-6-ghz','why-is-my-wifi-so-slow','ethernet-vs-wifi'],
 sections:[
 ['Map the places where the connection matters',`Draw a rough outline of your home and mark the router, work desk, television and any room with recurring trouble. Add floors, large walls and metal storage between the router and each location. A useful map takes a few minutes. Distances and barriers matter more than a precise floor plan.

Write one real task beside each problem spot. A television needs to finish playback without buffering. A desk needs calls to remain usable. A door camera may need a reliable upstream path. Prioritize the places where failures have the biggest effect. You can use the map later to decide whether a move improved one room while making another worse.

Check which equipment can move. Your provider’s fiber terminal, modem or incoming cable may limit where service enters. If the router connects to a separate modem over Ethernet, you may have more placement flexibility. Follow the provider’s instructions before touching a fiber connection. Work with available outlets and avoid placing cables across a walkway while you experiment.`],
 ['Record a baseline you can recreate',`Choose a device that can visit each test spot and record the surface or position you will use. A laptop on a desk and the same laptop on the floor can see different conditions. Keep the device orientation consistent. Write down the room, router location, selected band and mesh node when you can identify them.

Run a wired check if possible so you know how the service behaves without the wireless link. Then check wireless performance near the router and at the priority spots. Keep the test destination and mode fixed. Pause controllable background traffic, and set a limit on how many full runs your data allowance can support.

Record a practical symptom alongside the measurements. If a call usually cuts out near the desk, try a short private call at the same location. If a TV buffers after switching on, note how far into playback it happens. A placement change is worth keeping if it improves the activity for which you moved the equipment. Use the speed test to explain that change and check for tradeoffs.`],
 ['Choose two positions that change the path',`Start with an open, reasonably central position. A shelf can keep the unit away from the floor and surrounding furniture. Leave space for ventilation and follow the manufacturer’s mounting and antenna instructions. Consider whether the path to a priority room crosses a large appliance, a metal cabinet or several thick walls. Moving sideways can change which barriers the signal crosses even when the total distance stays similar.

Pick a second candidate because it changes one of those barriers. For example, try the outside of a cabinet if the router was inside it, or a shelf toward the stairwell if the upstairs room is the priority. Record each candidate’s location before connecting the equipment so it is easy to restore.

After the move, let equipment reconnect and check that household devices still work. Test the priority spot and at least one previously healthy spot. A placement that improves one room and makes another unreliable may need a second adjustment. Take notes as you go instead of trusting that the most recent result was the best one.`],
 ['Test mesh placement from both directions',`A wireless mesh node communicates with your device and with the rest of the mesh. Put it where it can reach the router or another suitable node while still serving the problem area. A node in the room with the weakest signal may struggle with its own upstream link. Check the mesh app’s link quality, then verify by performing the task you want to improve.

Try a hallway or a spot partway between the router and the difficult room. Record which mesh node the test device uses. If it stays associated with the distant node after moving, wait for it to settle or reconnect before measuring the new location. Keep the normal behavior as a separate observation if the device consistently roams at an inconvenient time.

If your equipment supports Ethernet backhaul and you can route a cable safely, compare a wired node as another option. It changes how the node reaches the router. Test the client in the same room so you can assess the change without also moving the task location.`],
 ['Illustrative example of balancing two rooms',`Imagine a router sits in a metal cabinet near the front entrance. Calls in the study drop, while the living-room TV works. The household moves the router to an open shelf nearer the study. The desk becomes reliable during two short practice calls, but the television starts buffering. These are illustrative observations.

The household tries a second shelf with a clearer path toward both rooms. They use the same laptop at the desk and beside the TV, then check a call and playback again. If both tasks work, the second shelf is a better fit for their priorities. If the TV still struggles and has an Ethernet port nearby, they can consider wiring that device while leaving the router where calls work.

A simple record might say “cabinet, open shelf near study, hallway shelf” and include the time, client band and symptom for each. That record is easier to act on than a single before-and-after screenshot from one room.`],
 ['Check devices that stay in one place',`A portable laptop is useful for comparing spots, but installed devices have different antennas and mounting positions. After choosing a position, check the actual television, printer, camera or smart home device that matters. An accessory can remain connected to a distant mesh node until it reconnects. Use the device or router status screen to check its association if the behavior changes after the move. Watch for overnight tasks too. A camera uploading clips or a backup scheduled after dinner might reveal an issue that a quiet afternoon test missed. Keep the original placement in your notes so a later firmware update or furniture move can be compared with the setup that worked. Record any devices that needed to reconnect manually.`],
 ['Questions about router placement',`Should I put the router upstairs? Try a location near the route between floors and compare the most important rooms. The floor materials and location of the service entry can shape the decision.

Can I keep the router in a cabinet? Try the same task with the door open and with the unit moved into the open if practical. Follow ventilation instructions either way. If the difference persists, look for a location with better clearance.

Will a mesh system always improve a room? It depends on the node’s link back to the rest of the network and the client’s choice of access point. Test those two links as part of the placement routine.

When should I stop moving things? Stop when the important tasks work consistently and the setup is safe and practical. Keep a photo or note of the successful position so it can be restored after cleaning, maintenance or a furniture move.`],
 ],
},
{
 slug:'ethernet-vs-wifi',title:'Ethernet vs Wi-Fi: when a cable is worth it',searchTitle:'Ethernet vs Wi-Fi: When to Use a Cable',
 category:'WI-FI',art:'wifi',description:'Check link speed, plan a safe cable route and compare wired and wireless performance for a real task.',
 tool:{href:'/',label:'Compare wired and wireless measurements'},related:['why-is-my-wifi-so-slow','router-placement-guide','wifi-bands-24-5-6-ghz'],
 sections:[
 ['Pick a task that benefits from a cable',`A cable is worth trying when one stationary device needs a consistent connection. A computer at a desk, console next to a router or television beside an Ethernet jack is an easy candidate. Walking between rooms with a phone requires wireless access. Decide what you want the cable to improve before deciding how to route it.

For a large download, compare sustained throughput. For a call or game, compare responsiveness while other people use the network. For a home backup, check whether the destination is on your own network. A browser internet test reaches an external server, so it can miss a difference that matters when you copy files to local storage.

A wired connection bypasses the Wi-Fi radio for that device. It still shares the router and internet service with everyone else. That makes wiring useful as a diagnostic as well as a permanent choice. If the task improves on Ethernet, investigate what was different about the wireless path. If it behaves the same, check the application and the rest of the path before spending money on cabling.`],
 ['Inspect the whole wired link',`Find the Ethernet port on the device or the adapter you intend to use. Check its rated speed and the speed reported after connecting. The negotiated value describes the link between two adjacent devices. A router port, wall jack, switch and laptop adapter can impose separate limits. Follow the path from the laptop to the router when checking equipment.

If a gigabit-capable laptop reports a 100 Mbps link, try a known working cable and another compatible router port. Swap one part at a time and read the negotiated value again. A damaged cable, a slower port or an adapter can explain the result. Use the network details screen or the router’s client list if the device provides it.

USB Ethernet adapters can be handy, particularly on thin laptops. Check what the adapter and the port support and connect it directly for the first test if a dock complicates the path. Keep track of the pieces that changed so you can repeat the working setup later.`],
 ['Compare under everyday load',`Start with a quiet wired baseline and turn off Wi-Fi on the test device so you can identify the active connection. Keep the same device and server choice when you switch to Wi-Fi. Check which access point and band the device actually uses. If you routinely move between rooms, keep a test at the desk separate from a roaming test.

Now check the real activity under a representative load. A game may feel fine while you play alone and become inconsistent when someone uploads photos. Compare the same activity on Ethernet and Wi-Fi while that other demand is present. If both worsen together, the shared upstream path or router deserves attention. If only Wi-Fi worsens, investigate wireless traffic or coverage.

Record the time and the direction affected. Save a complete result if it helps, then check whether the app outcome matches the number. If your NAS is the real destination, time a controlled file copy to it and keep that local experiment separate from the public speed test.`],
 ['Decide how to run the cable',`Try a temporary cable before paying for permanent installation. Use a route that keeps the cable away from feet, doors and moving furniture. Follow the cable manufacturer’s bend and installation guidance. A flat cable that fits under a door can still be damaged if the door repeatedly pinches it.

Check whether existing wall outlets are connected to a usable switch or patch panel. A wall jack is a termination point. It needs an active path to the router before it can connect your device. If you rent, ask before drilling or changing permanent wiring. For a longer installation, discuss cable rating, electrical separation and local installation requirements with a qualified installer.

Consider wiring the access point as well as the endpoint. A wired mesh node can serve several wireless devices in a room while using Ethernet for its connection back to the router. Test one arrangement first. Keep Wi-Fi available for devices that need mobility and use the cable where it solves a demonstrated problem.`],
 ['Illustrative example of a wired desk and wireless TV',`Suppose a work laptop at a desk shows occasional freezes on Wi-Fi even though a quiet download test is fast. The household runs a temporary Ethernet cable and tries two private calls during the same period of normal household use. The freezes disappear on the wired calls. These are illustrative observations.

The household checks the connection again when a cloud backup starts. Both Wi-Fi and Ethernet then show interruptions. The result suggests there were two effects. The cable improved the desk’s local path, and the backup still competed for capacity shared by both connections. Scheduling the backup outside calls addresses the second pattern.

The television in the same home streams reliably on Wi-Fi. Its owner leaves it wireless because the task already works and the cable would cross a doorway. Comparing the two rooms separately helps the household avoid buying a cable for every device. Keep that reasoning in the test log so future equipment changes can be evaluated against the same tasks.`],
 ['Check the shared wiring when several devices are affected',`When several wired devices slow down together, follow their common path. They may share a switch, a wall uplink or a router port. A fast link from the laptop to the switch says little about the link from that switch to the router. If practical, connect one device directly to the router for a comparison. Keep the test destination fixed and write down which equipment the new path bypassed. If the direct connection consistently helps, inspect the shared link and its negotiated speed. If the result is similar, continue with the service or application checks. This procedure is especially useful after a room is rewired or a switch is moved. Keep the original cables connected as documented so you can restore the network afterward.`],
 ['Common questions about Ethernet',`Will Ethernet increase my broadband plan speed? A cable can remove a wireless bottleneck. The provider still delivers the service under your existing plan. Compare with the provider’s terms if wired readings repeatedly fall short.

Is a newer cable category always faster? The connected equipment determines the negotiated link, within what the installation supports. Confirm the speed your ports actually negotiate before replacing a working cable.

Should I wire a console if Wi-Fi already works? Try Ethernet if gameplay feels inconsistent and routing a cable is easy. Compare the same game and time window. Keep the setup that delivers the experience you need.

What if the cable is slower? Verify which interface is active, inspect the negotiated link and try a known working port and cable. A slower wired link may limit throughput while Wi-Fi negotiates a higher radio rate.`],
 ],
},
{
 slug:'speed-test-evidence-for-provider',title:'How to take your speed test results to your internet provider',searchTitle:'Speed Test Evidence to Share With Your ISP',
 category:'TROUBLESHOOTING',art:'test',description:'Build a compact evidence log with plan terms, repeatable conditions, complete results and a clear question for support.',
 tool:{href:'/history/',label:'Open saved results and CSV export'},related:['how-to-test-internet-speed','ethernet-vs-wifi','why-speed-tests-differ'],
 sections:[
 ['Describe the fault in one sentence',`Start the support request with an observable symptom. “Large work uploads stall on the wired laptop after dinner” gives a technician a time window, a direction and a device. “The internet is bad” forces them to guess where to begin. Include when it started and whether there was an equipment, plan or service change around that date.

Write down what remains usable during the slowdown. If downloads still finish but outgoing calls break up, support may need to look at upload separately. If every device disconnects at once, note whether the router or modem status lights changed. A recurring outage and a low speed reading require different evidence.

Check the provider’s outage page and any instructions for diagnostic tests. They may ask for their own test destination or a test connected to specific equipment. Keep a record of what they request. If their method differs from yours, document both sets of conditions so a technician can see which results are comparable.`],
 ['Collect the relevant service and equipment details',`Save the plan’s published download and upload terms and the date you checked them. Look for language such as maximum, typical or minimum and record any conditions that apply. A headline figure on a plan advertisement can differ from the commitment in your agreement. Include both directions when describing the problem.

Write down your router and modem models, whether they are supplied by the provider, and the test device and adapter. Record the negotiated Ethernet link speed for a wired baseline. If you used a switch or dock, mention it. A technician may ask you to bypass a device as a follow-up. Knowing your starting setup makes that request easier to carry out.

Keep account numbers and exact addresses out of screenshots you share publicly. Use the provider’s authenticated support channel when they need to identify the account. Preserve the unredacted material only where you need it. Include the time zone with your observations so the provider can look up its records for the same period.`],
 ['Keep the test record small and repeatable',`For each run, record the date, time and time zone, connection type, device, test server, mode, VPN state and competing traffic. Write down download, upload and idle latency with their units. If loaded latency or jitter helps describe the issue, include those fields too. An incomplete run should have its status and error recorded separately.

Try a wired baseline with other controllable transfers paused. Run tests during an affected period and a quieter period. Keep the endpoint and mode the same for comparisons. Check the data warning before repeating, particularly on a fixed wireless or capped service. A few well documented runs often explain more than a folder full of screenshots with missing conditions.

A spreadsheet or a short text log is enough. InternetSpeed Pulse can remember results on the device if you enable the option, and completed results can be exported as CSV. Add any conditions that the export does not know, such as the room or negotiated link speed. Capture the result screen if support asks, with the public IP hidden.`],
 ['Summarize the pattern and ask for one next step',`Put a short summary above the log. State the expected behavior, what you observed, when it happens and the most useful comparison. If a technician has only a minute, they should still be able to understand the problem and find a relevant timestamp. Attach the full records for anyone who needs the detail.

Ask the provider to check a specific symptom. For a repeatable evening slowdown you could ask whether they can see loss of service, line events or congestion at those times, and which wired test they want you to repeat. A good question gives support a path forward while leaving room for a different explanation.

Record the ticket number and each change you make with the technician. If they replace a cable, update settings or swap a router, label later results with that change. Repeat the original task afterward. A faster speed reading is useful, and the practical outcome is whether the problem that started the ticket has stopped.`],
 ['Illustrative example of a support note',`Suppose a household has a file upload that often stalls on weekday evenings. They try the same wired laptop, destination and test mode during an affected evening and again at a quiet time. The quiet run completes and the evening run fails during upload. Those are illustrative outcomes. They keep the failed attempt in the log and attach the quiet result as a baseline.

Their note could read, “Our wired laptop can send the same work file in the morning. On weekday evenings it stalls, and the upload phase of a browser test also stopped. We paused our backups and checked that Ethernet was active. The attached log gives the times and destination. Can you check the service at the affected times and tell us which wired test you want us to repeat?”

This note gives the provider observations without assigning blame. If support asks for a different test, the household can run it during the same two periods and preserve both sets of results.`],
 ['Keep a timeline when the fault comes and goes',`For an intermittent fault, add an entry when it starts and another when service recovers. Include the activity, which devices were affected and whether the modem or router restarted. If you checked the provider’s status page, record what it showed and when. When a device reconnects, keep that event in the timeline even if a speed test immediately afterward succeeds. A technician may be able to match these observations to equipment events. Avoid rebooting repeatedly while you collect evidence unless the provider directs you to do so. A restart changes the state you were trying to observe. If restarting is necessary to restore service, note the time and what returned afterward. A short timeline can also help support distinguish one long fault from several unrelated disruptions.`],
 ['Common questions about evidence for support',`Should I send only the worst result? Include a representative affected result and a comparison. A series that shows the range helps support tell a recurring problem from an unusual run.

What if I cannot connect by Ethernet? Explain that limitation and test near the router on the same device. Record the band if you can. Ask whether the provider offers a test from its equipment.

Can a screenshot replace the CSV? A screenshot can show the visible status and destination. A CSV makes completed results easier to compare. Either can help if you also supply the conditions and timestamps.

What if support says its own test is fine? Ask what path that test covers and share the task that still fails. A result from the router to the provider can coexist with a problem on the device or application path. Use the next test to narrow the difference.`],
 ],
},
{
 slug:'mbps-vs-mbs',title:'Mbps vs MB/s: convert speeds and estimate transfer time',searchTitle:'Mbps vs MB/s and Transfer Time',
 category:'THE BASICS',art:'arrows',description:'Convert megabits to megabytes, handle decimal and binary file sizes, and calculate a useful transfer-time estimate.',
 tool:{href:'/tools/',label:'Calculate download or upload time'},related:['download-vs-upload-speed','video-call-internet-speed','how-to-test-internet-speed'],
 sections:[
 ['Read the unit before comparing two numbers',`Internet plans and speed tests usually report rates in megabits per second, written Mbps. File managers often report data in bytes, and transfer windows may display megabytes per second, written MB/s. One byte contains eight bits. A number in megabits per second is eight times its equivalent number in decimal megabytes per second.

Look for a lowercase b for bits and an uppercase B for bytes. A screenshot that cuts off the unit loses the most important part of the comparison. Check the application’s documentation if the label is unclear. A file size such as 250 MB describes an amount. A rate such as 25 MB/s describes how quickly an amount moves. A speed reading of 250 Mbps and a file size of 250 MB require conversion before you can estimate time.

Use the direction that matches the job. Sending a folder uses upload speed. Receiving a software update uses download speed. A single plan can have different rates in the two directions, so an estimate based on the larger number can be misleading.`],
 ['Choose decimal or binary units consistently',`In decimal notation, one MB is one million bytes and one GB is one billion bytes. A decimal megabit contains one million bits. For these units, dividing Mbps by eight gives MB/s. A 160 Mbps link therefore corresponds to 20 MB/s at the same effective payload rate.

Binary sizes use different prefixes. One MiB is 1,048,576 bytes and one GiB is 1,073,741,824 bytes. Some applications still display a familiar MB or GB label while counting in binary. If precision matters, use the file’s exact byte count from its properties. Multiply bytes by eight to get bits, then divide by the rate expressed in bits per second. Convert a decimal Mbps rate to bits per second by multiplying it by one million.

Small differences due to labeling matter more when the file is large or the deadline is tight. Keep the units with each number on paper or in a spreadsheet. It is easier to spot a factor-of-eight mistake when each line shows what it represents.`],
 ['Calculate time in seconds first',`For a file listed in decimal MB, multiply its size by eight and divide by the sustained rate in Mbps. This gives an estimate in seconds. If the file is in decimal GB, multiply by one thousand to get MB before applying the formula. Convert seconds to minutes only after doing the division.

You can also work directly with a transfer rate shown in MB/s. Divide decimal MB by decimal MB/s to get seconds. Check whether the app uses a recent instantaneous rate or an average across the transfer. A rapidly moving estimate may be based on a short window.

Use the size that actually travels if you know it. A cloud client may transfer only modified blocks, compress some content or sync multiple files in parallel. An archive changes the bytes sent. The raw folder size is still a reasonable starting point if you state the assumption.

For a batch of separate transfers, calculate each direction independently. If the jobs run at the same time, they can affect each other. A combined prediction needs an estimate of the rates each will actually sustain.`],
 ['Allow for the application and the path',`A speed test uses a chosen measurement destination. Your backup, game update or shared folder has a different destination and may limit the rate per transfer. The device may also spend time encrypting, scanning, unpacking or writing data. Check whether the application separates transfer progress from installation or verification progress.

Use a recent sustained rate from the actual app when it is available. Compare it with the speed test to decide where to investigate. If every transfer is slow, test the connection under controlled conditions. If only one service is slow, compare it with another permitted destination or check the application’s status and limits.

When planning a deadline, calculate a range. Use a rate that represents an ordinary quiet period and another that represents the slower periods you have actually observed. Add time for startup or processing if the task has those phases. Revising the estimate after the transfer begins is more useful than assuming a plan’s advertised maximum will hold from beginning to end.`],
 ['Calculated example of an upload deadline',`Suppose you need to upload a 2.4 GB archive. Assume decimal units and a steady 24 Mbps upload rate. The archive is 2,400 MB or 19,200 megabits. Dividing by 24 gives 800 seconds, which is 13 minutes and 20 seconds. This is a calculated example with idealized inputs.

If the same app has previously sustained only 12 Mbps during the afternoon, use that rate for a second estimate. The calculation gives 1,600 seconds, or 26 minutes and 40 seconds. These two estimates describe different assumptions about the observed upload rate. Neither includes any time to verify the file after arrival.

If the app instead reports 2 MB/s, multiply by eight to get 16 Mbps, or divide 2,400 MB directly by 2 MB/s. Either method gives 1,200 seconds, which is 20 minutes. Checking the answer both ways is a good way to catch a misplaced conversion. For a deadline, include any login, retry and server processing time that the transfer display leaves out.`],
 ['Check the meaning of time remaining',`Some applications estimate time from the amount still to transfer and a moving average of recent speed. Early estimates can swing while the transfer settles. When multiple files are involved, small files may also take time to open and verify even if their combined size is modest. If a transfer reaches completion but the app still shows processing, record the transfer and processing phases separately. This helps with planning when you repeat the job next week. A shorter transfer estimate only helps the deadline if the recipient can open or use the result in time.`],
 ['Questions about Mbps and MB/s',`Why does a 100 Mbps plan show about 12 MB/s in my download app? At an identical effective rate, 100 Mbps converts to 12.5 decimal MB/s. A reading around 12 MB/s is in that neighborhood. Check the unit and compare a sustained interval before investigating a discrepancy.

Can I compare a Wi-Fi link rate with an app’s MB/s? Convert the units if you need a common scale. The Wi-Fi figure describes a radio link rate, while the app reports data received on a path with overhead and possible bottlenecks. Their values can differ even after conversion.

How can I estimate a transfer from progress alone? Measure how much data arrived over a known interval and divide by the elapsed seconds. Use that average to estimate the remaining amount. Repeat if the rate changes.

Does a compressed file arrive faster? A smaller transmitted file needs less transfer time at the same rate. Add any time needed to create or unpack it if the deadline includes those steps.`],
 ],
},
];
