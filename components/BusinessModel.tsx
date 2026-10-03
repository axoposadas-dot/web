import { ReceiptText, Gem, Route } from 'lucide-react';
import SectionHeading from './SectionHeading';
const streams = [
  { icon: ReceiptText, number: '01', name: 'Por cada transacción', text: 'Comisiones sobre operaciones concretadas en el ecosistema. Condiciones claras para que el comercio pueda planificar su margen.', label: 'ACTIVIDAD COMERCIAL' },
  { icon: Gem, number: '02', name: 'AXO PRO', text: 'Suscripción para comercios que buscan herramientas de gestión, mayor visibilidad y capacidades para desarrollar su negocio.', label: 'INGRESOS RECURRENTES' },
  { icon: Route, number: '03', name: 'Gestión logística', text: 'Ingresos asociados a la coordinación de entregas y servicios logísticos, según cobertura, distancia y nivel de servicio.', label: 'SERVICIOS OPERATIVOS' },
];
export default function BusinessModel() {
  return <section id="modelo" className="section section-tinted"><div className="container"><SectionHeading number="04" eyebrow="MODELO DE NEGOCIO" title={<>El crecimiento local.<br /><span className="muted">También es nuestro negocio.</span></>} description="Tres fuentes de ingresos complementarias, vinculadas al uso y al valor que propone el ecosistema." /><div className="grid gap-8 md:grid-cols-3">{streams.map(({ icon: Icon, number, name, text, label }) => <article className="revenue" key={name}><div className="flex justify-between"><Icon /><span>{number}</span></div><h3>{name}</h3><p>{text}</p><small>{label}</small></article>)}</div><p className="fine-print">Modelo propuesto. Tarifas, prestaciones y economía unitaria se definirán y validarán durante el piloto; no se presentan retornos garantizados.</p></div></section>;
}
