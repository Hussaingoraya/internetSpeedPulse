// A conservative, per-process safety valve, not a distributed billing limit.
// Reserve declared payloads before serving; aborted requests are not refunded.
export function createTransferBudget({limit=10000000000,periodMs=3600000,now=Date.now}={}) {
 let start=now(),reserved=0;
 return bytes=>{
  const time=now();
  if(time-start>=periodMs){start=time;reserved=0;}
  if(!Number.isSafeInteger(bytes)||bytes<0)return {allowed:false,retryAfter:0};
  const allowed=reserved+bytes<=limit;
  if(allowed)reserved+=bytes;
  return {allowed,retryAfter:Math.max(1,Math.ceil((start+periodMs-time)/1000))};
 };
}
