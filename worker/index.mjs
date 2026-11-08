const noCache={'Cache-Control':'no-store, no-cache, must-revalidate, no-transform','X-Content-Type-Options':'nosniff'};
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{...noCache,'Content-Type':'application/json'}});
export async function handleAPI(request, {uploadTimeoutMs=15000} = {}) {
 const url=new URL(request.url), path=url.pathname.replace(/\/$/,'');
 if(!path.startsWith('/api/'))return null;
 if(path.startsWith('/api/speed/') && request.headers.get('Sec-Fetch-Site')==='cross-site')return json({error:'Cross-site measurements are not allowed.'},403);
 if(path==='/api/connection'&&request.method==='GET') {
  const cf=request.cf||{};
  const hosting=cf.asn===13335||/^cloudflare(?:\s|,|$)/i.test(cf.asOrganization||'');
  const etisalat=cf.asn===5384||cf.asn===8966;
  return json({ip:request.headers.get('CF-Connecting-IP')||null,isp:hosting?null:etisalat?'Etisalat (e& UAE)':cf.asOrganization||null,asn:hosting?null:cf.asn||null,city:cf.city||null,country:cf.country||null,edge:cf.colo||null});
 }
 if(path==='/api/speed/download'&&request.method==='GET') {
  const bytes=Number(url.searchParams.get('bytes')||'0');
  if(!Number.isInteger(bytes)||bytes<0||bytes>8000000)return json({error:'Payload must be between 0 and 8,000,000 bytes.'},400);
  let sent=0;
  const stream=new ReadableStream({pull(controller){
   if(request.signal.aborted||sent>=bytes){controller.close();return;}
   const block=new Uint8Array(Math.min(65536,bytes-sent));
   // Fresh bytes in every block avoid compression of a repeated random pattern.
   crypto.getRandomValues(block);controller.enqueue(block);sent+=block.length;
  }});
  return new Response(stream,{headers:{...noCache,'Content-Type':'application/octet-stream','Content-Length':String(bytes)}});
 }
 if(path==='/api/speed/upload'&&request.method==='POST') {
  const origin=request.headers.get('Origin');
  if(origin&&origin!==url.origin)return json({error:'Cross-site uploads are not allowed.'},403);
  const rawLength=request.headers.get('Content-Length'), length=rawLength===null?null:Number(rawLength);
  if(length!==null&&(!Number.isInteger(length)||length<0))return json({error:'Invalid Content-Length.'},400);
  if(length!==null&&length>8000000)return json({error:'Payload too large.'},413);
  let bytes=0,timer;
  const reader=request.body?.getReader();
  if(!reader)return json({received:0});
  let onAbort;
  const abort=new Promise((_,reject)=>{onAbort=()=>reject(request.signal.reason||new Error('Request aborted'));request.signal.addEventListener('abort',onAbort,{once:true});if(request.signal.aborted)onAbort();});
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Upload timed out')),uploadTimeoutMs);});
  try {
   while(true){const part=await Promise.race([reader.read(),deadline,abort]);if(part.done)break;bytes+=part.value.byteLength;if(bytes>8000000){void reader.cancel().catch(()=>{});return json({error:'Payload too large.'},413);}}
   if(length!==null&&length!==bytes)return json({error:'Incomplete upload body.'},400);
   return json({received:bytes});
  } catch {void reader.cancel().catch(()=>{});return json({error:'Upload timed out or was interrupted.'},408);}
  finally{clearTimeout(timer);request.signal.removeEventListener('abort',onAbort);reader.releaseLock();}
 }
 return json({error:'Not found or unsupported method.'},404);
}
export function createWorker(assets){return {async fetch(request){const api=await handleAPI(request);if(api)return api;const url=new URL(request.url);if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});let path;try{path=decodeURIComponent(url.pathname);}catch{return new Response('Bad path',{status:400});}let asset=assets[path]||assets[path.endsWith('/')?path+'index.html':path+'/index.html'];let status=200;if(!asset){asset=assets['/404.html'];status=404;}if(!asset)return new Response('Not found',{status:404});const binary=atob(asset.body);const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));return new Response(request.method==='HEAD'?null:bytes,{status,headers:{'Content-Type':asset.type,'Cache-Control':path.startsWith('/_next/static/')?'public, max-age=31536000, immutable':'no-cache','X-Content-Type-Options':'nosniff'}});}};}
