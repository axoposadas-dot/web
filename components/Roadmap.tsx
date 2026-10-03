import SectionHeading from './SectionHeading';
const stages = [
  { months: 'MES 01 — 03', name: 'Construir', milestone: 'Producto mínimo viable', text: 'Diseño del producto, desarrollo del núcleo y preparación de la operación comercial.' },
  { months: 'MES 04 — 06', name: 'Validar', milestone: 'Prueba piloto', text: 'Pruebas con comercios y usuarios iniciales. Ajustes de experiencia, logística y modelo económico.' },
  { months: 'MES 07 — 09', name: 'Conectar', milestone: 'Lanzamiento regional', text: 'Despliegue gradual en Posadas y Encarnación, sujeto a la validación operativa de cada mercado.' },
  { months: 'MES 10 — 12', name: 'Expandir', milestone: 'Escala hacia el NEA', text: 'Ampliación progresiva de cobertura y servicios según los resultados y la capacidad de operación.' },
];
export default function Roadmap() {
  return <section id="roadmap" className="section container"><div className="split-heading"><SectionHeading number="05" eyebrow="LA HOJA DE RUTA" title={<>Una visión ambiciosa.<br /><span className="muted">Un avance por etapas.</span></>} /><p className="section-description">12 meses para construir, aprender y preparar la expansión.</p></div><ol className="roadmap">{stages.map((s, i) => <li key={s.name}><span className="roadmap-point">0{i + 1}</span><p className="eyebrow">{s.months}</p><h3>{s.name}</h3><h4>{s.milestone}</h4><p>{s.text}</p></li>)}</ol><p className="fine-print">Cronograma estimado desde el inicio del proyecto, sujeto a financiación, validación de mercado y requisitos operativos.</p></section>;
}
