import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

function engine(settings) {
 let time=10000,listener,id=0;
 const timers=new Map(),requests=[],messages=[];
 const schedule=(fn,delay=0,repeat=0)=>{const key=++id;timers.set(key,{fn,at:time+Math.max(1,delay),repeat});return key;};
 class Clock extends Date {constructor(...args){super(...(args.length?args:[time]));}static now(){return time;}}
 class XHR {
  upload={}; status=200; response=null; aborted=false;
  open(method,url){this.method=method;this.url=url;this.responseURL=url;}
  send(body){this.body=body;requests.push(this);}
  abort(){this.aborted=true;}
  getResponseHeader(){return 'application/octet-stream';}
  setRequestHeader(){}
 }
 const context={navigator:{userAgent:'test'},self:{fetch:()=>{}},performance:{getEntriesByName:()=>[{requestStart:1,responseStart:4}]},XMLHttpRequest:XHR,Blob,ArrayBuffer,Uint32Array,Date:Clock,Math,JSON,console,
  setTimeout:(fn,ms)=>schedule(fn,ms),clearTimeout:key=>timers.delete(key),setInterval:(fn,ms)=>schedule(fn,ms,ms),clearInterval:key=>timers.delete(key),postMessage:value=>messages.push(JSON.parse(value)),addEventListener:(_,fn)=>{listener=fn;}};
 vm.runInNewContext(readFileSync('public/vendor/librespeed/speedtest_worker.js','utf8'),context);
 const send=data=>listener({data});
 const advance=ms=>{const end=time+ms;let count=0;while(true){const next=[...timers].sort((a,b)=>a[1].at-b[1].at)[0];if(!next||next[1].at>end)break;if(++count>10000)throw Error('Timer loop');const [key,timer]=next;time=timer.at;if(timer.repeat)timer.at+=timer.repeat;else timers.delete(key);timer.fn();}time=end;};
 const status=()=>{send('status');return messages.at(-1);};
 send('start '+JSON.stringify({enable_quirks:false,xhr_ignoreErrors:0,time_auto:false,time_dl_max:.2,time_ul_max:.2,time_dlGraceTime:0,time_ulGraceTime:0,xhr_dlMultistream:1,xhr_ulMultistream:1,xhr_multistreamDelay:0,transfer_dl_bytes:1000,request_timeout:15000,telemetry_level:0,...settings}));
 return {requests,advance,status,send};
}

test('download reservation budget aborts before scheduling excess payload',()=>{
 const e=engine({test_order:'D',xhr_dlMultistream:2,transfer_byte_limit:2000});e.advance(5);
 assert.equal(e.requests.length,2);const first=e.requests[0];first.response=new ArrayBuffer(1000);first.onload();e.advance(5);
 assert.equal(e.requests.length,2);assert.equal(e.status().testState,5);assert.match(e.status().errorMessage,/Data safeguard/);assert(e.requests.every(r=>r.aborted));
});
test('wrong download payload cannot be reported as a successful test',()=>{
 const e=engine({test_order:'D'});e.advance(5);const request=e.requests[0];request.response=new ArrayBuffer(10);request.onload();e.advance(600);
 assert.equal(e.status().dlStatus,'Fail');assert.match(e.status().errorMessage,/Unexpected download/);
});
test('throughput uses actual progress bytes over the sampling interval',()=>{
 const e=engine({test_order:'D',transfer_dl_bytes:1000000});e.advance(5);
 const request=e.requests[0];request.onprogress({loaded:500000});e.advance(195);
 request.onprogress({loaded:1000000});request.response=new ArrayBuffer(1000000);request.onload();e.advance(400);
 assert.equal(e.status().testState,4);assert.equal(Number(e.status().dlStatus),10);
});
test('upload progress without a successful server response is incomplete',()=>{
 const e=engine({test_order:'U'});e.advance(5);e.requests[0].upload.onprogress({loaded:1000});e.advance(195);e.requests[0].upload.onprogress({loaded:2000});e.advance(400);
 assert.equal(e.status().ulStatus,'Fail');assert.match(e.status().errorMessage,/No successful upload/);
});
test('upload response failure and timeout both fail the measurement',()=>{
 for(const event of ['response','timeout']){const e=engine({test_order:'U'});e.advance(5);const request=e.requests[0];assert.equal(request.timeout,15000);if(event==='response'){request.status=503;request.onload();}else request.ontimeout();e.advance(600);assert.equal(e.status().ulStatus,'Fail');}
});
test('Stop aborts requests and prevents delayed replacement streams',()=>{
 const e=engine({test_order:'D',xhr_dlMultistream:4,xhr_multistreamDelay:200});e.advance(5);e.send('abort');e.advance(2000);
 assert.equal(e.status().testState,5);assert.equal(e.requests.length,1);assert(e.requests[0].aborted);
});
test('idle probes use eligible request timing and produce finite latency and jitter',()=>{
 const e=engine({test_order:'P',count_ping:12});
 for(let i=0;i<12;i++){e.advance(20);const request=e.requests.at(-1);request.onload();}
 const status=e.status();assert.equal(status.testState,4);assert.equal(Number(status.pingStatus),3);assert.equal(Number(status.jitterStatus),0);
 const failed=engine({test_order:'P_D'});failed.requests[0].status=503;failed.requests[0].onload();failed.advance(600);assert.equal(failed.status().testState,5);assert.equal(failed.requests.length,1);
});
