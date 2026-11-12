// Editorial dates change only when the corresponding page is edited.
// All six guides were extended on 2026-11-12.
export function articleModifiedDate(slug:string) {
 return '2026-11-12';
}
export function displayContentDate(date:string) {
 return new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(`${date}T00:00:00Z`));
}
