"use client";
import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw, Check, Terminal, Route } from "lucide-react";
import { SectionTitle, Tag } from "./ui";
import { RegionMap } from "./region-map";
import {
  canAdvance,
  traceEvent,
  traceSteps,
  type Logistics,
} from "@/lib/trace";
export function Trace() {
  const [step, setStep] = useState(0),
    [playing, setPlaying] = useState(false),
    [logistics, setLogistics] = useState<Logistics>("sumo"),
    [payment, setPayment] = useState<"approved" | "rejected">("approved");
  const allowed = canAdvance(step, payment);
  useEffect(() => {
    if (!playing || !allowed) return;
    const timer = setTimeout(() => {
      setStep((s) => s + 1);
    }, 1600);
    return () => clearTimeout(timer);
  }, [playing, step, allowed]);
  useEffect(() => {
    if (!allowed) setPlaying(false);
  }, [allowed]);
  const reset = () => {
    setStep(0);
    setPlaying(false);
  };
  return (
    <section id="trazabilidad" className="section container">
      <div className="heading-row">
        <SectionTitle
          eyebrow="03 / DE LA INTENCIÓN A LA ENTREGA"
          title={
            <>
              Cada movimiento.
              <br />
              Una huella verificable.
            </>
          }
          description="Recorré la lógica de una operación: compra, pago, asignación logística y entrega. Sin puntos ciegos."
        />
        <Tag>SIMULACIÓN LOCAL · SIN OPERACIONES REALES</Tag>
      </div>
      <div className="trace-layout">
        <div className="trace-controls">
          <div className="trace-options">
            <label htmlFor="cadete">Disponibilidad logística</label>
            <select
              id="cadete"
              value={logistics}
              onChange={(e) => {
                reset();
                setLogistics(e.target.value as Logistics);
              }}
            >
              <option value="sumo">Sin cadete · derivar a Sumo</option>
              <option value="own">Con cadete · envío propio</option>
            </select>
            <label htmlFor="payment">Resultado del pago</label>
            <select
              id="payment"
              value={payment}
              onChange={(e) => {
                reset();
                setPayment(e.target.value as "approved" | "rejected");
              }}
            >
              <option value="approved">Aprobado</option>
              <option value="rejected">Rechazado</option>
            </select>
          </div>
          <ol className="trace-steps">
            {traceSteps.map((label, i) => (
              <li
                key={label}
                className={`${step === i ? "current" : ""} ${step > i ? "done" : ""}`}
              >
                <span>
                  {step > i ? (
                    <Check size={16} />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                <div>
                  <b>{label}</b>
                  <small>
                    {
                      [
                        "Combo local · AXO-0248",
                        "Confirmación antes de despachar",
                        logistics === "sumo"
                          ? "Derivación automática a Sumo Envíos"
                          : "Cadete del comercio seleccionado",
                        "Ubicación ilustrativa del recorrido",
                        "Cierre del pedido y registro de entrega",
                      ][i]
                    }
                  </small>
                </div>
              </li>
            ))}
          </ol>
          <div className="trace-buttons">
            <button
              className="button"
              disabled={!allowed}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}{" "}
              {playing ? "Pausar" : "Reproducir"}
            </button>
            <button
              className="button button-ghost"
              disabled={!allowed}
              onClick={() => {
                setPlaying(false);
                setStep((s) => s + 1);
              }}
            >
              Siguiente paso
            </button>
            <button
              className="icon-button"
              aria-label="Reiniciar simulación"
              onClick={reset}
            >
              <RotateCcw size={17} />
            </button>
          </div>
          {payment === "rejected" && (
            <p className="error" role="status">
              Pago rechazado. La operación se detiene antes de asignar
              logística.
            </p>
          )}
        </div>
        <div className="trace-screen">
          <div className="trace-screen-top">
            <span>
              <Route size={17} /> Operación AXO-0248
            </span>
            <Tag>{step === 4 ? "COMPLETADA" : "EN SIMULACIÓN"}</Tag>
          </div>
          <RegionMap progress={step} />
          <div className="event-log">
            <div>
              <Terminal size={16} /> REGISTRO DE EVENTOS <span>DEMO</span>
            </div>
            <ul aria-live="polite" aria-label="Eventos de trazabilidad">
              {Array.from({ length: step + 1 }, (_, i) => (
                <li key={i}>
                  <time>12:04:{String(i * 3).padStart(2, "0")}</time>
                  <code>{traceEvent(i, logistics)}</code>
                  <span>✓</span>
                </li>
              ))}
              {payment === "rejected" && (
                <li className="error">
                  <time>12:04:03</time>
                  <code>payment.rejected</code>
                  <span>×</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="architecture-strip">
        <span>ARQUITECTURA PROPUESTA</span>
        <p>ID de pedido compartido</p>
        <i>/</i>
        <p>Validación de pagos</p>
        <i>/</i>
        <p>Despacho por eventos</p>
        <i>/</i>
        <p>Historial auditable</p>
      </div>
      <p className="fine-print">
        La demo ejecuta una máquina de estados local. Pagos, GPS, registros
        persistentes e integración con Sumo son parte de la arquitectura
        propuesta; requieren servicios e integraciones de producción.
      </p>
    </section>
  );
}
