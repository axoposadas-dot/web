import SectionHeading from './SectionHeading';
const groups = [
  { category: 'Tecnología', brands: ['Litany Encarnación', 'IPHONE', 'SAMSUNG'] },
  { category: 'Automotriz & Movilidad', brands: ['FORD', 'FIAT', 'VOLKSWAGEN', 'AXION', 'YPF', 'RIO URUGUAY'] },
  { category: 'Turismo & Hotelería', brands: ['HOTEL JULIO CESAR', 'JETSMART', 'AEROLÍNEAS ARGENTINAS'] },
  { category: 'Retail & Consumo Masivo', brands: ['DUOMO Heladerías', 'SUPERMERCADOS CALIFORNIA', 'LA ANÓNIMA', 'PANIFICADOS MANÁ'] },
];
export default function BrandsGrid() {
  return <section id="marcas" className="section container"><div className="split-heading"><SectionHeading number="03" eyebrow="HORIZONTE COMERCIAL" title={<>Grandes marcas.<br /><span className="muted">Potencial compartido.</span></>} /><p className="section-description">Rubros y marcas de referencia para la estrategia de vinculación comercial del ecosistema.</p></div><div className="brands-table">{groups.map(group => <div className="brand-row" key={group.category}><h3>{group.category}</h3><div>{group.brands.map(brand => <span key={brand}>{brand}</span>)}</div></div>)}</div><p className="brands-disclaimer">Marcas ancla objetivo: su inclusión es referencial y no acredita acuerdos, participación ni interés confirmado en AXO. Las denominaciones pertenecen a sus respectivos titulares.</p></section>;
}
