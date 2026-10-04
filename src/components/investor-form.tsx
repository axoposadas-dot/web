"use client";
import { useRef, useState, type FormEvent } from "react";
import { LockKeyhole, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { SectionTitle } from "./ui";
export function InvestorForm() {
  const started = useRef(0),
    requestId = useRef("");
  const [status, setStatus] = useState<
      "idle" | "sending" | "success" | "error"
    >("idle"),
    [message, setMessage] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const f = new FormData(form);
    setStatus("sending");
    setMessage("");
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/investors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          email: f.get("email"),
          company: f.get("company"),
          phone: f.get("phone"),
          consent: f.get("consent") === "on",
          website: f.get("website"),
          startedAt: started.current,
          requestId: requestId.current,
        }),
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.message || "No pudimos enviar la solicitud.");
      setStatus("success");
      setMessage(body.message);
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "No hay conexión. Intentá nuevamente.",
      );
    }
  }
  return (
    <section id="inversores" className="section container investor-section">
      <div className="investor-copy">
        <SectionTitle
          eyebrow="07 / CONSTRUYAMOS LO QUE VIENE"
          title={
            <>
              El próximo capítulo
              <br />
              se escribe <span className="accent">acá.</span>
            </>
          }
          description="Buscamos conversaciones con inversores que compartan una visión: convertir el potencial regional en un ecosistema conectado."
        />
        <div className="investor-info">
          <LockKeyhole size={21} />
          <div>
            <b>Acceso privado · Ronda semilla</b>
            <p>
              Solicitá información del proyecto y una conversación con el equipo
              de Megasion Desarrollos INC.
            </p>
          </div>
        </div>
        <p className="fine-print">
          La solicitud no implica un compromiso de inversión ni garantiza acceso
          a una ronda.
        </p>
      </div>
      <form
        className="investor-form"
        onSubmit={submit}
        onFocus={() => {
          if (!started.current) started.current = Date.now();
        }}
      >
        <div className="form-heading">
          <h3>Conversemos.</h3>
          <span>Todos los campos son obligatorios</span>
        </div>
        <div className="form-grid">
          <label>
            Nombre completo
            <input
              name="name"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              placeholder="Tu nombre"
              required
              disabled={status === "sending"}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              placeholder="nombre@empresa.com"
              required
              disabled={status === "sending"}
            />
          </label>
          <label>
            Empresa / Perfil
            <input
              name="company"
              autoComplete="organization"
              minLength={2}
              maxLength={160}
              placeholder="Empresa, fondo o inversor particular"
              required
              disabled={status === "sending"}
            />
          </label>
          <label>
            Teléfono
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              minLength={7}
              maxLength={32}
              inputMode="tel"
              placeholder="+54 9 376…"
              required
              disabled={status === "sending"}
            />
          </label>
        </div>
        <div className="honeypot" aria-hidden="true">
          <label>
            Dejar vacío
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="consent">
          <input
            name="consent"
            type="checkbox"
            required
            disabled={status === "sending"}
          />
          <span>
            Acepto que Megasion Desarrollos INC. me contacte sobre AXO. Leí el{" "}
            <Link href="/privacidad">aviso de privacidad</Link>.
          </span>
        </label>
        <button
          className="button form-submit"
          disabled={status === "sending" || status === "success"}
          type="submit"
        >
          {status === "sending" ? (
            "Enviando solicitud…"
          ) : status === "success" ? (
            <>
              <CheckCircle2 size={18} /> Solicitud enviada
            </>
          ) : (
            "Solicitar acceso privado"
          )}
        </button>
        <p
          role="status"
          className={`form-status ${status === "error" ? "error" : ""}`}
        >
          {message ||
            "Tus datos se utilizan exclusivamente para gestionar esta solicitud."}
        </p>
      </form>
    </section>
  );
}
