export const guideExamples: Record<string, {title: string; text: string; link: string; label: string}> = {
  'what-is-a-good-internet-speed': {
    title: 'Worked example: two streams and a backup',
    text: 'Illustrative budget, not a measured household: two 4K streams at 15 Mbps each need 30 Mbps of download capacity before other activity. A 50 Mbps connection may leave useful headroom, while a backup can still fill a small upload allowance and disrupt calls. Check both directions before changing plans. Netflix recommends at least 15 Mbps for a single 4K stream; other services and picture settings differ.',
    link: '/tools/', label: 'Estimate a download time or household speed budget',
  },
  'how-to-test-internet-speed': {
    title: 'A repeatable test record',
    text: 'Record the time, device, Ethernet or Wi-Fi, selected server, Single or Multi mode, VPN status, download, upload and latency. For hypothetical downloads of 82, 94 and 88 Mbps under the same conditions, the middle value is 88 Mbps and the range is 82–94 Mbps. Keep all three rather than reporting only the fastest. Switching servers between runs changes the path being compared.',
    link: '/history/', label: 'Manage optional results stored on this device',
  },
  'why-is-my-wifi-so-slow': {
    title: 'Use the pattern to choose your next check',
    text: 'Hypothetical example: Ethernet measures 280 Mbps, Wi-Fi next to the router measures 240 Mbps, and the bedroom measures 35 Mbps on the same device and server. That pattern points toward coverage or interference in the bedroom. If Ethernet and nearby Wi-Fi both measure 35 Mbps, investigate competing traffic, equipment and the provider path instead. These examples are diagnostic clues, not proof of a fault.',
    link: '/blog/how-to-test-internet-speed/', label: 'Follow the controlled testing procedure',
  },
  'download-vs-upload-speed': {
    title: 'Worked example: sending a 1 GB file',
    text: 'Using decimal units, 1 GB is 8,000 megabits. At a steady 20 Mbps upload, the ideal transfer takes 400 seconds, or 6 minutes 40 seconds. At 100 Mbps it takes 80 seconds. These are calculated examples; protocol overhead, Wi-Fi conditions and the receiving service can make the actual transfer longer. A faster download allowance alone does not shorten an upload.',
    link: '/tools/', label: 'Calculate another ideal transfer time',
  },
  'ping-and-jitter-explained': {
    title: 'Read idle and loaded latency together',
    text: 'Hypothetical readings of 12 ms idle and 180 ms during upload suggest that responsiveness worsens while the outgoing path is busy. Pause a backup and repeat before changing router settings. Our loaded-latency values are median HTTP probe times during each transfer phase; they are not ICMP measurements or latency to your game server. They can be unavailable when probes fail.',
    link: '/methodology/', label: 'Read exactly how latency is measured',
  },
  'how-much-internet-speed-do-i-need': {
    title: 'Build a budget for the busiest hour',
    text: 'Illustrative household: allow 30 Mbps for two 4K streams using 15 Mbps per stream, then add capacity for browsing and updates. A 50–75 Mbps download budget could be a starting point under these assumptions. Upload requirements need a separate budget for calls and backups. Measure the connection in the rooms you use: buying more incoming bandwidth does not repair weak Wi-Fi coverage.',
    link: '/tools/', label: 'Try the household speed calculator',
  },
};
