export const median=values=>{if(!values.length)return null;const a=[...values].sort((x,y)=>x-y),mid=Math.floor(a.length/2);return a.length%2?a[mid]:(a[mid-1]+a[mid])/2;};
export function parseRate(value){if(value===''||value===null||value===undefined)return null;const n=Number(value);return Number.isFinite(n)&&n>=0?n:null;}
export function selectCandidate(candidates){const usable=candidates.filter(x=>Number.isFinite(x.latency)&&x.latency>=0);if(!usable.length)throw new Error('No measurement server responded.');return [...usable].sort((a,b)=>a.latency-b.latency)[0];}
export function adaptiveDownloadBytes(bytes,duration){const rate=bytes*1000/Math.max(duration,1);return Math.min(32000000,Math.max(1000000,Math.ceil(rate*2/1000000)*1000000));}
export const engineId='librespeed-sustained-v1';
