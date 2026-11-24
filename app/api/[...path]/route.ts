import { handleAPI } from '@/worker/index.mjs';
import { createTransferBudget } from '@/lib/transfer-budget.mjs';

const configuredBudget=Number(process.env.MEASUREMENT_HOURLY_BYTES || '10000000000');
const reserveTransfer=createTransferBudget({limit:Number.isSafeInteger(configuredBudget)&&configuredBudget>=0?configuredBudget:10000000000});

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function handleRequest(request: Request): Promise<Response> {
  // Next.js may expose an internal URL behind the hosting reverse proxy.
  // Validate browser origins against the public Host header instead.
  if (new URL(request.url).pathname.startsWith('/api/speed/') && process.env.MEASUREMENT_ENABLED === 'false') {
    return Response.json({error:'Website measurements are temporarily disabled. Select another server.'}, {status:503, headers:{'Cache-Control':'no-store'}});
  }
  const origin = request.headers.get('origin');
  const host = request.headers.get('host') || new URL(request.url).host;
  const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const allowedHosts = new Set([host, forwardedHost].filter(Boolean));
  if (origin && ![...allowedHosts].some((h) => origin === `https://${h}` || origin === `http://${h}`)) {
    return Response.json({ error: 'Cross-site requests are not allowed.' }, { status: 403 });
  }
  if(request.headers.get('sec-fetch-site')==='cross-site')return Response.json({error:'Cross-site measurements are not allowed.'},{status:403,headers:{'Cache-Control':'no-store'}});
  const url=new URL(request.url);
  const path=url.pathname.replace(/\/$/,'');
  if ((path==='/api/speed/download'&&request.method==='GET')||(path==='/api/speed/upload'&&request.method==='POST')) {
    const bytes=request.method==='POST'?Number(request.headers.get('content-length')||8000000):Number(url.searchParams.get('bytes')||0);
    if(Number.isSafeInteger(bytes)&&bytes>=0&&bytes<=8000000){
      const budget=reserveTransfer(bytes);
      if(!budget.allowed)return Response.json({error:'The website measurement transfer allowance is temporarily exhausted. Try another server.'},{status:503,headers:{'Cache-Control':'no-store','Retry-After':String(budget.retryAfter)}});
    }
  }
  return await handleAPI(request, { skipOriginCheck: true }) ?? Response.json({ error: 'Not found' }, { status: 404 });
}

export const GET = handleRequest;
export const POST = handleRequest;
