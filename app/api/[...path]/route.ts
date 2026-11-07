import { handleAPI } from '@/worker/index.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function handleRequest(request: Request): Promise<Response> {
  // Next.js may expose an internal URL behind the hosting reverse proxy.
  // Validate browser origins against the public Host header instead.
  const origin = request.headers.get('origin');
  const host = request.headers.get('host') || new URL(request.url).host;
  if (origin && origin !== `https://${host}` && origin !== `http://${host}`) {
    return Response.json({ error: 'Cross-site requests are not allowed.' }, { status: 403 });
  }
  const headers = new Headers(request.headers);
  headers.delete('origin');
  const normalized = new Request(request, { headers });
  return await handleAPI(normalized) ?? Response.json({ error: 'Not found' }, { status: 404 });
}

export const GET = handleRequest;
export const POST = handleRequest;
