export const servers = [
 {id:'cloudflare',name:'Cloudflare',region:'Automatic global edge',description:'Routed automatically by Cloudflare to a nearby global edge node for sustained download, upload and latency tests.',down:'https://speed.cloudflare.com/__down',up:'https://speed.cloudflare.com/__up'}
] as const;
export type ServerId = typeof servers[number]['id'] | 'auto';
export const speedUnits=['Mbps','Kbps','MB/s'] as const;
export type SpeedUnit=typeof speedUnits[number];
export function displaySpeed(mbps:number,unit:SpeedUnit) {
 return unit==='Kbps'?mbps*1000:unit==='MB/s'?mbps/8:mbps;
}
export type TestMode = 'single'|'multi';
export type TestResult = {download:number|null;upload:number|null;ping:number|null;jitter:number|null;date:string;server?:string;mode?:TestMode;duration?:number;engine?:string;downloadLatency?:number|null;uploadLatency?:number|null};
export const historyKey='pulse-history';
export const validNumber=(n:unknown):n is number=>typeof n==='number'&&Number.isFinite(n)&&n>=0;
export function readHistory():TestResult[]{try{const parsed=JSON.parse(localStorage.getItem(historyKey)||'[]');if(!Array.isArray(parsed))return [];return parsed.filter(r=>r&&typeof r.date==='string'&&Number.isFinite(Date.parse(r.date))&&['download','upload','ping','jitter'].every(k=>validNumber(r[k]))).slice(0,10);}catch{return [];}}
export function downloadCSV(rows:TestResult[]){if(!rows.length)return;const cell=(v:unknown)=>`"${String(v??'').replaceAll('"','""')}"`;const lines=[['Time (UTC)','Download (Mbps)','Upload (Mbps)','Latency (ms)','Jitter (ms)','Server','Mode','Engine','Download loaded latency (ms)','Upload loaded latency (ms)'],...rows.map(r=>[r.date,r.download,r.upload,r.ping,r.jitter,r.server||'Cloudflare',r.mode||'single',r.engine||'legacy-quick-test',r.downloadLatency??'',r.uploadLatency??''])];const blob=new Blob([lines.map(row=>row.map(cell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='internetspeed-pulse-results.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
