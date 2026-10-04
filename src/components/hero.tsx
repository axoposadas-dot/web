import { Box, Layers, MapPin, ShieldCheck } from "lucide-react";
import { RegionMap } from "./region-map";
import { Wordmark } from "./ui";
export function Hero() {
  return (
    <section id="inicio" className="hero container">
      <div className="hero-copy">
        <div className="eyebrow">
          <span /> EL PRÓXIMO MOVIMIENTO ES REGIONAL
        </div>
        <h1>
          Una región.
          <br />
          Todas las
          <br />
          <span>posibilidades.</span>
        </h1>
        <p>
          Comercio, logística y movilidad.
          <br />
          Un solo ecosistema para conectar{" "}
          <strong>
            Posadas,
            <br className="desktop-break" /> Encarnación y el NEA.
          </strong>
        </p>
        <div className="hero-actions">
          <a href="#inversores" className="button">
            Formar parte de AXO
          </a>
          <a href="#trazabilidad" className="button button-ghost">
            <span className="play-icon">▷</span> Explorar el ecosistema
          </a>
        </div>
        <div className="hero-note">
          <ShieldCheck size={16} /> Proyecto privado impulsado por Megasion
          Desarrollos INC.
        </div>
      </div>
      <div className="hero-console">
        <div className="console-top">
          <div>
            <Wordmark small />
            <span>REGIONAL NETWORK</span>
          </div>
          <span className="demo-label">DEMO INTERACTIVA</span>
        </div>
        <RegionMap hero />
        <div className="map-overlay top">
          <span className="mini-icon">
            <Layers size={17} />
          </span>
          <div>
            <b>Un ecosistema. Tres soluciones.</b>
            <small>Market + Sumo Envíos + Move</small>
          </div>
        </div>
        <div className="floating-order">
          <span className="order-icon">
            <Box size={21} />
          </span>
          <div>
            <small>PEDIDO AXO-0248 · DEMO</small>
            <b>Del comercio a tu puerta.</b>
            <span>
              <i /> Logística conectada
            </span>
          </div>
          <span className="order-check">✓</span>
        </div>
        <div className="console-bottom">
          <span>
            <MapPin size={14} /> POSADAS ↔ ENCARNACIÓN
          </span>
          <span>VISIÓN NEA</span>
        </div>
      </div>
      <div className="hero-bottom">
        <span>DISEÑADO PARA LO QUE NOS MUEVE</span>
        <div>
          <b>01</b> Comercio local
        </div>
        <div>
          <b>02</b> Logística híbrida
        </div>
        <div>
          <b>03</b> Movilidad regional
        </div>
      </div>
    </section>
  );
}
