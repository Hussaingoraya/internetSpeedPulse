import {test} from 'node:test';
import assert from 'node:assert/strict';
import {handleAPI,createWorker} from '../worker/index.mjs';

test('download chunks do not repeat a compressible random block',async()=>{
 const response=await handleAPI(new Request('https://example.test/api/speed/download?bytes=131072'));
 const bytes=new Uint8Array(await response.arrayBuffer());
 assert.notDeepEqual(bytes.slice(0,65536),bytes.slice(65536));
 assert.equal((await handleAPI(new Request('https://example.test/api/speed/download?bytes=8000001'))).status,400);
 assert.equal((await handleAPI(new Request('https://example.test/api/speed/download?bytes=100',{headers:{'Sec-Fetch-Site':'cross-site'}}))).status,403);
});
test('stalled upload body times out instead of holding a server request open',async()=>{
 const body=new ReadableStream({pull(){return new Promise(()=>{});}});
 const request=new Request('https://example.test/api/speed/upload',{method:'POST',body,duplex:'half'});
 const response=await handleAPI(request,{uploadTimeoutMs:20});assert.equal(response.status,408);
});
test('chunked uploads are limited even without Content-Length',async()=>{
 const body=new ReadableStream({start(controller){controller.enqueue(new Uint8Array(4000001));controller.enqueue(new Uint8Array(4000000));controller.close();}});
 const response=await handleAPI(new Request('https://example.test/api/speed/upload',{method:'POST',body,duplex:'half'}));assert.equal(response.status,413);
});
test('download returns exact payloads, no cache, and rejects unsafe sizes',async()=>{for(const size of [0,100,100000]){const r=await handleAPI(new Request(`https://example.test/api/speed/download?bytes=${size}`));assert.equal(r.status,200);assert.equal((await r.arrayBuffer()).byteLength,size);assert.match(r.headers.get('cache-control'),/no-store/);}for(const size of ['-1','32000001','NaN','1.5'])assert.equal((await handleAPI(new Request(`https://example.test/api/speed/download?bytes=${size}`))).status,400);});
test('upload verifies byte count and rejects oversized and cross-origin bodies',async()=>{const r=await handleAPI(new Request('https://example.test/api/speed/upload',{method:'POST',body:new Uint8Array(500),headers:{Origin:'https://example.test'}}));assert.deepEqual(await r.json(),{received:500});assert.equal((await handleAPI(new Request('https://example.test/api/speed/upload',{method:'POST',body:new Uint8Array(8000001)}))).status,413);assert.equal((await handleAPI(new Request('https://example.test/api/speed/upload',{method:'POST',headers:{Origin:'https://other.test'}}))).status,403);});
test('connection metadata is request-specific and unavailable fields stay null',async()=>{const a=new Request('https://example.test/api/connection');assert.equal((await (await handleAPI(a)).json()).ip,null);const b=new Request('https://example.test/api/connection',{headers:{'CF-Connecting-IP':'192.0.2.1'}});Object.defineProperty(b,'cf',{value:{asOrganization:'Example network',asn:64500,colo:'TST'}});const data=await(await handleAPI(b)).json();assert.equal(data.ip,'192.0.2.1');assert.equal(data.isp,'Example network');assert.equal(data.edge,'TST');assert.equal(data.city,null);});
test('worker serves static routes with correct MIME, caching and genuine 404',async()=>{const b=body=>Buffer.from(body).toString('base64');const w=createWorker({'/index.html':{body:b('home'),type:'text/html'},'/blog/index.html':{body:b('blog'),type:'text/html'},'/_next/static/a.js':{body:b('script'),type:'application/javascript'},'/404.html':{body:b('missing'),type:'text/html'}});assert.equal(await(await w.fetch(new Request('https://example.test/blog/'))).text(),'blog');assert.equal((await w.fetch(new Request('https://example.test/missing/'))).status,404);const asset=await w.fetch(new Request('https://example.test/_next/static/a.js'));assert.match(asset.headers.get('cache-control'),/immutable/);assert.equal(asset.headers.get('content-type'),'application/javascript');assert.equal((await w.fetch(new Request('https://example.test/',{method:'HEAD'}))).body,null);});
