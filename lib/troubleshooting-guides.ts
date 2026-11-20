import type {NewGuide} from './new-guides';

export const troubleshootingGuides: NewGuide[] = [
 {
  slug:'tv-buffering-fast-internet',title:'TV buffering despite fast internet? Compare the playback path',
  searchTitle:'TV Buffering Despite Fast Internet?',category:'TROUBLESHOOTING',art:'wifi',
  description:'Check the streaming device, service and Wi-Fi path when videos pause even though a speed test looks healthy.',
  tool:{href:'/4k-streaming-speed-test/',label:'Check bandwidth in the viewing room'},
  related:['router-placement-guide','ethernet-vs-wifi','how-much-internet-speed-do-i-need'],
  sections:[
   ['Check the app and the affected device','Record whether playback pauses, quality drops or the app shows an error. Try a different title on the same app, then another streaming app on the same TV if available. If one title fails while others play, check that service’s status and support guidance. If all apps fail only on one device, check the device’s software updates and restart it using the manufacturer’s instructions.'],
   ['Measure where the TV actually connects','A wired laptop near the router can show healthy throughput while the television has poor Wi-Fi in another room. Run a browser test near the TV on the same network and band where practical. A nearby laptop is a comparison device with its own radio, so also use the TV or streaming app’s connection check if it provides one. Record whether the TV uses the router directly, a mesh node or an extender.'],
   ['Try a wired comparison before changing plans','If the device supports Ethernet, try a temporary cable routed safely away from walkways. Some streaming devices need a compatible adapter. Retry the same app and title during a similar time window. If playback becomes reliable on Ethernet, investigate the wireless path, node placement and interference. If both connections buffer, compare another device or service and pause large household transfers.'],
   ['Check quality settings and simultaneous use','Confirm that the app, device and subscription support the selected resolution, and use the service’s published speed requirements. Temporarily choosing a lower quality can help you test whether playback becomes stable with less traffic. Keep the comparison on the same device and title. If another household member is downloading or uploading, pause that activity once and retry. Record the change that helped.'],
   ['Illustrative example','A TV pauses in two apps while a wired laptop records a fast speed test. A temporary Ethernet connection makes the same TV play reliably during the usual viewing period. These are illustrative observations. They point toward checking the TV’s Wi-Fi path before paying for a faster broadband plan. The next comparison could be a better mesh-node position, followed by playback on the TV again.'],
   ['Does a fast test guarantee smooth 4K playback?','A browser test measures traffic to a test server at that moment. Your streaming service uses a different destination, and throughput can change during a film. If the problem persists, report the app, title, time, device and wired comparison to the service or provider. Hide account details and any private viewing information when sharing screenshots.'],
  ],
 },

 {
  slug:'dns-server-not-responding',title:'DNS server not responding? Test name lookup first',
  searchTitle:'DNS Server Not Responding? What to Check',category:'TROUBLESHOOTING',art:'test',
  description:'Compare name lookups, devices and browser settings to investigate DNS errors without changing your entire network at once.',
  tool:{href:'/help/',label:'Get help with a test that cannot connect'},
  related:['one-website-wont-load','wifi-connected-no-internet','speed-test-evidence-for-provider'],
  sections:[
   ['Check the exact message and scope','Write down the browser error and try two unrelated public websites. A DNS failure means a name lookup did not produce a usable answer for that request. An NXDOMAIN response indicates that the queried name was reported as nonexistent, while a timeout means no answer arrived within the waiting period. Check spelling before changing settings. A missing page that returns HTTP 404 has already reached a web server and calls for a different investigation.'],
   ['Compare a working name with the affected name','On Windows, open Command Prompt and run nslookup example.com, then repeat with the affected public hostname. Keep just the hostname, such as example.com, rather than the full page URL. Record the responding DNS server and whether you receive an answer, a timeout or an error. If one name fails and the other resolves, check the affected website’s status. If both fail, compare a second device on the same network. Avoid including private company hostnames in a public support post.'],
   ['Separate browser DNS from operating-system DNS','A browser configured to use secure DNS can send lookups through a different resolver from the one used by nslookup. A VPN may also supply a separate resolver or routes for company names. Compare the browser’s settings with the active network settings. Preserve employer, school and family filtering requirements. If the browser alone fails, test another browser under the same network conditions and record which resolver configuration differs.'],
   ['Try one controlled resolver comparison','On a personal network where you can choose the resolver, run nslookup example.com 1.1.1.1 to query Cloudflare’s public resolver directly. Use a public name you expect to resolve. If this succeeds while the default resolver times out, repeat the pair before changing anything. That pattern gives you evidence to investigate the default resolver or the route to it. A failed direct query can also reflect network policy. If you change DNS settings, save the original values and follow the provider’s device-specific instructions. Test the affected task again, including any local names you use.'],
   ['Illustrative example','A home laptop times out when looking up two public names through its default resolver. A direct lookup through an allowed alternate resolver succeeds twice. Another device on the same home network has the same pattern. In this illustrative scenario, record the time and resolver addresses and ask the provider whether its DNS service has an issue. A speed test alone would add little while the names needed to reach websites cannot resolve.'],
   ['Will changing DNS increase download speed?','DNS helps a device find an address before it connects. Improving a failing or slow lookup may help pages begin loading, but it does not increase the capacity of your broadband line. If names resolve and files still transfer slowly, return to a controlled throughput comparison. For recurring DNS errors, keep the exact response and affected names so support can investigate them.'],
  ],
 },

 {
  slug:'one-website-wont-load', title:'One website won’t load? How to find the cause',
  searchTitle:'Why One Website Won’t Load', category:'TROUBLESHOOTING', art:'test',
  description:'Compare browsers, devices and networks to diagnose a single website that fails while the rest of the internet works.',
  tool:{href:'/help/',label:'Troubleshoot InternetSpeed Pulse if the test page fails'},
  related:['dns-server-not-responding','wifi-connected-no-internet','does-vpn-slow-internet'],
  sections:[
   ['Check the address and exact error','Open a familiar unrelated site first. Then type the affected site’s official address or open a trusted bookmark. Compare the homepage with the specific link that failed. If the homepage works and one link gives a 404, the link may have moved. If the browser shows a certificate or security warning, stop and verify the address and your device clock before returning.'],
   ['Compare browsers on the same device','Try the same address in a private window or another browser. A private window starts with separate site data, and whether an extension runs there depends on your settings. If the page only fails in your regular browser, check extensions and try clearing data for that site. Clearing its cookies can sign you out. A private window may also look different because you are signed out, so compare the same public page first.'],
   ['Compare devices and connections','Try the exact URL on a second device on the same network. Then, if your data plan allows, check once from a phone using cellular data. If both home devices fail but the mobile test works, record both networks and the error. DNS, filtering or routing may differ. Check for a service notice from the website and keep any required work or school security settings in place.'],
   ['Illustrative example','A store’s homepage works in every browser, but its checkout fails in one desktop browser. The same checkout loads in another browser on the same device. In this illustrative case, check the first browser’s site data and extensions. The comparison gives the store a more useful report than a speed test result alone.'],
   ['Can a speed test tell me whether the website is down?','A speed test measures a path to its own server. A healthy result can coexist with a problem on another route or with the website itself. Send the site operator the public URL, time zone, exact error and the browser and network comparisons. Remove login tokens, account information and payment details before sharing screenshots or links.'],
  ],
 },
 {
  slug:'wifi-connected-no-internet', title:'Wi-Fi connected but no internet? What to check',
  searchTitle:'Wi-Fi Connected but No Internet?', category:'TROUBLESHOOTING', art:'wifi',
  description:'Check whether a connected Wi-Fi device is behind a sign-in page, has an address problem, or has lost access beyond the router.',
  tool:{href:'/help/',label:'Get help if your speed test cannot start'},
  related:['one-website-wont-load','internet-keeps-disconnecting','why-is-my-wifi-so-slow'],
  sections:[
   ['Check whether the warning matches what you can open','A connected Wi-Fi icon means your device joined the wireless network. Try two unrelated sites in the browser and check whether other apps work. If websites work despite the warning, the operating system’s connectivity check may have failed on its own. If only one site fails, record the address and error before changing any network settings.'],
   ['Look for a sign-in prompt on guest Wi-Fi','A hotel, airport or café network may need you to accept terms or sign in before it allows internet traffic. Verify the network name with the venue and look for your device’s sign-in notification. Disconnect if you cannot verify the network or if the page asks you to ignore a certificate warning. On a managed device, consult IT if the sign-in step is blocked.'],
   ['Compare another device on the same network','Try the same sites on a second device connected to the same Wi-Fi network. On a phone, temporarily turn off cellular data so it cannot quietly provide the connection. If both devices fail, check Ethernet if available and look for an outage on the provider’s status page using a separate connection. If only one device fails, reconnect that device and inspect its network details before restarting the router.'],
   ['Check the device address and name lookup','On Windows, run ipconfig in Command Prompt and inspect the Wi-Fi adapter. On a typical home network, a 169.254.x.x IPv4 address with no default gateway suggests the device did not receive its usual IPv4 settings. Compare with a working device and check that automatic addressing is configured if your network uses it. If the address and gateway look normal, try nslookup example.com. A failed lookup across several domains can point to a DNS problem, although browser DNS settings and VPNs can make browser behavior differ. Keep any required work settings in place and share the error with IT.'],
   ['Illustrative example','A guest laptop shows connected, but two websites fail. A phone on the same network also fails with mobile data disabled. The venue confirms the network name, and both devices work after completing the guest sign-in page. In this illustrative case, the fastest next check was the portal, because both devices could join Wi-Fi and needed the same access step.'],
   ['When is a speed test useful?','Once ordinary pages load, a speed test can help if the connection still feels slow. If access comes and goes, record when it fails and which devices are affected. Report a recurring loss of access with those observations, even if a test after recovery shows normal throughput.'],
  ],
 },
 {
  slug:'internet-slow-at-night', title:'Why is my internet slow at night?', searchTitle:'Why Is My Internet Slow at Night?',
  category:'TROUBLESHOOTING', art:'test',
  description:'Compare daytime and evening speeds to narrow down household traffic, Wi-Fi problems and wider connection slowdowns.',
  tool:{href:'/',label:'Run a controlled speed test'},
  related:['how-to-test-internet-speed','speed-test-evidence-for-provider','why-is-my-wifi-so-slow'],
  sections:[
   ['Compare a quiet period with the time you notice trouble','Use the same device, server option and test mode in both periods. If you can, connect by Ethernet and turn off Wi-Fi on the test device. Record the time zone, download, upload and the application that felt slow. Repeat on another day if your data allowance permits.'],
   ['Try the affected task with household uploads paused','Check whether a backup, camera upload or game update starts around that time. Pause one transfer and try the call or other affected task again. If performance improves consistently, move that transfer outside the busy period or check whether its app can limit the rate.'],
   ['Check whether the slowdown follows the room or the destination','If Ethernet stays steady, use the same device on Wi-Fi in the room where things slow down. If Ethernet also slows with other traffic paused, compare a second test destination and check your provider’s outage page. Keep results from each destination separate.'],
   ['Illustrative example','A wired laptop measures 180 Mbps in the afternoon and 55 Mbps after dinner, using the same server option. On a second evening, results are similarly low at two destinations with backups paused. Those figures are illustrative. The household can share the timed readings and plan terms with support, although the comparison alone cannot locate the bottleneck.'],
   ['Would a faster plan help?','It may help if simultaneous activities repeatedly use the capacity of your plan. If a quiet wired connection also slows at the same time each night, ask your provider which test procedure it accepts and send your recorded comparisons.'],
  ],
 },
 {
  slug:'internet-keeps-disconnecting', title:'Internet keeps disconnecting? Find where the drop starts', searchTitle:'Internet Keeps Disconnecting? What to Check',
  category:'TROUBLESHOOTING', art:'wifi',
  description:'Compare devices, Wi-Fi and Ethernet during an outage and keep a short record of recurring drops.',
  tool:{href:'/help/',label:'Get help with interrupted speed tests'},
  related:['ethernet-vs-wifi','router-placement-guide','speed-test-evidence-for-provider'],
  sections:[
   ['Check a second device during the drop','Try two unrelated sites on another device on the same home network. Temporarily turn off cellular data on a phone if it might hide Wi-Fi failure. If one app fails while the others work, write down its error. If only one device loses access, check its Wi-Fi association, network settings and any required VPN.'],
   ['Keep one wired device ready','If you can, connect a laptop by Ethernet and turn off Wi-Fi on it. Check it while another device is experiencing the drop. If Ethernet still works, record the affected room, Wi-Fi band and access point. If both fail, note the router and modem lights and use cellular data to check the provider’s outage page.'],
   ['Check whether Windows can still reach the router','Run ipconfig in Command Prompt and note the Default Gateway for the active connection. Run ping followed by that address during healthy service and again during an outage. If the router usually replies and then stops, investigate the local path. Some routers ignore ping. A reply confirms that the router answered at that moment.'],
   ['Illustrative example','Two devices lose access upstairs while a wired desktop downstairs still loads websites. The wireless devices recover near the router. This imagined pattern gives you a reason to check the connection between the upstairs mesh node and the router. Change one thing, then retest from the same room.'],
   ['What should I record before restarting?','Capture the time, duration, affected devices and status lights. If you need to restart the equipment to restore service, record what came back. Log any interrupted tests as incomplete and send the provider the outage timeline so it can compare the times with its own records.'],
  ],
 },
];
