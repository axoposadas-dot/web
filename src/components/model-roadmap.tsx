import { Layers, Truck, WalletCards } from "lucide-react";
import { SectionTitle, Tag } from "./ui";
export function BusinessModel() {
  return (
    <section className="section container" id="modelo">
      <SectionTitle
        eyebrow="05 / UN MODELO CON MÚLTIPLES MOTORES"
        title="Crecer con cada conexión."
        description="Tres vías de monetización complementarias, alineadas con el uso del ecosistema."
      />
      <div className="model-grid">
        {[
          {
            icon: WalletCards,
            n: "01",
            title: "Por transacción",
            value: "5–8%",
            label: "COMISIÓN OBJETIVO",
            text: "Ingresos vinculados a las operaciones del marketplace. Más actividad local, más valor compartido.",
          },
          {
            icon: Layers,
            n: "02",
            title: "AXO PRO",
            value: "Recurrente",
            label: "SUSCRIPCIÓN COMERCIAL",
            text: "Herramientas avanzadas, analítica y gestión para comercios y franquicias. Precio a validar en el piloto.",
          },
          {
            icon: Truck,
            n: "03",
            title: "Gestión logística",
            value: "Por servicio",
            label: "TARIFA OPERATIVA",
            text: "Coordinación de entregas y movilidad según distancia, disponibilidad y nivel de servicio.",
          },
        ].map((m) => (
          <article className="model-card" key={m.n}>
            <div>
              <m.icon size={25} />
              <span>{m.n}</span>
            </div>
            <h3>{m.title}</h3>
            <strong>{m.value}</strong>
            <small>{m.label}</small>
            <p>{m.text}</p>
          </article>
        ))}
      </div>
      <p className="fine-print">
        Hipótesis de negocio. Tasas, precios, costos y márgenes sujetos a
        validación comercial y operativa.
      </p>
    </section>
  );
}
const phases = [
  {
    months: "MESES 01—03",
    title: "Construir la base",
    text: "Producto mínimo viable, flujos de compra y panel de comercios.",
    milestone: "Hito: pedidos de prueba de punta a punta",
    items: [
      "MVP Market + Business",
      "Diseño del sistema de pagos",
      "Selección de comercios piloto",
    ],
  },
  {
    months: "MESES 04—06",
    title: "Validar en Posadas",
    text: "Piloto controlado para medir conversión, costos y calidad de entrega.",
    milestone: "Hito: validar la economía por pedido",
    items: [
      "Logística híbrida con Sumo",
      "Seguimiento y soporte",
      "Validación de comisiones",
    ],
  },
  {
    months: "MESES 07—09",
    title: "Conectar la región",
    text: "Evaluación de Encarnación y despliegue progresivo de movilidad.",
    milestone: "Hito: habilitaciones e integraciones locales",
    items: [
      "Adaptación por mercado",
      "Piloto AXO Move",
      "Primeras herramientas PRO",
    ],
  },
  {
    months: "MESES 10—12",
    title: "Escalar con evidencia",
    text: "Expansión gradual al NEA sobre resultados comprobados.",
    milestone: "Hito: decisión de expansión por métricas",
    items: [
      "Optimización de retención",
      "Analítica para franquicias",
      "Plan de expansión regional",
    ],
  },
];
export function Roadmap() {
  return (
    <section className="roadmap-section" id="roadmap">
      <div className="container section">
        <div className="heading-row">
          <SectionTitle
            eyebrow="06 / UNA VISIÓN, ETAPAS CONCRETAS"
            title={
              <>
                De la primera operación
                <br />
                al próximo mercado.
              </>
            }
          />
          <Tag>PLAN PROPUESTO · 12 MESES</Tag>
        </div>
        <div className="roadmap-grid">
          {phases.map((phase, i) => (
            <article key={phase.months}>
              <div className="timeline-top">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div />
              </div>
              <small>{phase.months}</small>
              <h3>{phase.title}</h3>
              <p>{phase.text}</p>
              <ul>
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="milestone">{phase.milestone}</div>
            </article>
          ))}
        </div>
        <p className="fine-print">
          Meses contados desde el inicio financiado del proyecto. Expansión y
          servicios sujetos a validación del piloto, acuerdos y requisitos de
          cada jurisdicción. No se presupone logística transfronteriza
          habilitada.
        </p>
      </div>
    </section>
  );
}
