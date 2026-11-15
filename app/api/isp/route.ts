import {Resolver} from 'node:dns/promises';
import {isIP} from 'node:net';

export const runtime='nodejs';
export const dynamic='force-dynamic';

function queryFor(address:string) {
 const version=isIP(address);
 if(version===4)return address.split('.').reverse().join('.')+'.origin.asn.cymru.com';
 if(version!==6)return null;
 const normalized=new URL(`http://[${address}]/`).hostname.slice(1,-1);
 const [left,right]=normalized.split('::');
 const head=left?left.split(':'):[];
 const tail=right?right.split(':'):[];
 const groups=right===undefined?head:[...head,...Array(8-head.length-tail.length).fill('0'),...tail];
 return groups.map(part=>part.padStart(4,'0')).join('').split('').reverse().join('.')+'.origin6.asn.cymru.com';
}

export async function GET(request:Request) {
 const headers=request.headers;
 const respond=(isp:string|null=null,asn:number|null=null)=>Response.json({isp,asn},{headers:{'Cache-Control':'private, no-store'}});
 if(headers.get('sec-fetch-site')==='cross-site')return respond();
 const edgeName=headers.get('cf-asorganization')?.trim();
 if(edgeName&&edgeName.length<=200)return respond(edgeName);

 // Configure only a header that the hosting proxy overwrites with the visitor IP.
 const trustedHeader=process.env.ISP_CLIENT_IP_HEADER;
 const address=(headers.get('cf-connecting-ip')|| (trustedHeader?headers.get(trustedHeader):null))?.trim();
 const query=address?queryFor(address):null;
 if(!query)return respond();

 const resolver=new Resolver({timeout:850,tries:1});
 const timer=setTimeout(()=>resolver.cancel(),1700);
 let asn:number|null=null;
 try {
  const [record]=await resolver.resolveTxt(query);
  const value=record?.join('').split('|')[0]?.trim().split(/\s+/)[0];
  if(!value||!/^\d+$/.test(value))return respond();
  asn=Number(value);
  const [details]=await resolver.resolveTxt(`AS${asn}.asn.cymru.com`);
  return respond(details?.join('').split('|')[4]?.trim()||null,asn);
 } catch {
  return respond(null,asn);
 } finally {
  clearTimeout(timer);
 }
}
