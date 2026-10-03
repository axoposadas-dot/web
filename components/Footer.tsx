import Link from 'next/link';
export default function Footer() {
  return <footer className="container footer"><div className="footer-top"><a className="brand" href="/" aria-label="AXO — Inicio"><span className="wordmark">axo</span><span className="brand-company">MEGASION<br />DESARROLLOS INC.</span></a><p>Hecho para conectar.<br /><span>Pensado para crecer acá.</span></p><div><Link href="/privacidad">Privacidad</Link><Link href="/aviso-legal">Aviso legal</Link></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Megasion Desarrollos INC. Todos los derechos reservados.</p><p>POSADAS · ENCARNACIÓN · NEA</p></div><p className="legal-note">AXO es un proyecto privado en desarrollo. La información es institucional y no constituye una oferta pública de inversión ni garantiza rentabilidad. El acceso a la documentación está sujeto a evaluación y a las condiciones de la eventual ronda.</p></footer>;
}

