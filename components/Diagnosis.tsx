import { Check, Minus, Globe2, Sprout } from 'lucide-react';
import SectionHeading from './SectionHeading';
export default function Diagnosis() {
  return <section id="proyecto" className="section container"><SectionHeading number="01" eyebrow="EL PUNTO DE PARTIDA" title={<>El valor se genera acá.<br /><span className="muted">Hagamos que crezca acá.</span></>} description="El comercio regional necesita tecnología que entienda su realidad. AXO propone alinear el crecimiento de la plataforma con el de cada negocio." />
    <div className="grid gap-5 md:grid-cols-2"><article className="comparison"><Globe2 className="muted" /><p className="eyebrow mt-7">EL MODELO QUE QUEREMOS SUPERAR</p><h3>Operar sin conexión local.</h3><ul>{['Comisiones que presionan el margen del comercio.', 'Venta, entrega y movilidad en aplicaciones separadas.', 'Decisiones alejadas de las necesidades regionales.'].map(t => <li key={t}><Minus size={18} />{t}</li>)}</ul></article>
    <article className="comparison comparison-positive"><Sprout /><p className="eyebrow mt-7">LA PROPUESTA AXO</p><h3>Crecer en la misma dirección.</h3><ul>{['Comisiones transparentes y sostenibilidad compartida.', 'Un ecosistema que conecta compra, envío y traslado.', 'Desarrollo regional, con comercios como protagonistas.'].map(t => <li key={t}><Check size={18} />{t}</li>)}</ul><span className="comparison-tag">TECNOLOGÍA GLOBAL. MIRADA LOCAL.</span></article></div>
  </section>;
}
