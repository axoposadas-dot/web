"use client";
import { useState } from "react";
import {
  ShoppingBag,
  Store,
  Car,
  MapPin,
  Package,
  Check,
  Plus,
  Zap,
} from "lucide-react";
import { SectionTitle, Tag } from "./ui";
import { money } from "@/lib/economics";
const profiles = [
  {
    id: "comprador",
    icon: ShoppingBag,
    label: "Quiero comprar",
    product: "AXO Market & Move",
    title: "Tu ciudad, a un toque.",
    text: "Descubrí ofertas locales, elegí cómo recibirlas y resolvé tu próximo viaje sin cambiar de experiencia.",
    points: [
      "Ofertas flash y combos cerca tuyo",
      "Comercio y movilidad en una sola app",
      "Seguimiento de cada pedido",
    ],
  },
  {
    id: "vendedor",
    icon: Store,
    label: "Quiero vender",
    product: "AXO Business",
    title: "Tu negocio, con más alcance.",
    text: "Publicá un remate en un flujo diseñado para 60 segundos. Elegí tu cadete o derivá la entrega a Sumo Envíos.",
    points: [
      "Control de ventas y pedidos",
      "Publicación rápida de oportunidades",
      "Logística propia o conectada",
    ],
  },
  {
    id: "conductor",
    icon: Car,
    label: "Quiero conectar",
    product: "Sumo Envíos & AXO Move",
    title: "Cada recorrido cuenta.",
    text: "Una experiencia pensada para decidir con información: distancia, tipo de servicio e ingreso estimado antes de aceptar.",
    points: [
      "Radar de pedidos y viajes",
      "Kilómetros y costos a la vista",
      "Decisiones claras antes de salir",
    ],
  },
];
export function Ecosystem() {
  const [active, setActive] = useState(0),
    [mode, setMode] = useState("market"),
    [logistics, setLogistics] = useState("sumo"),
    [published, setPublished] = useState(false),
    [accepted, setAccepted] = useState(false),
    [selected, setSelected] = useState("");
  const p = profiles[active];
  return (
    <section id="ecosistema" className="ecosystem-section">
      <div className="container section">
        <SectionTitle
          eyebrow="02 / UN ECOSISTEMA, TRES PROTAGONISTAS"
          title={
            <>
              Todo conectado.
              <br />
              <span className="muted">Cada uno en control.</span>
            </>
          }
        />
        <div className="profile-tabs" role="tablist" aria-label="Perfiles AXO">
          {profiles.map((profile, i) => (
            <button
              role="tab"
              id={`tab-${profile.id}`}
              aria-selected={active === i}
              aria-controls={`panel-${profile.id}`}
              tabIndex={active === i ? 0 : -1}
              key={profile.id}
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                const next =
                  event.key === "ArrowRight"
                    ? (i + 1) % profiles.length
                    : event.key === "ArrowLeft"
                      ? (i + profiles.length - 1) % profiles.length
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? profiles.length - 1
                          : null;
                if (next === null) return;
                event.preventDefault();
                setActive(next);
                document.getElementById(`tab-${profiles[next].id}`)?.focus();
              }}
            >
              <profile.icon size={20} />
              {profile.label}
              <span>0{i + 1}</span>
            </button>
          ))}
        </div>
        <div
          className="profile-content"
          role="tabpanel"
          id={`panel-${p.id}`}
          aria-labelledby={`tab-${p.id}`}
        >
          <div className="profile-copy">
            <Tag>{p.product}</Tag>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <ul>
              {p.points.map((text) => (
                <li key={text}>
                  <Check size={17} />
                  {text}
                </li>
              ))}
            </ul>
            <a href="#trazabilidad" className="text-link">
              Explorar el recorrido completo
            </a>
          </div>
          <div className="app-preview">
            <div className="app-title">
              <b>{p.product}</b>
              <span className="demo-label">VISTA DEMO</span>
            </div>
            {active === 0 ? (
              <>
                <div className="buyer-top">
                  <span>
                    <MapPin size={15} /> Posadas, Misiones
                  </span>
                  <ShoppingBag size={20} />
                </div>
                <div className="segmented app-segments">
                  <button
                    aria-pressed={mode === "market"}
                    onClick={() => {
                      setMode("market");
                      setSelected("");
                    }}
                  >
                    Market
                  </button>
                  <button
                    aria-pressed={mode === "move"}
                    onClick={() => {
                      setMode("move");
                      setSelected("");
                    }}
                  >
                    Move
                  </button>
                </div>
                {mode === "market" ? (
                  <>
                    <div className="flash-banner">
                      <Zap size={25} />
                      <div>
                        <b>Lo bueno está cerca.</b>
                        <span>Oportunidades de tu ciudad</span>
                      </div>
                      <span className="flash-label">FLASH</span>
                    </div>
                    <div className="offer-list">
                      {[
                        [
                          "DUOMO",
                          "Combo para compartir",
                          "2 × ¼ kg · ejemplo",
                          8500,
                        ],
                        [
                          "California",
                          "Tu compra de la semana",
                          "Combo de básicos · ejemplo",
                          24000,
                        ],
                        [
                          "Litany",
                          "Tecnología que conecta",
                          "Accesorios · ejemplo",
                          18500,
                        ],
                      ].map(([brand, title, detail, price]) => (
                        <button
                          className="offer"
                          key={brand}
                          onClick={() =>
                            setSelected(
                              `${title} agregado al pedido de demostración.`,
                            )
                          }
                        >
                          <span className="offer-avatar">
                            {String(brand).slice(0, 1)}
                          </span>
                          <span>
                            <b>{title}</b>
                            <small>
                              {brand} · {detail}
                            </small>
                          </span>
                          <span className="offer-price">
                            {money(Number(price))}
                            <Plus size={15} />
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="move-preview">
                    <Car size={38} />
                    <h4>¿A dónde vamos?</h4>
                    <p>Centro de Posadas → Costanera</p>
                    <div className="metric-row">
                      <span>3,2 km</span>
                      <span>12 min estimados</span>
                    </div>
                    <button
                      className="button"
                      onClick={() =>
                        setSelected(
                          "Viaje seleccionado en la demo. No se solicitó un conductor real.",
                        )
                      }
                    >
                      Simular selección de viaje
                    </button>
                  </div>
                )}
                <p role="status" className="app-feedback">
                  {selected ||
                    "Precios y ofertas ilustrativos. No disponibles para compra."}
                </p>
              </>
            ) : active === 1 ? (
              <>
                <div className="business-metrics">
                  <div>
                    <small>Ventas del día · demo</small>
                    <strong>$ 184.500</strong>
                  </div>
                  <div>
                    <small>Pedidos</small>
                    <strong>24</strong>
                  </div>
                </div>
                <div
                  className="bar-chart"
                  aria-label="Gráfico ilustrativo de ventas por día"
                >
                  {[38, 65, 47, 80, 58, 91, 74].map((v, i) => (
                    <div key={i}>
                      <span style={{ height: `${v}%` }} />
                      <small>{["L", "M", "M", "J", "V", "S", "D"][i]}</small>
                    </div>
                  ))}
                </div>
                <div className="dispatch">
                  <b>Nuevo remate · Combo local</b>
                  <small>Stock: 12 unidades · oferta de demostración</small>
                  <label htmlFor="logistics">¿Cómo lo entregás?</label>
                  <select
                    id="logistics"
                    value={logistics}
                    onChange={(e) => {
                      setLogistics(e.target.value);
                      setPublished(false);
                    }}
                  >
                    <option value="sumo">Derivar a Sumo Envíos</option>
                    <option value="own">Envío propio</option>
                  </select>
                  <button className="button" onClick={() => setPublished(true)}>
                    {published
                      ? "Publicado en la demo"
                      : "Publicar remate de prueba"}
                  </button>
                  <p role="status" className="app-feedback">
                    {published
                      ? `Remate demo activo · ${logistics === "sumo" ? "Sumo Envíos" : "cadete propio"} seleccionado.`
                      : "Flujo objetivo: publicación en 60 segundos."}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="driver-radar">
                  <div className="radar-ring" />
                  <Package size={32} />
                  <span>RADAR DE OPORTUNIDADES</span>
                </div>
                <div className="driver-job">
                  <div className="card-label">
                    <b>Entrega local</b>
                    <Tag>
                      {accepted ? "ASIGNADA · DEMO" : "DISPONIBLE · DEMO"}
                    </Tag>
                  </div>
                  <p>Comercio → Centro de Posadas</p>
                  <div className="metric-row">
                    <div>
                      <small>Recorrido</small>
                      <strong>3,2 km</strong>
                    </div>
                    <div>
                      <small>Neto estimado*</small>
                      <strong className="accent">$ 2.100</strong>
                    </div>
                  </div>
                  <small>
                    * Tarifa $ 2.800 − costo estimado $ 700. Ejemplo antes de
                    impuestos; costos reales variables.
                  </small>
                  <button
                    className="button"
                    onClick={() => setAccepted(!accepted)}
                  >
                    {accepted
                      ? "Liberar entrega de prueba"
                      : "Aceptar entrega de prueba"}
                  </button>
                  <p className="app-feedback" role="status">
                    {accepted
                      ? "Entrega asignada en esta demostración."
                      : "Sin pedidos ni conductores reales conectados."}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
