import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { investorSchema, investorText } from "../../../lib/investor";
export const runtime = "nodejs";
const fail = (message: string, status: number) =>
  NextResponse.json({ ok: false, message }, { status });
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!process.env.SITE_URL && process.env.NODE_ENV === "production")
    return fail(
      "El canal privado todavía no está habilitado. Intentá nuevamente más tarde.",
      503,
    );
  let allowed: string;
  try {
    allowed = new URL(process.env.SITE_URL || "http://localhost:3000").origin;
  } catch {
    return fail(
      "El canal privado todavía no está habilitado. Intentá nuevamente más tarde.",
      503,
    );
  }
  if (!origin || origin !== allowed)
    return fail("Origen de solicitud no válido.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return fail("Formato no admitido.", 415);
  if (Number(request.headers.get("content-length") || 0) > 8192)
    return fail("Solicitud demasiado grande.", 413);
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return fail("No pudimos leer la solicitud.", 400);
  }
  if (new TextEncoder().encode(raw).length > 8192)
    return fail("Solicitud demasiado grande.", 413);
  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return fail("Solicitud no válida.", 400);
  }
  const parsed = investorSchema.safeParse(payload);
  if (!parsed.success)
    return fail(
      "Revisá los campos y aceptá el consentimiento de contacto.",
      400,
    );
  const data = parsed.data;
  if (
    Date.now() - data.startedAt < 2500 ||
    Date.now() - data.startedAt > 86400000
  )
    return fail("Actualizá la página e intentá nuevamente.", 400);
  const {
    RESEND_API_KEY,
    INVESTOR_FROM,
    INVESTOR_TO,
    UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN,
  } = process.env;
  if (!RESEND_API_KEY || !INVESTOR_FROM || !INVESTOR_TO)
    return fail(
      "El canal privado todavía no está habilitado. Intentá nuevamente más tarde.",
      503,
    );
  try {
    if (UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN) {
      // Redis EVAL atomically increments and expires the per-email window across Vercel instances.
      const key =
        "axo:investor:" +
        createHash("sha256").update(data.email.toLowerCase()).digest("hex");
      const rate = await fetch(UPSTASH_REDIS_REST_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          "EVAL",
          "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],3600) end; return n",
          1,
          key,
        ]),
        signal: AbortSignal.timeout(5000),
      });
      if (!rate.ok)
        return fail("El servicio no está disponible. Intentá más tarde.", 503);
      const limit = await rate.json();
      if (typeof limit.result !== "number")
        return fail("El servicio no está disponible. Intentá más tarde.", 503);
      if (limit.result > 3)
        return fail(
          "Alcanzaste el límite de solicitudes. Intentá en una hora.",
          429,
        );
    }
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `axo-investor-${data.requestId}`,
      },
      body: JSON.stringify({
        from: INVESTOR_FROM,
        to: [INVESTOR_TO],
        reply_to: data.email,
        subject: "AXO · Solicitud de acceso inversor",
        text: investorText(data),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok)
      return fail("No pudimos enviar la solicitud. Intentá nuevamente.", 502);
    const receipt = await result.json();
    if (!receipt.id)
      return fail("No pudimos confirmar el envío. Intentá nuevamente.", 502);
    return NextResponse.json({
      ok: true,
      message:
        "Solicitud enviada. El equipo revisará tu perfil para coordinar el acceso privado.",
    });
  } catch {
    return fail(
      "El servicio está temporalmente ocupado. Intentá nuevamente.",
      503,
    );
  }
}
