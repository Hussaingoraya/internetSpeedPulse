const appleWiFi = {label:'Apple router settings and Wi-Fi guidance',url:'https://support.apple.com/en-us/102766'};
const broadband = {label:'Ofcom practical broadband testing guidance',url:'https://www.ofcom.org.uk/phones-and-broadband/coverage-and-speeds/broadband-speeds'};
const cloudflare = {label:'Cloudflare connection speed testing documentation',url:'https://developers.cloudflare.com/fundamentals/performance/test-speed/'};

export const newGuideSources: Record<string, {label:string; url:string}[]> = {
 'why-is-my-wifi-so-slow': [{label:'Microsoft: troubleshoot slow Wi-Fi and background traffic',url:'https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows'},{label:'Microsoft: collect wireless evidence and check device drivers',url:'https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/wireless-network-connectivity-issues-troubleshooting'},{label:'Apple: investigate VPN and security software connectivity issues',url:'https://support.apple.com/en-gb/102281'}],
 'tv-buffering-fast-internet': [{label:'Google streaming device connection troubleshooting',url:'https://support.google.com/chromecast/answer/10109908?hl=en'},{label:'Netflix video quality and connection guidance',url:'https://help.netflix.com/en/node/13444/'}],
 'dns-server-not-responding': [{label:'Microsoft DNS lookup troubleshooting',url:'https://learn.microsoft.com/windows-server/networking/dns/troubleshoot/troubleshoot-dns-server'},{label:'Cloudflare resolver setup and secure DNS',url:'https://developers.cloudflare.com/1.1.1.1/setup/'}],
 'one-website-wont-load': [{label:'Microsoft Edge troubleshooting for pages that fail to load',url:'https://support.microsoft.com/en-gb/edge/what-to-do-if-microsoft-edge-isn-t-working'}],
 'wifi-connected-no-internet': [{label:'Microsoft guidance for connected Wi-Fi with no internet',url:'https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows'}],
 'internet-slow-at-night': [broadband],
 'internet-keeps-disconnecting': [{label:'Microsoft Wi-Fi connection troubleshooting',url:'https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows'}],
 'wifi-bands-24-5-6-ghz': [appleWiFi],
 'does-vpn-slow-internet': [{label:'Microsoft documentation on VPN routing',url:'https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/vpn/vpn-routing'}],
 'why-speed-tests-differ': [cloudflare],
 'speed-test-mobile-data': [{label:'Apple documentation on cellular data and roaming settings',url:'https://support.apple.com/guide/iphone/view-or-change-cellular-data-settings-iph3dd5f213/ios'}],
 'video-call-internet-speed': [{label:'Zoom Web App bandwidth requirements',url:'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0058323'}],
 'router-placement-guide': [broadband,appleWiFi],
 'ethernet-vs-wifi': [broadband,{label:'TP-Link guide to checking Ethernet link speed',url:'https://www.tp-link.com/us/support/faq/2899/'}],
 'speed-test-evidence-for-provider': [broadband],
 'mbps-vs-mbs': [{label:'NIST guide to decimal and binary prefixes',url:'https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-4-two-classes-si-units-and-si-prefixes'}],
};
