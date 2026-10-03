import test from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { POST } from '../app/api/investors/route';

const lead = { name: 'María Pérez', email: 'maria@example.com', company: 'Inversora', phone: '+54 376 4000000', consent: true };
function request(body: unknown, origin = 'http://localhost:3000') {
  return new NextRequest('http://localhost:3000/api/investors', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
}
test('API rejects foreign origins and invalid input before contacting the provider', async () => {
  assert.equal((await POST(request(lead, 'https://other.example'))).status, 403);
  assert.equal((await POST(request({ ...lead, consent: false }))).status, 400);
  assert.equal((await POST(request({ ...lead, name: 'a'.repeat(9000) }))).status, 413);
});
test('API is honest when unconfigured and handles provider success and failure', async () => {
  const oldUrl = process.env.INVESTOR_WEBHOOK_URL;
  const oldToken = process.env.INVESTOR_WEBHOOK_TOKEN;
  const oldFetch = globalThis.fetch;
  try {
    delete process.env.INVESTOR_WEBHOOK_URL;
    delete process.env.INVESTOR_WEBHOOK_TOKEN;
    assert.equal((await POST(request(lead))).status, 503);
    process.env.INVESTOR_WEBHOOK_URL = 'https://crm.example/leads';
    process.env.INVESTOR_WEBHOOK_TOKEN = 'test-token';
    globalThis.fetch = async (_url, options) => {
      assert.equal((options?.headers as Record<string, string>).Authorization, 'Bearer test-token');
      assert.equal(JSON.parse(String(options?.body)).email, lead.email);
      return new Response('{}', { status: 200 });
    };
    assert.equal((await POST(request(lead))).status, 201);
    globalThis.fetch = async () => new Response('{}', { status: 500 });
    assert.equal((await POST(request(lead))).status, 502);
    globalThis.fetch = async () => { throw new Error('timeout'); };
    assert.equal((await POST(request(lead))).status, 502);
  } finally {
    globalThis.fetch = oldFetch;
    if (oldUrl === undefined) delete process.env.INVESTOR_WEBHOOK_URL; else process.env.INVESTOR_WEBHOOK_URL = oldUrl;
    if (oldToken === undefined) delete process.env.INVESTOR_WEBHOOK_TOKEN; else process.env.INVESTOR_WEBHOOK_TOKEN = oldToken;
  }
});
