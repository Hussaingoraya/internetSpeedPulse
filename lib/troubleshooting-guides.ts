import type {NewGuide} from './new-guides';

export const troubleshootingGuides: NewGuide[] = [
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
