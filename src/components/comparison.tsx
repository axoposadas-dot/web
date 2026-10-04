"use client";
import { useState } from "react";
import { Check, SlidersHorizontal } from "lucide-react";
import { SectionTitle, Wordmark } from "./ui";
import { compareFees, money } from "@/lib/economics";
export function Comparison() {
  const [sales, setSales] = useState(1000000),
    [traditional, setTraditional] = useState(30),
    [axo, setAxo] = useState(7);
  const [tab, setTab] = useState("modelo");
  const result = compareFees(sales, traditional, axo);
  return (
    <section id="comparativa" className="section container">
      <div className="heading-row">
        <SectionTitle
          eyebrow="01 / UNA ECONOMÍA MÁS LOCAL"
          title={
            <>
              Más valor donde
              <br />
              realmente se genera.
            </>
          }
          description="Una estructura pensada para que cada comercio conserve más de lo que vende."
        />
        <div className="segmented" aria-label="Vista de comparativa">
          {[
            ["modelo", "El modelo"],
            ["simulador", "Simular ahorro"],
          ].map(([id, label]) => (
            <button
              key={id}
              aria-pressed={tab === id}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {tab === "modelo" ? (
        <div className="table-scroll">
          <table className="comparison-table">
            <caption className="sr-only">
              Comparación entre referencias del mercado y propuesta AXO
            </caption>
            <thead>
              <tr>
                <th>Lo que importa</th>
                <th>
                  Apps tradicionales<small>PedidosYa / Uber Eats*</small>
                </th>
                <th>
                  <Wordmark small />
                  <small>Modelo propuesto</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Comisión al comercio",
                  <>
                    Variable según contrato
                    <small>Escenario de análisis: 25–35%</small>
                  </>,
                  <>
                    5–8%<small>Objetivo comercial AXO</small>
                  </>,
                ],
                [
                  "Enfoque territorial",
                  "Operación en múltiples mercados",
                  "Posadas, Encarnación y NEA",
                ],
                [
                  "Logística",
                  "Red propia o terceros según servicio",
                  "Envío propio + Sumo Envíos",
                ],
                [
                  "Liquidación",
                  "Según contrato y medio de pago",
                  "Ágil · plazo a validar en el piloto",
                ],
                [
                  "Experiencia",
                  "Servicios y cobertura según plataforma",
                  "Market + Move en una misma experiencia",
                ],
              ].map(([name, left, right], i) => (
                <tr key={i}>
                  <th scope="row">{name}</th>
                  <td>{left}</td>
                  <td>
                    <span className="check">
                      <Check size={15} />
                    </span>
                    <div>{right}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="calculator">
          <div className="calculator-controls">
            <div className="card-label">
              <SlidersHorizontal size={18} /> Simulador de comisiones
            </div>
            <label htmlFor="sales">
              Ventas mensuales en ARS <strong>{money(sales)}</strong>
            </label>
            <input
              id="sales"
              type="range"
              min="100000"
              max="10000000"
              step="100000"
              value={sales}
              onChange={(e) => setSales(Number(e.target.value))}
            />
            <label htmlFor="traditional">
              Comisión de referencia <strong>{traditional}%</strong>
            </label>
            <input
              id="traditional"
              type="range"
              min="25"
              max="35"
              value={traditional}
              onChange={(e) => setTraditional(Number(e.target.value))}
            />
            <label htmlFor="axo-fee">
              Comisión objetivo AXO <strong>{axo}%</strong>
            </label>
            <input
              id="axo-fee"
              type="range"
              min="5"
              max="8"
              value={axo}
              onChange={(e) => setAxo(Number(e.target.value))}
            />
          </div>
          <div className="calculator-result" aria-live="polite">
            <span>Diferencia mensual estimada</span>
            <strong>{money(result.savings)}</strong>
            <p>que permanecerían en el comercio.</p>
            <div>
              <span>Comisión de referencia</span>
              <b>{money(result.traditional)}</b>
            </div>
            <div>
              <span>Comisión objetivo AXO</span>
              <b>{money(result.axo)}</b>
            </div>
            <small>
              Escenario ilustrativo. Excluye impuestos, medios de pago, costos
              logísticos, suscripciones y otros cargos. No es rentabilidad neta
              ni ahorro garantizado.
            </small>
          </div>
        </div>
      )}
      <details className="source-note">
        <summary>Fuentes, alcance y supuestos de la comparación</summary>
        <p>
          * Uber Eats publica en EE. UU. planes de marketplace de 20%, 25% y
          30%, con condiciones y cargos adicionales. Es una referencia
          internacional de delivery, no una tarifa de Uber Move ni del NEA.
          PedidosYa Argentina informa un modelo por comisión, sin una tasa
          universal pública en su página de alta. La logística híbrida tampoco
          es exclusiva de AXO: Uber Eats ofrece self-delivery y respaldo de su
          red.
        </p>
        <p>
          El rango 25–35% es un escenario solicitado para el análisis, no una
          tarifa verificada para todas las plataformas. El 5–8%, la integración
          regional y la liquidación ágil son objetivos AXO pendientes de
          validación. Consulta: 4 de octubre de 2026.
        </p>
        <div className="source-links">
          <a
            href="https://merchants.ubereats.com/us/en/pricing/"
            target="_blank"
            rel="noreferrer"
          >
            Uber Eats · precios oficiales
          </a>
          <a
            href="https://socios.pedidosya.com.ar/es"
            target="_blank"
            rel="noreferrer"
          >
            PedidosYa · socios Argentina
          </a>
        </div>
      </details>
    </section>
  );
}
