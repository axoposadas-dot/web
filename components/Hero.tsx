import { ShoppingBag, Truck, CarFront, MapPin, MoveUpRight } from 'lucide-react';
export default function Hero() {
  return <section className="hero"><div className="container hero-grid"><div className="hero-copy">
    <p className="hero-label"><span /> VISIÓN REGIONAL. IMPACTO REAL.</p>
    <h1>El próximo<br />movimiento<br />es <span>nuestro.</span></h1>
    <p className="hero-description">Comercio, logística y movilidad.<br /><strong>Conectados en un mismo ecosistema.</strong></p>
    <p className="hero-support">Desde Posadas y Encarnación, una nueva forma de impulsar la economía del NEA. Tecnología que crece con la región.</p>
    <div className="hero-actions"><a className="button" href="#proyecto">Ver propuesta</a><a className="button button-secondary" href="#invertir">Acceso inversores</a></div>
    <p className="hero-note">UN PROYECTO PRIVADO DE MEGASION DESARROLLOS INC.</p>
  </div><div className="ecosystem-visual" role="img" aria-label="Diagrama conceptual: AXO conecta Market, Logistics y Move para Posadas, Encarnación y el NEA.">
    <div className="diagram-top"><span>ECOSISTEMA AXO</span><span>01 / VISIÓN</span></div>
    <div className="orbit orbit-outer" /><div className="orbit orbit-inner" />
    <svg className="diagram-lines" viewBox="0 0 540 530" fill="none" aria-hidden="true"><path d="M270 265 125 133M270 265 426 227M270 265 182 424" stroke="url(#line)" strokeWidth="1.5" strokeDasharray="5 6"/><defs><linearGradient id="line"><stop stopColor="#00f2fe"/><stop offset="1" stopColor="#00f2fe" stopOpacity=".25"/></linearGradient></defs></svg>
    <div className="diagram-core"><span className="wordmark">axo</span><small>TODO CONECTA.</small></div>
    <div className="diagram-node node-market"><div className="node-icon"><ShoppingBag /></div><span>AXO <b>Market</b></span><small>El comercio, más cerca.</small></div>
    <div className="diagram-node node-logistics"><div className="node-icon"><Truck /></div><span>AXO <b>Logistics</b></span><small>La región en movimiento.</small></div>
    <div className="diagram-node node-move"><div className="node-icon"><CarFront /></div><span>AXO <b>Move</b></span><small>Conectamos destinos.</small></div>
    <span className="diagram-spark spark-one" /><span className="diagram-spark spark-two" />
    <div className="diagram-bottom"><MapPin size={13} /><span>POSADAS</span><i /><span>ENCARNACIÓN</span><i /><span>NEA</span></div>
  </div></div><div className="container hero-strip"><p>Una región con potencial.<br /><strong>Una plataforma para activarlo.</strong></p><div><b>03</b><span>verticales<br />conectadas</span></div><div><b>02</b><span>ciudades<br />de origen</span></div><div><b>01</b><span>visión<br />compartida</span></div><MoveUpRight className="strip-arrow" aria-hidden="true" /></div></section>;
}
