// Editorial dates change only when the corresponding page is edited.
const queryUpdatedArticles = new Set([
 'download-vs-upload-speed',
 'how-much-internet-speed-do-i-need',
 'how-to-test-internet-speed',
 'why-is-my-wifi-so-slow',
]);
export function articleModifiedDate(slug:string) {
 return queryUpdatedArticles.has(slug)?'2026-11-11':'2026-11-08';
}
export function displayContentDate(date:string) {
 return new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(`${date}T00:00:00Z`));
}
