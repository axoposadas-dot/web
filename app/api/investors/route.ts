import { NextRequest, NextResponse } from 'next/server';
import { investorSchema } from '../../../lib/investor';
export const runtime = 'nodejs';
export const maxDuration = 15;
const reply = (body: object, status: number) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== request.nextUrl.origin) return reply({ error: 'Origen de solicitud no válido.' }, 403);
  if (!request.headers.get('content-type')?.includes('application/json')) return reply({ error: 'Formato no válido.' }, 415);
  // Bound the stream itself, including requests with no Content-Length header.
  const reader = request.body?.getReader();
  if (!reader) return reply({ error: 'Solicitud vacía.' }, 400);
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) { await reader.cancel(); return reply({ error: 'Solicitud demasiado grande.' }, 413); }
      chunks.push(value);
    }
  } catch { return reply({ error: 'No pudimos leer la solicitud.' }, 400); }
  let input: unknown;
  try { input = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { return reply({ error: 'Solicitud no válida.' }, 400); }
  const parsed = investorSchema.safeParse(input);
  if (!parsed.success) return reply({ error: 'Revisá los datos del formulario.' }, 400);
  const endpoint = process.env.INVESTOR_WEBHOOK_URL;
  const token = process.env.INVESTOR_WEBHOOK_TOKEN;
  if (!endpoint || !token) return reply({ error: 'El canal de solicitudes todavía no está disponible. Intentá nuevamente más tarde.' }, 503);
  try {
    if (new URL(endpoint).protocol !== 'https:') throw new Error('HTTPS required');
    const { website: _honeypot, ...lead } = parsed.data;
    const response = await fetch(endpoint, {
      method: 'POST', redirect: 'error', cache: 'no-store',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...lead, source: 'axo-investor-landing', privacyVersion: '1.0', receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return reply({ error: 'No pudimos registrar tu solicitud. Intentá nuevamente en unos minutos.' }, 502);
    return reply({ ok: true }, 201);
  } catch { return reply({ error: 'El servicio no respondió. Intentá nuevamente en unos minutos.' }, 502); }
}
