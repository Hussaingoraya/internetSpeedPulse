import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const code=await readFile('dist/server/index.js','utf8');const {default:worker}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
createServer(async(req,res)=>{try{const url='http://localhost:3005'+req.url;const request=new Request(url,{method:req.method,headers:req.headers,...(!['GET','HEAD'].includes(req.method)?{body:req,duplex:'half'}:{})});const result=await worker.fetch(request);res.writeHead(result.status,Object.fromEntries(result.headers));if(result.body)for await(const chunk of result.body)res.write(chunk);res.end();}catch{res.writeHead(500);res.end('Preview request failed');}}).listen(3005,'0.0.0.0',()=>console.log('Local: http://localhost:3005'));
