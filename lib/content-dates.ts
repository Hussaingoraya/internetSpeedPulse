type ArticleDates = {published: string; modified: string};

// Dates reflect editorial changes in the site's Asia/Dubai time zone.
const originalGuide = {published:'2026-11-05',modified:'2026-11-12'};
const dates: Record<string, ArticleDates> = {
 'what-is-a-good-internet-speed': {...originalGuide},
 'how-to-test-internet-speed': {...originalGuide},
 'why-is-my-wifi-so-slow': {...originalGuide},
 'download-vs-upload-speed': {...originalGuide},
 'ping-and-jitter-explained': {...originalGuide},
 'how-much-internet-speed-do-i-need': {...originalGuide},
 'wifi-bands-24-5-6-ghz': {published:'2026-11-12',modified:'2026-11-12'},
 'does-vpn-slow-internet': {published:'2026-11-12',modified:'2026-11-12'},
 'why-speed-tests-differ': {published:'2026-11-12',modified:'2026-11-12'},
 'speed-test-mobile-data': {published:'2026-11-12',modified:'2026-11-12'},
 'video-call-internet-speed': {published:'2026-11-12',modified:'2026-11-12'},
 'router-placement-guide': {published:'2026-11-12',modified:'2026-11-12'},
 'ethernet-vs-wifi': {published:'2026-11-12',modified:'2026-11-12'},
 'speed-test-evidence-for-provider': {published:'2026-11-12',modified:'2026-11-12'},
 'mbps-vs-mbs': {published:'2026-11-12',modified:'2026-11-12'},
};

export function getArticleDates(slug: string) {
 const entry = dates[slug];
 if (!entry) throw new Error(`Missing editorial dates for ${slug}`);
 return entry;
}

export function articleModifiedDate(slug: string) {
 return getArticleDates(slug).modified;
}

export function displayContentDate(date: string) {
 return new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(`${date}T00:00:00Z`));
}
