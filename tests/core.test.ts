import test from "node:test";
import assert from "node:assert/strict";
import { compareFees } from "../src/lib/economics";
import { canAdvance, traceEvent } from "../src/lib/trace";
import { POST } from "../src/app/api/investors/route";
const sample = () => ({
  name: "Inversor de prueba",
  email: "test@example.com",
  company: "Fondo de prueba",
  phone: "+54 9 376 1234567",
  consent: true,
  website: "",
  startedAt: Date.now() - 5000,
  requestId: crypto.randomUUID(),
});
const request = (data: unknown, origin = "http://localhost:3000") =>
  new Request("http://localhost:3000/api/investors", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
test("simulador: diferencia mensual y límites del escenario", () => {
  assert.deepEqual(compareFees(1000000, 30, 7), {
    traditional: 300000,
    axo: 70000,
    savings: 230000,
  });
  assert.equal(compareFees(100000, 25, 8).savings, 17000);
  assert.equal(compareFees(10000000, 35, 5).savings, 3000000);
});
test("pago rechazado bloquea el despacho; ramas de logística distintas", () => {
  assert.equal(canAdvance(0, "rejected"), false);
  assert.equal(canAdvance(0, "approved"), true);
  assert.equal(canAdvance(4, "approved"), false);
  assert.equal(traceEvent(2, "sumo"), "dispatch.sumo.assigned");
  assert.equal(traceEvent(2, "own"), "dispatch.own.assigned");
});
test("API: validación, configuración, fallos y confirmación de proveedor", async (t) => {
  const originalEnv = { ...process.env };
  const originalFetch = global.fetch;
  process.env.SITE_URL = "http://localhost:3000";
  delete process.env.RESEND_API_KEY;
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  try {
    await t.test("rechaza origen ajeno", async () =>
      assert.equal(
        (await POST(request(sample(), "https://unknown.example"))).status,
        403,
      ),
    );
    await t.test(
      "rechaza email incorrecto, falta de consentimiento y honeypot",
      async () => {
        for (const data of [
          { ...sample(), email: "bad" },
          { ...sample(), consent: false },
          { ...sample(), website: "spam" },
        ])
          assert.equal((await POST(request(data))).status, 400);
      },
    );
    await t.test("rechaza envío instantáneo y carga excesiva", async () => {
      assert.equal(
        (await POST(request({ ...sample(), startedAt: Date.now() }))).status,
        400,
      );
      assert.equal(
        (await POST(request({ ...sample(), company: "x".repeat(9000) })))
          .status,
        413,
      );
    });
    await t.test("no inventa éxito sin configuración", async () =>
      assert.equal((await POST(request(sample()))).status, 503),
    );
    process.env.RESEND_API_KEY = "fake-unit-test-key";
    process.env.INVESTOR_FROM = "AXO <noreply@example.com>";
    process.env.INVESTOR_TO = "investors@example.com";
    await t.test(
      "solo confirma con recibo del proveedor y envía texto",
      async () => {
        global.fetch = async (input, init) => {
          assert.equal(input, "https://api.resend.com/emails");
          const body = JSON.parse(String(init?.body));
          assert.equal(body.reply_to, "test@example.com");
          assert.match(body.text, /Consentimiento/);
          assert.ok(!body.html);
          return Response.json({ id: "mock-receipt" });
        };
        const res = await POST(request(sample()));
        assert.equal(res.status, 200);
        assert.equal((await res.json()).ok, true);
      },
    );
    await t.test("no confirma cuando el proveedor falla", async () => {
      global.fetch = async () =>
        Response.json({ error: "mock" }, { status: 500 });
      assert.equal((await POST(request(sample()))).status, 502);
    });
    await t.test("timeout produce error recuperable", async () => {
      global.fetch = async () => {
        throw new Error("timeout");
      };
      assert.equal((await POST(request(sample()))).status, 503);
    });
    await t.test("límite distribuido impide el cuarto envío", async () => {
      process.env.UPSTASH_REDIS_REST_URL = "https://redis.example";
      process.env.UPSTASH_REDIS_REST_TOKEN = "fake";
      global.fetch = async (input) => {
        assert.equal(input, "https://redis.example");
        return Response.json({ result: 4 });
      };
      assert.equal((await POST(request(sample()))).status, 429);
    });
  } finally {
    global.fetch = originalFetch;
    for (const key of Object.keys(process.env))
      if (!(key in originalEnv)) delete process.env[key];
    Object.assign(process.env, originalEnv);
  }
});
